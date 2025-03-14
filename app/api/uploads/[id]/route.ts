import { NextResponse } from "next/server";
import {
  getUploadById,
  updateUpload,
  deleteUpload,
} from "@/app/actions/uploader";

// GET /api/uploads/[id] - Retrieve a single upload by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const upload = await getUploadById(Number(params.id));
    return NextResponse.json(upload);
  } catch (error: any) {
    // ✅ Explicitly typing the error
    console.error("Error fetching upload:", error);
    return NextResponse.json(
      { error: error.message || "Upload not found" },
      { status: 404 }
    );
  }
}

// PUT /api/uploads/[id] - Update an upload
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const updatedUpload = await updateUpload(Number(params.id), body);

    return NextResponse.json(updatedUpload);
  } catch (error: any) {
    // ✅ Explicitly typing the error
    console.error("Error updating upload:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE /api/uploads/[id] - Delete an upload
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteUpload(Number(params.id));
    return NextResponse.json({ message: "Upload deleted successfully" });
  } catch (error: any) {
    // ✅ Explicitly typing the error
    console.error("Error deleting upload:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
