"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/badge";
import { LogoMark } from "./logo";
import { BRAND } from "@/lib/constants";

const easeOut = [0.23, 1, 0.32, 1] as const;

function FloatingChip({
  className,
  delay,
  children,
}: {
  className?: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: easeOut }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay }}
        className="rounded-2xl border border-gold-400/30 bg-cream-50/95 px-4 py-3 shadow-[0_20px_50px_-20px_rgba(139,46,78,0.35)] backdrop-blur"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="bg-noise relative flex min-h-[100dvh] items-center overflow-hidden pt-32 pb-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-40 h-[32rem] w-[32rem] rounded-full bg-blush-200/50 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-gold-300/25 blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <Eyebrow>Parque Batlle · Montevideo</Eyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: easeOut }}
            className="mt-6 text-[2.6rem] leading-[1.08] font-medium text-ink-900 sm:text-6xl"
          >
            Belleza que te{" "}
            <span className="font-script font-normal text-burgundy-600">hace sentir</span> bien.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: easeOut }}
            className="mt-6 max-w-md text-[15.5px] leading-relaxed text-ink-700/70"
          >
            Depilación definitiva, tratamientos faciales y corporales con tecnología de última
            generación. Tu mejor versión te espera en {BRAND.addressShort}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: easeOut }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button asChild size="lg">
              <Link href="/reservar">
                Reservá tu turno
                <span className="grid h-7 w-7 place-items-center rounded-full bg-cream-50/15">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </Button>
            <Button asChild variant="whatsapp" size="lg">
              <a href={BRAND.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-[18px] w-[18px]" />
                Escribinos
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium tracking-wide text-ink-700/45 uppercase"
          >
            <span>Mercado Pago</span>
            <span className="h-1 w-1 rounded-full bg-ink-700/20" />
            <span>Transferencia</span>
            <span className="h-1 w-1 rounded-full bg-ink-700/20" />
            <span>Efectivo</span>
          </motion.div>
        </div>

        <div className="relative mx-auto hidden aspect-square w-full max-w-md lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: easeOut }}
            className="absolute inset-6 rounded-full border border-gold-400/40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: easeOut }}
            className="absolute inset-14 flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-blush-100 via-cream-50 to-gold-300/25 shadow-[0_40px_100px_-30px_rgba(139,46,78,0.4)]"
          >
            <LogoMark className="h-28 w-28" />
            <span className="mt-4 font-script text-3xl text-burgundy-600">Mariel Martínez</span>
            <span className="mt-1 text-[11px] font-medium tracking-[0.35em] text-gold-600 uppercase">
              Estética Femenina
            </span>
          </motion.div>

          <FloatingChip className="absolute -left-6 top-10" delay={0.7}>
            <p className="font-display text-lg text-burgundy-600">+400</p>
            <p className="text-[11px] text-ink-700/60">clientas felices</p>
          </FloatingChip>

          <FloatingChip className="absolute -right-4 bottom-16" delay={0.9}>
            <p className="text-[11px] font-medium text-ink-700/60">Tecnología</p>
            <p className="font-display text-base text-burgundy-600">Última generación</p>
          </FloatingChip>
        </div>
      </div>
    </section>
  );
}
