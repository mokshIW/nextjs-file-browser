import { createClient } from "@/utils/supabase/server";

// Insert new upload record into Supabase
export async function insertUpload(data: {
  author_id?: number;
  source: string;
  original_name: string;
  stored_name: string;
  file_size_bytes: number;
  file_size_mb: number;
  public_path: string;
  storage_path: string;
  keep_forever: boolean;
  created_at: string;
  updated_at: string;
  last_orphan_check_at: string;
}) {
  const supabase = await createClient(); // ✅ Await the client
  const { data: upload, error } = await supabase.from("uploads").insert([data]);

  if (error) {
    console.error("Error inserting upload:", error);
    throw new Error("Failed to insert upload");
  }

  return upload;
}

// Retrieve all uploads
export async function getAllUploads() {
  const supabase = await createClient(); // ✅ Await the client
  const { data, error } = await supabase.from("uploads").select("*");

  if (error) {
    console.error("Error fetching uploads:", error);
    throw new Error("Failed to fetch uploads");
  }

  return data;
}

// Retrieve a single upload by ID
export async function getUploadById(id: number) {
  const supabase = await createClient(); // ✅ Await the client
  const { data, error } = await supabase
    .from("uploads")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching upload with id ${id}:`, error);
    throw new Error("Upload not found");
  }

  return data;
}

// Update an upload record
export async function updateUpload(
  id: number,
  updatedData: Partial<Omit<Parameters<typeof insertUpload>[0], "created_at">>
) {
  const supabase = await createClient(); // ✅ Await the client
  const { data, error } = await supabase
    .from("uploads")
    .update(updatedData)
    .eq("id", id);

  if (error) {
    console.error(`Error updating upload with id ${id}:`, error);
    throw new Error("Failed to update upload");
  }

  return data;
}

// Delete an upload record
export async function deleteUpload(id: number) {
  const supabase = await createClient(); // ✅ Await the client
  const { error } = await supabase.from("uploads").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting upload with id ${id}:`, error);
    throw new Error("Failed to delete upload");
  }

  return { message: "Upload deleted successfully" };
}
