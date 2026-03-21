import { NextRequest, NextResponse } from "next/server"
import { analyzeATS } from "@/src/utils/atsAnalysis"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("resume") as File | null

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 },
      )
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { success: false, error: "Only PDF files are supported" },
        { status: 400 },
      )
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File size must be less than 5MB" },
        { status: 400 },
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    // Import the lib directly to avoid pdf-parse's index.js loading a test PDF file
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfParse = require("pdf-parse/lib/pdf-parse") as (dataBuffer: Buffer) => Promise<{ text: string; numpages: number; info: Record<string, unknown> }>
    const pdfData = await pdfParse(buffer)
    const text = pdfData.text || ""

    if (text.replace(/\s/g, "").length < 50) {
      return NextResponse.json({
        success: true,
        score: 0,
        breakdown: [],
        summary:
          "This appears to be an image-based PDF. ATS systems cannot read image-based resumes. Please use a text-based PDF format.",
        warning: "image-based-pdf",
      })
    }

    const result = analyzeATS(text)

    return NextResponse.json({
      success: true,
      score: result.score,
      breakdown: result.breakdown,
      summary: result.summary,
    })
  } catch (error: unknown) {
    console.error("[ATS Score API] Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to analyze resume. Please ensure the file is a valid PDF.",
      },
      { status: 500 },
    )
  }
}
