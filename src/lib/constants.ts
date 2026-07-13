export const BRAND = {
  name: "Mariel Martínez",
  tagline: "Estética Femenina",
  instagram: "marielestetica52",
  instagramUrl: "https://instagram.com/marielestetica52",
  phoneDisplay: "096 249 862",
  phoneRaw: "59896249862",
  whatsappUrl: "https://wa.me/59896249862",
  address: "Gral. Urquiza 2737 / 601, Parque Batlle, Montevideo, Uruguay",
  addressShort: "Gral. Urquiza 2737, Parque Batlle",
  professional: "Mariel Martínez",
  slogans: [
    "Belleza que te hace sentir bien",
    "Tu mejor versión te espera",
    "Regalá belleza, descanso y amor",
  ],
  payments: ["Mercado Pago", "Transferencia", "Efectivo"],
} as const;

export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "mariel";
export const ADMIN_COOKIE_NAME = "mm_admin_session";

export const CATEGORY_LABELS: Record<string, string> = {
  facial: "Facial",
  corporal: "Corporal",
  depilacion: "Depilación",
};

export const BUSINESS_HOURS: Record<number, { start: string; end: string } | null> = {
  0: null, // domingo — cerrado
  1: { start: "09:00", end: "19:00" },
  2: { start: "09:00", end: "19:00" },
  3: { start: "09:00", end: "19:00" },
  4: { start: "09:00", end: "19:00" },
  5: { start: "09:00", end: "19:00" },
  6: { start: "09:00", end: "13:00" },
};

export const HOURS_DISPLAY = [
  { label: "Lunes a viernes", value: "9:00 a 19:00" },
  { label: "Sábados", value: "9:00 a 13:00" },
  { label: "Domingos", value: "Cerrado" },
];

export const SLOT_STEP_MIN = 30;
