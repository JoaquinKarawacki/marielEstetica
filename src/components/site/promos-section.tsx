import Link from "next/link";
import { Gift, Sparkle } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BRAND } from "@/lib/constants";

export function PromosSection() {
  return (
    <section id="promos" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <ScrollReveal className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-burgundy-600 via-burgundy-500 to-burgundy-600 p-9 text-cream-50 lg:col-span-3">
            <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-gold-400/20 blur-2xl" />
            <Badge tone="gold" className="relative">
              Cupos limitados
            </Badge>
            <h3 className="relative mt-5 max-w-sm font-display text-3xl leading-tight">
              Depilación definitiva cuerpo entero
            </h3>
            <p className="relative mt-3 max-w-sm text-sm leading-relaxed text-cream-50/75">
              6 sesiones con tecnología de última generación. Piel suave, sin vellos y sin
              irritación — sentite bien todos los días.
            </p>
            <div className="relative mt-6 flex items-baseline gap-2">
              <span className="font-display text-4xl">$14.000</span>
              <span className="text-sm text-cream-50/60">/ 6 sesiones</span>
            </div>
            <Button asChild variant="gold" className="relative mt-7">
              <Link href="/reservar?servicio=combo-depilacion-cuerpo-entero">Quiero este combo</Link>
            </Button>
          </ScrollReveal>

          <ScrollReveal
            delay={0.1}
            className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-gold-400/30 bg-cream-50 p-9 lg:col-span-2"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-400/15 text-gold-600">
                <Gift className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 font-display text-2xl text-ink-900">Gift Cards</h3>
              <p className="mt-3 flex items-center gap-1.5 font-script text-lg text-burgundy-500">
                <Sparkle className="h-4 w-4" />
                Regalá belleza, descanso y amor
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-ink-700/60">
                El regalo perfecto para mamá, tu hermana o tu mejor amiga. Elegí el monto y
                nosotras nos encargamos del resto.
              </p>
            </div>
            <Button asChild variant="outline" className="mt-7">
              <a href={BRAND.whatsappUrl} target="_blank" rel="noopener noreferrer">
                Consultar por WhatsApp
              </a>
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
