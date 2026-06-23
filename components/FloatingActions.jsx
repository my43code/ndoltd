"use client";

import Link from "next/link";
import { Search, MessageCircle } from "lucide-react";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
      <Link
        href="/search"
        className="flex items-center gap-2 bg-white text-slate-900 shadow-xl px-4 py-3 rounded-full hover:bg-slate-100 transition border border-slate-200"
      >
        <Search size={18} />
        <span className="hidden md:inline font-medium">Search</span>
      </Link>

      <Link
        href="/yutok"
        className="flex items-center gap-2 bg-emerald-600 text-white shadow-xl px-4 py-3 rounded-full hover:bg-emerald-700 transition"
      >
        <MessageCircle size={18} />
        <span className="hidden md:inline font-medium">YuTok</span>
      </Link>
    </div>
  );
}
