import { put, list, del } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export interface RSVPData {
  id: string;
  name: string;
  attendance: "hadir" | "tidak-hadir";
  message: string;
  timestamp: string;
}

// POST - Submit RSVP
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, attendance, message } = body;

    if (!name || !attendance) {
      return NextResponse.json(
        { error: "Name and attendance are required" },
        { status: 400 }
      );
    }

    // Create RSVP data
    const rsvpData: RSVPData = {
      id: `rsvp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      attendance,
      message: message || "",
      timestamp: new Date().toISOString(),
    };

    // Save to Vercel Blob
    const { url } = await put(
      `rsvp/${rsvpData.id}.json`,
      JSON.stringify(rsvpData),
      {
        access: "public",
        contentType: "application/json",
      }
    );

    return NextResponse.json(
      {
        success: true,
        data: rsvpData,
        url,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving RSVP:", error);
    return NextResponse.json(
      { error: "Failed to save RSVP" },
      { status: 500 }
    );
  }
}

// GET - Fetch all RSVPs
export async function GET() {
  try {
    // List all RSVP files from Vercel Blob
    const { blobs } = await list({
      prefix: "rsvp/",
    });

    // Fetch each RSVP file
    const rsvps: RSVPData[] = [];
    
    for (const blob of blobs) {
      try {
        const response = await fetch(blob.url);
        const data = await response.json();
        rsvps.push(data);
      } catch (error) {
        console.error(`Error fetching blob ${blob.pathname}:`, error);
      }
    }
    
    // Sort by timestamp (newest first)
    rsvps.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json({
      success: true,
      data: rsvps,
      count: rsvps.length,
    });
  } catch (error) {
    console.error("Error fetching RSVPs:", error);
    return NextResponse.json(
      { error: "Failed to fetch RSVPs" },
      { status: 500 }
    );
  }
}

// DELETE - Delete RSVP
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "RSVP ID is required" },
        { status: 400 }
      );
    }

    // Delete from Vercel Blob
    await del(`rsvp/${id}.json`);

    return NextResponse.json({
      success: true,
      message: "RSVP deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting RSVP:", error);
    return NextResponse.json(
      { error: "Failed to delete RSVP" },
      { status: 500 }
    );
  }
}