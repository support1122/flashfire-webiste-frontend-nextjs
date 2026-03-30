import { NextRequest, NextResponse } from "next/server"
import { analyzeMatch } from "@/src/utils/resumeMatchAnalysis"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("resume") as File | null
    const jobDescription = formData.get("jobDescription") as string | null

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

    if (!jobDescription || jobDescription.trim().length < 50) {
      return NextResponse.json(
        { success: false, error: "Job description must be at least 50 characters" },
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
        matchScore: 0,
        breakdown: [],
        missingKeywords: [],
        recommendations: [
          "This appears to be an image-based PDF. ATS systems cannot read image-based resumes. Please use a text-based PDF format.",
        ],
        warning: "image-based-pdf",
      })
    }

    const result = analyzeMatch(text, jobDescription)

    return NextResponse.json({
      success: true,
      matchScore: result.matchScore,
      breakdown: result.breakdown,
      missingKeywords: result.missingKeywords,
      recommendations: result.recommendations,
    })
  } catch (error: unknown) {
    console.error("[Resume Match API] Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to analyze resume. Please ensure the file is a valid PDF.",
      },
      { status: 500 },
    )
  }
}
