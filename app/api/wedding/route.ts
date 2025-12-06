import { put, list } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { WeddingInfo } from "@/lib/data/wedding";

// GET - Fetch wedding data from blob
export async function GET() {
  try {
    // List all wedding data files from Vercel Blob
    const { blobs } = await list({
      prefix: "wedding/",
    });

    if (blobs.length === 0) {
      // Return default wedding data if no custom data exists
      return NextResponse.json({
        success: true,
        data: null,
        useDefault: true,
      });
    }

    // Get the most recent wedding data file
    const latestBlob = blobs.sort((a, b) => 
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )[0];

    const response = await fetch(latestBlob.url);
    const weddingData = await response.json();

    return NextResponse.json({
      success: true,
      data: weddingData,
      useDefault: false,
    });
  } catch (error) {
    console.error("Error fetching wedding data:", error);
    return NextResponse.json(
      { error: "Failed to fetch wedding data" },
      { status: 500 }
    );
  }
}

// POST - Save wedding data to blob
export async function POST(request: NextRequest) {
  try {
    const weddingData: WeddingInfo = await request.json();

    if (!weddingData) {
      return NextResponse.json(
        { error: "Wedding data is required" },
        { status: 400 }
      );
    }

    // Save to Vercel Blob with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `wedding-${timestamp}.json`;

    const { url } = await put(
      `wedding/${filename}`,
      JSON.stringify(weddingData, null, 2),
      {
        access: "public",
        contentType: "application/json",
      }
    );

    return NextResponse.json(
      {
        success: true,
        data: weddingData,
        url,
        filename,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving wedding data:", error);
    return NextResponse.json(
      { error: "Failed to save wedding data" },
      { status: 500 }
    );
  }
}