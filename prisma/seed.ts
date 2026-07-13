import "dotenv/config";
import { addDays } from "date-fns";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../src/generated/prisma/client";
import { generateBookingCode } from "../src/lib/booking-code";
import { buildWhatsappPreview } from "../src/lib/whatsapp-preview";
import { montevideoDateTime, toMontevideoFields, toMontevideoDateStr, todayInMontevideo } from "../src/lib/timezone";

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL ?? "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

const services = [
  {
    slug: "depilacion-definitiva",
    name: "Depilación Definitiva / Láser",
    category: "depilacion",
    description:
      "Depilación láser de última generación, por zona. Piel suave, sin vellos y sin irritación — sentite bien todos los días.",
    benefits: "Tecnología de última generación,Menos dolor y más confort,Resultados progresivos y duraderos,Segura para todo tipo de piel",
    durationMin: 30,
    price: 800,
    priceLabel: "Desde $800 (sin gel)",
    icon: "zap",
    featured: false,
    order: 1,
  },
  {
    slug: "combo-depilacion-cuerpo-entero",
    name: "Combo Depilación Cuerpo Entero",
    category: "depilacion",
    description:
      "6 sesiones de depilación definitiva de cuerpo entero al mejor precio. Ideal para empezar tu tratamiento completo.",
    benefits: "6 sesiones incluidas,Cuerpo entero,Ahorro vs. sesiones sueltas,Cupos limitados",
    durationMin: 60,
    price: 14000,
    priceLabel: "6 sesiones por $14.000",
    icon: "gift",
    featured: true,
    order: 2,
  },
  {
    slug: "dermapen-facial",
    name: "Dermapen Facial",
    category: "facial",
    description:
      "Tratamiento rejuvenecedor con microagujas que estimula el colágeno natural de la piel para un rostro más firme y luminoso.",
    benefits: "Rejuvenecedor,Estimula colágeno,Piel más firme,Resultados progresivos",
    durationMin: 45,
    price: 2000,
    priceLabel: "$2.000",
    icon: "sparkles",
    featured: false,
    order: 3,
  },
  {
    slug: "limpieza-facial",
    name: "Limpieza Facial Profunda",
    category: "facial",
    description:
      "Limpieza profunda + hidratación para renovar tu piel, eliminar impurezas y devolverle su luminosidad natural.",
    benefits: "Limpieza profunda,Hidratación,Piel renovada,Apto todo tipo de piel",
    durationMin: 60,
    price: 1800,
    priceLabel: "$1.800",
    icon: "droplet",
    featured: false,
    order: 4,
  },
  {
    slug: "vela-lite-corporal",
    name: "Vela-Lite Corporal",
    category: "corporal",
    description:
      "Tecnología Vela-Lite que reduce la celulitis y reafirma la piel. Modos: celulitis, modelación, circulatorio, relajación, drenaje linfático y modo manual.",
    benefits: "Reduce celulitis,Reafirma la piel,Modelación corporal,Drenaje linfático",
    durationMin: 45,
    price: 2500,
    priceLabel: "$2.500 / sesión",
    icon: "waves",
    featured: true,
    order: 5,
  },
  {
    slug: "adiposidad-localizada",
    name: "Tratamiento Adiposidad Localizada",
    category: "corporal",
    description:
      "Combate la celulitis y la flacidez, modela tu figura y activa el drenaje linfático para resultados visibles y duraderos.",
    benefits: "Celulitis,Flacidez,Modela tu figura,Drenaje linfático",
    durationMin: 45,
    price: 2200,
    priceLabel: "$2.200 / sesión",
    icon: "activity",
    featured: false,
    order: 6,
  },
];

function nextBookableDate(baseOffsetDays: number, hour: number, minute: number) {
  let d = addDays(todayInMontevideo(), baseOffsetDays);
  if (toMontevideoFields(d).getUTCDay() === 0) d = addDays(d, 1); // domingo cerrado -> corre a lunes
  const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  return montevideoDateTime(toMontevideoDateStr(d), time);
}

