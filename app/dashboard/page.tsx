import React from "react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-6 w-full flex flex-col items-center justify-center">
      <h1 className="text-3xl text-black font-bold">
        Welcome to the Dashboard
      </h1>
      <p className="text-gray-700 mt-2">
        Use the sidebar to navigate to different sections.
      </p>
      <div className="mt-4 space-x-4">
        <Link href="/dashboard/file-browser">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Go to File Browser
          </button>
        </Link>
        <Link href="/dashboard/analytics">
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Go to Analytics
          </button>
        </Link>
      </div>
    </div>
  );
}
