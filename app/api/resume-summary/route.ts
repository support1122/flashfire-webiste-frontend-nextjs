import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { role, years, skills, achievement, tone } = await req.json();
  if (!role?.trim()) {
    return NextResponse.json({ error: "Role is required" }, { status: 400 });
  }

  const context = [
    `Job Title/Role: ${role}`,
    years ? `Years of Experience: ${years}+` : null,
    skills ? `Top Skills: ${skills}` : null,
    achievement ? `Key Achievement: ${achievement}` : null,
    `Tone: ${tone || "Professional"}`,
  ].filter(Boolean).join("\n");

  const prompt = `You are an expert resume writer who crafts powerful professional summaries for job seekers across all industries.

Generate 3 distinct professional summary paragraphs for the following professional:

${context}

Study these real-world examples of excellent resume summaries:

SOFTWARE ENGINEER (Distributed Systems):
"Software Engineer with 4+ years building and operating cloud-native, distributed systems across Cohesity and Nutanix, delivering backend services and security data pipelines using Go, Node.js, Kafka, Spark, Kubernetes, Terraform, PostgreSQL, and MongoDB. Modernized production analytics by rewriting a high-throughput Go service enabling batched parallel writes and reducing database round-trips by 500x, while improving incident response through automated monitoring and on-call ownership. Strengthened security and compliance by resolving 150+ vulnerabilities, supporting 3,000+ customers, and automating evaluation and reliability workflows that improved system observability, quality, and release execution."

MARKETING ANALYST (CRM & Campaign Analytics):
"Marketing Analyst with 3+ years of experience in CRM analytics, campaign performance, funnel optimization, customer segmentation, and marketing attribution across SaaS and eCommerce. Analyzed 500K+ customer records and 1M+ event records using SQL, Python, Tableau, Power BI, BigQuery, Snowflake, Google Analytics, and HubSpot. Improved campaign ROI by 12%, reduced reporting turnaround by 45%, and increased budget allocation efficiency by 25% through KPI dashboards, A/B testing, and predictive insights."

RESEARCH ASSOCIATE (Biologics):
"Research Associate with 2+ years of experience in biologics development, protein characterization, in vitro assay development, and immunoassay optimization across biotech R&D environments. Generated Octet BLI binding kinetics data for 20+ biologic candidates, improved ELISA assay sensitivity and consistency by 25–30%, and analyzed 25–30 clinical samples through custom multiplex immunoglobulin profiling assays."

AI ENGINEER:
"Seasoned software engineer with 3+ years of experience in building AI-driven microservices and scalable data pipelines. Delivered LLM-powered routing and triage services at Adobe, achieving 92.6% classification accuracy and automating 87% of support workflows; also architected real-time ingestion pipelines at USC, cutting processing latency to under 3 seconds."

Rules:
- Generate exactly 3 summaries, each being 2-4 sentences
- Each should have a different opening and structure
- Pack in specific skills, tools, and quantified achievements where provided
- Match the requested tone: ${tone || "Professional"}
- Make them ATS-friendly with relevant keywords
- Write in third person (no "I" statements)
- Sound human, not generic or templated
- Number each summary 1, 2, 3

Return ONLY the 3 numbered summaries, nothing else.`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.75,
        max_tokens: 800,
      }),
    });

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Split by numbered pattern like "1." or "1)" at start of line
    const summaries = content
      .split(/\n(?=\d+[\.\)])/g)
      .map((block: string) => block.replace(/^\d+[\.\)]\s*/, "").trim())
      .filter((s: string) => s.length > 20)
      .slice(0, 3);

    return NextResponse.json({ summaries });
  } catch {
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
