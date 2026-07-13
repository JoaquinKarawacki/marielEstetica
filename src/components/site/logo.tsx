import { cn } from "@/lib/cn";

export function LogoMark({ className }: { className?: string }) {
  const petal = "M60,60 C50,44 50,18 60,10 C70,18 70,44 60,60 Z";

  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("h-10 w-10", className)}
      role="img"
      aria-label="Mariel Martínez Estética"
    >
      <circle cx="60" cy="60" r="57" fill="none" stroke="var(--color-gold-400)" strokeWidth="1" />
      <circle cx="60" cy="60" r="51" fill="none" stroke="var(--color-gold-400)" strokeWidth="0.6" opacity="0.7" />

      <g>
        {[0, 72, 144, 216, 288].map((deg) => (
          <path
            key={deg}
            d={petal}
            fill="var(--color-blush-300)"
            fillOpacity="0.85"
            stroke="var(--color-gold-500)"
            strokeWidth="1"
            strokeLinejoin="round"
            transform={`rotate(${deg} 60 60)`}
          />
        ))}
      </g>

      <circle cx="60" cy="60" r="6" fill="var(--color-burgundy-500)" />
      <circle cx="60" cy="60" r="9" fill="none" stroke="var(--color-gold-400)" strokeWidth="0.75" />
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  showTagline = true,
}: {
  className?: string;
  markClassName?: string;
  showTagline?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className={markClassName} />
      <span className="flex flex-col leading-none">
        <span className="font-script text-2xl text-burgundy-600">Mariel Martínez</span>
        {showTagline && (
          <span className="mt-0.5 text-[10px] font-medium tracking-[0.35em] text-gold-600 uppercase">
            Estética Femenina
          </span>
        )}
      </span>
    </span>
  );
}

export function LogoBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex aspect-square w-full max-w-[220px] flex-col items-center justify-center rounded-full border border-gold-400/60 bg-cream-50 p-8 text-center shadow-[0_8px_40px_rgba(139,46,78,0.12)]",
        className
      )}
    >
      <div className="absolute inset-3 rounded-full border border-gold-400/40" />
      <LogoMark className="h-16 w-16" />
      <span className="mt-3 font-script text-2xl text-burgundy-600">Mariel Martínez</span>
      <span className="mt-1 text-[9px] font-medium tracking-[0.3em] text-gold-600 uppercase">
        Estética Femenina
      </span>
    </div>
  );
}
