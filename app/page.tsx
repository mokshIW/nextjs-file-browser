import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-60 flex flex-col items-center justify-center gap-y-4">
      <h1 className="text-3xl text-white font-bold">Dashboard</h1>
      <div>
        <a
          href="/dashboard/file-browser"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 shadow-2xl shadow-cyan-50 transition-colors duration-200"
        >
          File Browser
        </a>
      </div>
    </div>
  );
}