async function main() {
  console.log("Limpiando datos existentes...");
  await prisma.notification.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.service.deleteMany();
  await prisma.availabilityRule.deleteMany();
  await prisma.blockedDate.deleteMany();

  console.log("Creando servicios...");
  const created: Record<string, string> = {};
  for (const s of services) {
    const service = await prisma.service.create({ data: s });
    created[s.slug] = service.id;
  }

  console.log("Creando reglas de disponibilidad...");
  const weekdayHours: [number, string, string][] = [
    [1, "09:00", "19:00"],
    [2, "09:00", "19:00"],
    [3, "09:00", "19:00"],
    [4, "09:00", "19:00"],
    [5, "09:00", "19:00"],
    [6, "09:00", "13:00"],
  ];
  for (const [weekday, startTime, endTime] of weekdayHours) {
    await prisma.availabilityRule.create({
      data: { weekday, startTime, endTime, active: true },
    });
  }

  console.log("Creando reservas de ejemplo...");
  const bookings = [
    {
      serviceSlug: "limpieza-facial",
      date: nextBookableDate(0, 10, 0),
      clientName: "Ana Ramírez",
      clientPhone: "099123456",
      clientEmail: "ana.ramirez@gmail.com",
      note: "Primera vez, piel sensible.",
      status: "confirmed",
    },
    {
      serviceSlug: "vela-lite-corporal",
      date: nextBookableDate(0, 15, 0),
      clientName: "Lucía Fernández",
      clientPhone: "098234567",
      status: "confirmed",
    },
    {
      serviceSlug: "dermapen-facial",
      date: nextBookableDate(1, 11, 0),
      clientName: "Valentina Souza",
      clientPhone: "097345678",
      note: "Vino por promo de Instagram.",
      status: "confirmed",
    },
    {
      serviceSlug: "depilacion-definitiva",
      date: nextBookableDate(1, 16, 30),
      clientName: "Camila Rodríguez",
      clientPhone: "096456789",
      status: "confirmed",
    },
    {
      serviceSlug: "adiposidad-localizada",
      date: nextBookableDate(2, 9, 30),
      clientName: "Sofía Pereira",
      clientPhone: "095567890",
      status: "confirmed",
    },
    {
      serviceSlug: "combo-depilacion-cuerpo-entero",
      date: nextBookableDate(2, 14, 0),
      clientName: "Martina Silva",
      clientPhone: "094678901",
      note: "Primera sesión del combo de 6.",
      status: "confirmed",
    },
    {
      serviceSlug: "vela-lite-corporal",
      date: nextBookableDate(3, 10, 30),
      clientName: "Guadalupe Acosta",
      clientPhone: "093789012",
      status: "cancelled",
    },
    {
      serviceSlug: "limpieza-facial",
      date: nextBookableDate(3, 17, 0),
      clientName: "Florencia Gómez",
      clientPhone: "092890123",
      status: "confirmed",
    },
    {
      serviceSlug: "dermapen-facial",
      date: nextBookableDate(-1, 12, 0),
      clientName: "Rocío Ibarra",
      clientPhone: "091901234",
      status: "completed",
    },
    {
      serviceSlug: "depilacion-definitiva",
      date: nextBookableDate(4, 11, 30),
      clientName: "Daniela Castro",
      clientPhone: "090012345",
      note: "Reagendó por trabajo.",
      status: "rescheduled",
    },
    {
      serviceSlug: "vela-lite-corporal",
      date: nextBookableDate(5, 10, 0),
      clientName: "Micaela Correa",
      clientPhone: "099888777",
      status: "confirmed",
    },
  ];

  for (const b of bookings) {
    const service = services.find((s) => s.slug === b.serviceSlug)!;
    const booking = await prisma.booking.create({
      data: {
        code: generateBookingCode(),
        serviceId: created[b.serviceSlug],
        date: b.date,
        durationMin: service.durationMin,
        clientName: b.clientName,
        clientPhone: b.clientPhone,
        clientEmail: "clientEmail" in b ? (b as { clientEmail?: string }).clientEmail : undefined,
        note: "note" in b ? (b as { note?: string }).note : undefined,
        status: b.status,
      },
    });

    const notifType =
      b.status === "cancelled" ? "cancelled" : b.status === "rescheduled" ? "rescheduled" : "new_booking";
    const preview = buildWhatsappPreview({
      type: notifType,
      clientName: b.clientName,
      clientPhone: b.clientPhone,
      serviceName: service.name,
      date: b.date,
    });

    await prisma.notification.create({
      data: {
        bookingId: booking.id,
        type: notifType,
        title: preview.title,
        message: preview.message,
        clientName: b.clientName,
        read: true,
      },
    });
  }

  console.log(`Listo: ${services.length} servicios, ${bookings.length} reservas.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
