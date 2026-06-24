import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { connection } from "next/server";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "Nexus DevOps Limited",
  description:
    "Professional Nexus DevOps Limited website built with Next.js, MongoDB, and Tailwind CSS. Showcasing our services, projects, and company information with dynamic content management.",
  icons: {
    icon: "/images/logo.jpg",
  },
};

export default async function RootLayout({ children }) {
  await connection();

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_34%),linear-gradient(180deg,#f8fafc_0%,#f8fafc_65%,#eef2ff_100%)] text-slate-800 antialiased selection:bg-emerald-300 selection:text-slate-950">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
