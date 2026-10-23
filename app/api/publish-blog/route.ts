import { NextRequest, NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com";
const BLOGS_FILE_PATH = "src/data/blogsData.ts";

interface BlogPayload {
  slug: string;
  title: string;
  metaTitle: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  author: { name: string; bio: string; image?: string };
  image: string;
  categoryColor: string;
  content: string;
  secretKey: string;
}

function escapeForTemplateLiteral(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function serializeStringArray(arr: string[]): string {
  return `[${arr.map((s) => `"${s.replace(/"/g, '\\"')}"`).join(", ")}]`;
}

function buildBlogEntry(blog: BlogPayload, id: number): string {
  const authorImage = blog.author.image ? `\n      image: "${blog.author.image}",` : "";
  const content = escapeForTemplateLiteral(blog.content);

  return `  {
    id: ${id},
    slug: "${blog.slug}",
    title: "${blog.title.replace(/"/g, '\\"')}",
    metaTitle: "${blog.metaTitle.replace(/"/g, '\\"')}",
    excerpt: "${blog.excerpt.replace(/"/g, '\\"')}",
    date: "${blog.date}",
    lastUpdated: "${blog.date}",
    readTime: "${blog.readTime}",
    category: "${blog.category}",
    tags: ${serializeStringArray(blog.tags)},
    author: {
      name: "${blog.author.name}",
      bio: "${blog.author.bio.replace(/"/g, '\\"')}",${authorImage}
    },
    image: "${blog.image}",
    categoryColor: "${blog.categoryColor}",
    content: \`${content}\`,
  }`;
}

