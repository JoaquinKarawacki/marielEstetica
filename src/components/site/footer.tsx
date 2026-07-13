import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";
import { Logo } from "./logo";
import { InstagramGlyph } from "./instagram-glyph";
import { BRAND } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative border-t border-ink-700/[0.06] bg-cream-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-ink-700/55">
              {BRAND.slogans[1]}. Tratamientos faciales, corporales y depilación definitiva en
              Parque Batlle, Montevideo.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-[13.5px]">
            <a
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-ink-700/70 transition-colors hover:text-burgundy-600"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              {BRAND.phoneDisplay}
            </a>
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-ink-700/70 transition-colors hover:text-burgundy-600"
            >
              <InstagramGlyph className="h-4 w-4" />@{BRAND.instagram}
            </a>
            <span className="flex items-center gap-2.5 text-ink-700/70">
              <MapPin className="h-4 w-4" strokeWidth={1.5} />
              {BRAND.address}
            </span>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-ink-700/[0.06] pt-6 text-xs text-ink-700/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Mariel Martínez Estética Femenina.</p>
          <div className="flex items-center gap-5">
            <Link href="/mis-turnos" className="transition-colors hover:text-burgundy-600">
              Mis turnos
            </Link>
            <Link href="/admin" className="transition-colors hover:text-burgundy-600">
              Panel
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
