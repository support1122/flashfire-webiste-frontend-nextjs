import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { role, task, metric, category } = await req.json();
  if (!role?.trim() || !task?.trim()) {
    return NextResponse.json({ error: "Role and task are required" }, { status: 400 });
  }

  const context = [
    `Job Title/Role: ${role}`,
    `Task/Responsibility: ${task}`,
    metric ? `Result/Metric: ${metric}` : null,
    category ? `Verb Style/Category: ${category}` : null,
  ].filter(Boolean).join("\n");

  const prompt = `You are an expert resume writer who transforms vague job duties into sharp, ATS-friendly, achievement-oriented bullet points.

Generate 5 distinct resume bullet points for the following:

${context}

Study these real-world examples of excellent resume bullet points:

SOFTWARE ENGINEER bullets:
• Re-architected the indexing analytics ingestion service in Go, replacing Logstash with a high-throughput batching pipeline that enabled parallel writes to PostgreSQL and MongoDB, cutting database call volume by 500x and improving indexing efficiency.
• Enabled end-to-end ransomware detection pipelines for Microsoft 365 (OneDrive, SharePoint) by emitting cluster-level indexing statistics, strengthening anomaly detection coverage across enterprise SaaS workloads.
• Optimized large-scale Apache Spark anti-ransomware pipelines by tuning executors and managing Kafka checkpoints, reducing debugging time from 2 hours to 10 minutes and improving pipeline stability.

MARKETING ANALYST bullets:
• Evaluated 1M+ university event, registration, and engagement datasets with SQL and Python to measure attendance, participation trends, audience behavior, and funnel performance across 15+ platforms.
• Analyzed Google Ads, social campaign, CRM, and customer funnel data to identify drop-off points, refine audience targeting, and improve campaign ROI by 12%.
• Automated SQL validation checks and Python reporting workflows, reducing reporting discrepancies by 25% and improving marketing analytics accuracy for recurring stakeholder reviews.

BUSINESS INTELLIGENCE ANALYST bullets:
• Migrated enterprise BI workloads to Snowflake and optimized warehouse design with clustering and partitioning strategies, solving slow query performance and improving dashboard responsiveness by 50% for cross-department reporting.
• Spearheaded ETL pipelines using Apache Airflow and SQL to solve delays in reporting data availability, improving pipeline processing efficiency by 35% and enabling faster delivery of analytics for stakeholder teams.

AI ENGINEER bullets:
• Constructed LLM-driven routing and triage microservices integrating GPT inference with Jira APIs, boosting classification accuracy to 92.6% and automating 87% of manual support workflows.
• Architected real-time ingestion and ETL pipelines for AI/ML articles using RSS + API feeds, achieving 2.8s end-to-end processing latency and keeping service disruption under 2.3% during heavy traffic spikes.

Rules for generating bullets:
- Generate exactly 5 bullet points
- Start each with a strong past-tense action verb (vary across bullets)
- Include specific technologies, tools, or methods where relevant
- Incorporate the metric/result naturally if provided
- Each bullet should be 1-2 sentences, concise but impactful
- Make them ATS-friendly and achievement-oriented
- Do NOT use bullet symbols — just the text, numbered 1-5
- Vary the verb category to match: ${category || "Achievement"}

Return ONLY the 5 numbered bullet texts, nothing else.`;

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
        temperature: 0.8,
        max_tokens: 600,
      }),
    });

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "";

    const bullets = content
      .split("\n")
      .map((line: string) => line.replace(/^\d+[\.\)]\s*/, "").replace(/^[•\-\*]\s*/, "").trim())
      .filter((line: string) => line.length > 10)
      .slice(0, 5);

    return NextResponse.json({ bullets });
  } catch {
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
