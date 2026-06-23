"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Updates", href: "/updates" },
  { name: "Contact Us", href: "/contact" },
  { name: "Login", href: "/login" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 overflow-hidden border-b border-slate-900/80 bg-slate-950/90 backdrop-blur-xl">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Logo />

        <nav className="hidden items-center gap-8 font-semibold text-base md:flex md:text-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative text-slate-300 transition duration-300 hover:text-white"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <button
          className="rounded-xl border border-slate-800 p-2 text-slate-300 transition hover:bg-slate-900 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-slate-900 bg-slate-950 md:hidden">
          <nav className="flex flex-col gap-5 px-6 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-slate-300 transition hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
