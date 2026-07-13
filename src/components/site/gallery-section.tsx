import { Droplet, Flower2, Gift, Sparkles, Waves, Zap } from "lucide-react";
import { ScrollReveal, SectionEyebrowHeading } from "./scroll-reveal";
import { cn } from "@/lib/cn";

const TILES = [
  {
    icon: Zap,
    title: "Depilación láser",
    span: "sm:col-span-2 sm:row-span-2",
    gradient: "from-blush-200 via-blush-100 to-cream-100",
    height: "h-64 sm:h-full",
  },
  {
    icon: Waves,
    title: "Vela-Lite corporal",
    span: "sm:col-span-1",
    gradient: "from-gold-300/40 via-cream-200 to-cream-50",
    height: "h-48",
  },
  {
    icon: Droplet,
    title: "Limpieza facial",
    span: "sm:col-span-1",
    gradient: "from-cream-200 via-blush-100 to-blush-200",
    height: "h-48",
  },
  {
    icon: Flower2,
    title: "Espacio Mariel Martínez",
    span: "sm:col-span-2",
    gradient: "from-burgundy-500/15 via-blush-100 to-gold-300/20",
    height: "h-48",
  },
  {
    icon: Sparkles,
    title: "Dermapen rejuvenecedor",
    span: "sm:col-span-1",
    gradient: "from-gold-300/35 via-cream-100 to-blush-100",
    height: "h-48",
  },
  {
    icon: Gift,
    title: "Regalá belleza",
    span: "sm:col-span-3",
    gradient: "from-blush-200 via-gold-300/25 to-cream-100",
    height: "h-32",
  },
];

export function GallerySection() {
  return (
    <section id="galeria" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionEyebrowHeading
          eyebrow="Nuestro espacio"
          title="Un lugar pensado para vos"
          description="Cada rincón de nuestro espacio en Parque Batlle está pensado para tu confort y bienestar."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:grid-rows-2">
          {TILES.map((tile, i) => (
            <ScrollReveal key={tile.title} delay={i * 0.06} className={tile.span}>
              <div
                className={cn(
                  "bg-noise group relative flex w-full flex-col justify-end overflow-hidden rounded-[1.75rem] border border-gold-400/20 bg-gradient-to-br p-6",
                  tile.gradient,
                  tile.height
                )}
              >
                <tile.icon
                  className="absolute top-6 right-6 h-8 w-8 text-burgundy-600/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  strokeWidth={1.25}
                />
                <p className="font-display text-lg text-burgundy-700">{tile.title}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
