"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid"; // To generate random filenames

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadSource, setUploadSource] = useState<
    "Dropzone Uploader" | "Text Box" | null
  >(null);
  const [textBoxImage, setTextBoxImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Dropzone Handler
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        setUploadSource("Dropzone Uploader");
        setPreview(URL.createObjectURL(file));
      }
    },
  });

  // Handle Text Box Upload
  const handleTextBoxUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setTextBoxImage(file);
      setUploadSource("Text Box");
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle File Save
  const handleSave = async () => {
    const file = selectedFile || textBoxImage;
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    // Generate a random alphanumeric filename
    const storedName = `${uuidv4()}.${file.name.split(".").pop()}`;

    // Create a FormData object including all necessary fields
    const formData = new FormData();
    formData.append("file", file);
    formData.append("storedName", storedName);
    // Append additional fields that your API expects:
    formData.append("source", uploadSource || "Dropzone Uploader");
    formData.append("original_name", file.name);
    formData.append("file_size_bytes", file.size.toString());
    formData.append("file_size_mb", (file.size / (1024 * 1024)).toFixed(2));
    formData.append("public_path", `/uploads/media/${storedName}`);
    formData.append("storage_path", `/public/uploads/media/${storedName}`);
    const now = new Date().toISOString();
    formData.append("created_at", now);
    formData.append("updated_at", now);
    formData.append("last_orphan_check_at", now);

    // Send a single request to /api/uploads with multipart/form-data
    const response = await fetch("/api/uploads", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(`Error: ${errorData.error}`);
      return;
    }

    const result = await response.json();
    console.log("Upload success:", result);
    // alert("File uploaded successfully!");
    setSelectedFile(null);
    setTextBoxImage(null);
    setPreview(null);
  };

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center gap-y-6 p-6">
      <h1 className="text-3xl text-white font-bold">Dashboard</h1>

      {/* Dropzone Uploader */}
      <div
        {...getRootProps()}
        className="border-dashed border-2 border-gray-300 p-6 w-96 text-center cursor-pointer hover:bg-gray-100"
      >
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select</p>
      </div>

      {/* Text Box Uploader */}
      <div className="mt-4">
        <label className="block text-white">Upload via Text Box:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleTextBoxUpload}
          className="mt-2 p-2 border border-gray-300 bg-white"
        />
      </div>

      {/* Preview */}
      {preview && (
        <div className="mt-4">
          <p className="text-white">Preview:</p>
          <Image
            src={preview}
            alt="Preview"
            width={150}
            height={150}
            className="mt-2 border border-gray-300"
          />
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
}
