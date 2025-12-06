import { put, list, del } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export interface Guest {
  id: string;
  name: string;
  side: "bride" | "groom";
  createdAt: string;
}

// POST - Add a new guest
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, side } = body;

    if (!name || !side) {
      return NextResponse.json(
        { error: "Name and side are required" },
        { status: 400 }
      );
    }

    if (side !== "bride" && side !== "groom") {
      return NextResponse.json(
        { error: "Side must be either 'bride' or 'groom'" },
        { status: 400 }
      );
    }

    // Create guest data
    const guest: Guest = {
      id: `guest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      side,
      createdAt: new Date().toISOString(),
    };

    // Save to Vercel Blob
    const { url } = await put(
      `guests/${guest.id}.json`,
      JSON.stringify(guest),
      {
        access: "public",
        contentType: "application/json",
      }
    );

    return NextResponse.json(
      {
        success: true,
        data: guest,
        url,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving guest:", error);
    return NextResponse.json(
      { error: "Failed to save guest" },
      { status: 500 }
    );
  }
}

// GET - Fetch all guests
export async function GET() {
  try {
    // List all guest files from Vercel Blob
    const { blobs } = await list({
      prefix: "guests/",
    });

    // Fetch each guest file
    const guests: Guest[] = [];
    
    for (const blob of blobs) {
      try {
        const response = await fetch(blob.url);
        const data = await response.json();
        guests.push(data);
      } catch (error) {
        console.error(`Error fetching blob ${blob.pathname}:`, error);
      }
    }

    // Sort by creation date (newest first)
    guests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      success: true,
      data: guests,
      count: guests.length,
    });
  } catch (error) {
    console.error("Error fetching guests:", error);
    return NextResponse.json(
      { error: "Failed to fetch guests" },
      { status: 500 }
    );
  }
}

// DELETE - Delete guest
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Guest ID is required" },
        { status: 400 }
      );
    }

    // Delete from Vercel Blob
    await del(`guests/${id}.json`);

    return NextResponse.json({
      success: true,
      message: "Guest deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting guest:", error);
    return NextResponse.json(
      { error: "Failed to delete guest" },
      { status: 500 }
    );
  }
}