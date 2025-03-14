import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { insertUpload } from "@/app/actions/uploader";

export async function POST(req: Request) {
  try {
    // Log the Content-Type for debugging purposes
    const contentType = req.headers.get("content-type");
    console.log("Incoming Content-Type:", contentType);

    // Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const storedName = formData.get("storedName") as string;

    // Retrieve additional fields
    const source = formData.get("source")
      ? String(formData.get("source"))
      : "Dropzone Uploader";
    const original_name = formData.get("original_name")
      ? String(formData.get("original_name"))
      : file.name;
    const file_size_bytes = formData.get("file_size_bytes")
      ? Number(formData.get("file_size_bytes"))
      : file.size;
    const file_size_mb = formData.get("file_size_mb")
      ? Number(formData.get("file_size_mb"))
      : parseFloat((file.size / (1024 * 1024)).toFixed(2));
    const public_path = formData.get("public_path")
      ? String(formData.get("public_path"))
      : `/uploads/media/${storedName}`;
    const storage_path = formData.get("storage_path")
      ? String(formData.get("storage_path"))
      : `/public/uploads/media/${storedName}`;
    const created_at = formData.get("created_at")
      ? String(formData.get("created_at"))
      : new Date().toISOString();
    const updated_at = formData.get("updated_at")
      ? String(formData.get("updated_at"))
      : new Date().toISOString();
    const last_orphan_check_at = formData.get("last_orphan_check_at")
      ? String(formData.get("last_orphan_check_at"))
      : new Date().toISOString();

    // Validate required fields
    if (!file || !storedName) {
      return NextResponse.json(
        { error: "Invalid file upload" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Ensure the upload directory exists
    const uploadDir = path.join(process.cwd(), "public/uploads/media");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Write file to disk
    const filePath = path.join(uploadDir, storedName);
    fs.writeFileSync(filePath, buffer);

    // Insert record into Supabase
    const newUpload = await insertUpload({
      author_id: 1, // Dummy author_id for now
      source,
      original_name,
      stored_name: storedName,
      file_size_bytes,
      file_size_mb,
      public_path,
      storage_path,
      keep_forever: false,
      created_at,
      updated_at,
      last_orphan_check_at,
    });

    // Return success response including file and DB details
    return NextResponse.json(
      {
        message: "File uploaded and record inserted successfully",
        storedName,
        publicPath: public_path,
        storagePath: storage_path,
        newUpload,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in file upload and Supabase insertion:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
