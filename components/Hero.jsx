import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        
        {/* ✅ LEFT CONTENT */}
        <div>
          <span className="inline-block bg-yellow-400/20 text-yellow-300 px-4 py-2 rounded-full text-sm mb-6 border border-yellow-400/30">
            Web Development • IT Support • Digital Solutions
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Building Smart Technology Solutions for PNG Businesses
          </h1>

          <p className="mt-6 text-lg text-slate-300 max-w-xl leading-relaxed">
            Nexus DevOps Limited delivers professional websites, digital systems,
            database-driven platforms, and IT support for modern organizations.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/services"
              className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-full font-medium transition shadow-lg hover:scale-105"
            >
              Explore Services
            </Link>

            <Link
              href="/contact"
              className="border border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black px-6 py-3 rounded-full font-medium transition"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* ✅ RIGHT IMAGE */}
        <div className="relative">
          <Image
            src="/images/hero-tech.jpg"
            alt="Nexus DevOps Technology"
            width={700}
            height={500}
            className="rounded-2xl shadow-2xl w-full h-auto object-cover border border-yellow-400/30"
          />

          {/* ✅ GLOW EFFECT */}
          <div className="absolute -inset-1 bg-yellow-400/10 blur-2xl rounded-2xl -z-10"></div>
        </div>

      </div>
    </section>
  );
}