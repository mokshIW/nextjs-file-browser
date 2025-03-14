"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-80 bg-gray-800 text-white px-8 py-8">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <nav className="space-y-4">
          <Link href="/dashboard">
            <span
              className={`block px-4 py-2 my-2 rounded cursor-pointer ${
                pathname === "/dashboard" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              Home
            </span>
          </Link>
          <Link href="/dashboard/file-browser">
            <span
              className={`block px-4 py-2 my-2 rounded cursor-pointer ${
                pathname === "/dashboard/file-browser"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              File Browser
            </span>
          </Link>
          <Link href="/dashboard/analytics">
            <span
              className={`block px-4 py-2 my-2 rounded cursor-pointer ${
                pathname === "/dashboard/analytics"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              Analytics
            </span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">{children}</main>
    </div>
  );
}
