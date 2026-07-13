import { Quote } from "lucide-react";
import { ScrollReveal, SectionEyebrowHeading } from "./scroll-reveal";

const TESTIMONIALS = [
  {
    name: "Cecilia Bentancor",
    service: "Depilación definitiva",
    quote:
      "Empecé el combo de cuerpo entero y ya desde la tercera sesión noté la diferencia. Mariel te explica todo el proceso y una se siente súper cómoda.",
  },
  {
    name: "Natalia Viera",
    service: "Vela-Lite Corporal",
    quote:
      "Vengo hace dos meses por lo del drenaje linfático y los resultados se notan un montón. El lugar es hermoso y súper prolijo.",
  },
  {
    name: "Fiorella Machado",
    service: "Limpieza facial + Dermapen",
    quote:
      "Mi piel cambió totalmente. Voy una vez por mes y ya es mi momento favorito de autocuidado. Re recomendable.",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionEyebrowHeading eyebrow="Lo que dicen de nosotras" title="Clientas que ya viven su mejor versión" />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal
              key={t.name}
              delay={i * 0.08}
              className="flex flex-col rounded-[1.75rem] border border-ink-700/[0.06] bg-cream-50 p-7"
            >
              <Quote className="h-7 w-7 text-gold-400" strokeWidth={1.25} />
              <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-ink-700/70">
                “{t.quote}”
              </p>
              <div className="mt-5 border-t border-ink-700/[0.06] pt-4">
                <p className="text-sm font-medium text-ink-900">{t.name}</p>
                <p className="text-xs text-burgundy-500">{t.service}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