export async function POST(req: NextRequest) {
  try {
    const body: BlogPayload = await req.json();

    if (body.secretKey !== process.env.BLOG_ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug, title, metaTitle, excerpt, date, readTime, category, tags, author, image, categoryColor, content } = body;

    if (!slug || !title || !metaTitle || !excerpt || !content || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const githubToken = process.env.GITHUB_PAT;
    const githubOwner = process.env.GITHUB_REPO_OWNER;
    const githubRepo = process.env.GITHUB_REPO_NAME;
    const githubBranch = process.env.GITHUB_BRANCH || "main";

    if (!githubToken || !githubOwner || !githubRepo) {
      return NextResponse.json({ error: "GitHub environment variables not configured" }, { status: 500 });
    }

    const ghHeaders = {
      Authorization: `Bearer ${githubToken}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    };

    // 1. Get the latest commit SHA on the branch
    const branchRes = await fetch(
      `${GITHUB_API}/repos/${githubOwner}/${githubRepo}/branches/${githubBranch}`,
      { headers: ghHeaders }
    );
    if (!branchRes.ok) {
      return NextResponse.json({ error: "Failed to fetch branch info" }, { status: 500 });
    }
    const branchData = await branchRes.json();
    const latestCommitSha = branchData.commit.sha;
    const baseTreeSha = branchData.commit.commit.tree.sha;

    // 2. Get the blob SHA for the blogsData.ts file (works for large files)
    const treeRes = await fetch(
      `${GITHUB_API}/repos/${githubOwner}/${githubRepo}/git/trees/${baseTreeSha}?recursive=1`,
      { headers: ghHeaders }
    );
    if (!treeRes.ok) {
      return NextResponse.json({ error: "Failed to fetch repo tree" }, { status: 500 });
    }
    const treeData = await treeRes.json();
    const fileEntry = treeData.tree.find((f: { path: string }) => f.path === BLOGS_FILE_PATH);

    if (!fileEntry) {
      return NextResponse.json({ error: "blogsData.ts not found in repo tree" }, { status: 500 });
    }

    // 3. Fetch the blob content (handles files > 1MB)
    const blobRes = await fetch(
      `${GITHUB_API}/repos/${githubOwner}/${githubRepo}/git/blobs/${fileEntry.sha}`,
      { headers: { ...ghHeaders, Accept: "application/vnd.github.raw+json" } }
    );
    if (!blobRes.ok) {
      return NextResponse.json({ error: "Failed to fetch blogsData.ts blob" }, { status: 500 });
    }
    const currentContent = await blobRes.text();

    // 4. Check slug doesn't already exist
    if (currentContent.includes(`slug: "${slug}"`)) {
      return NextResponse.json({ error: `Slug "${slug}" already exists in blogsData.ts` }, { status: 409 });
    }

    // 5. Determine next ID
    const idMatches = [...currentContent.matchAll(/id:\s*(\d+)/g)];
    const maxId = idMatches.reduce((max, m) => Math.max(max, parseInt(m[1], 10)), 0);
    const newId = maxId + 1;

    // 6. Build new blog entry
    const newEntry = buildBlogEntry(
      { slug, title, metaTitle, excerpt, date, readTime, category, tags, author, image, categoryColor, content, secretKey: "" },
      newId
    );

    // 7. Find insertion point
    const insertMarker = ".concat([";
    const insertIndex = currentContent.indexOf(insertMarker);
    if (insertIndex === -1) {
      return NextResponse.json({ error: "Could not find insertion point in blogsData.ts" }, { status: 500 });
    }

    const insertAt = insertIndex + insertMarker.length;
    const newContent =
      currentContent.slice(0, insertAt) +
      "\n" +
      newEntry +
      ",\n" +
      currentContent.slice(insertAt);

    // 8. Create a new blob with the updated content
    const newBlobRes = await fetch(
      `${GITHUB_API}/repos/${githubOwner}/${githubRepo}/git/blobs`,
      {
        method: "POST",
        headers: ghHeaders,
        body: JSON.stringify({ content: newContent, encoding: "utf-8" }),
      }
    );
    if (!newBlobRes.ok) {
      return NextResponse.json({ error: "Failed to create new blob" }, { status: 500 });
    }
    const newBlobData = await newBlobRes.json();

    // 9. Create a new tree with the updated file
    const newTreeRes = await fetch(
      `${GITHUB_API}/repos/${githubOwner}/${githubRepo}/git/trees`,
      {
        method: "POST",
        headers: ghHeaders,
        body: JSON.stringify({
          base_tree: baseTreeSha,
          tree: [{ path: BLOGS_FILE_PATH, mode: "100644", type: "blob", sha: newBlobData.sha }],
        }),
      }
    );
    if (!newTreeRes.ok) {
      return NextResponse.json({ error: "Failed to create new tree" }, { status: 500 });
    }
    const newTreeData = await newTreeRes.json();

    // 10. Create a new commit
    const newCommitRes = await fetch(
      `${GITHUB_API}/repos/${githubOwner}/${githubRepo}/git/commits`,
      {
        method: "POST",
        headers: ghHeaders,
        body: JSON.stringify({
          message: `blog: add "${title}"`,
          tree: newTreeData.sha,
          parents: [latestCommitSha],
        }),
      }
    );
    if (!newCommitRes.ok) {
      return NextResponse.json({ error: "Failed to create commit" }, { status: 500 });
    }
    const newCommitData = await newCommitRes.json();

    // 11. Update the branch to point to the new commit
    const updateRefRes = await fetch(
      `${GITHUB_API}/repos/${githubOwner}/${githubRepo}/git/refs/heads/${githubBranch}`,
      {
        method: "PATCH",
        headers: ghHeaders,
        body: JSON.stringify({ sha: newCommitData.sha }),
      }
    );
    if (!updateRefRes.ok) {
      return NextResponse.json({ error: "Failed to update branch ref" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      blogId: newId,
      slug,
      commitUrl: `https://github.com/${githubOwner}/${githubRepo}/commit/${newCommitData.sha}`,
      message: `Blog "${title}" published successfully as id ${newId}.`,
    });

  } catch (err) {
    console.error("publish-blog error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
