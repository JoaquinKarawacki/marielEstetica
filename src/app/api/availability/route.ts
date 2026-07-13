import { NextRequest, NextResponse } from "next/server";
import { endOfDay, parseISO, startOfDay } from "date-fns";
import { prisma } from "@/lib/prisma";
import { getAvailableSlots } from "@/lib/availability";

export async function GET(request: NextRequest) {
  const serviceId = request.nextUrl.searchParams.get("serviceId");
  const dateParam = request.nextUrl.searchParams.get("date");

  if (!serviceId || !dateParam) {
    return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
  }

  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) {
    return NextResponse.json({ error: "Servicio no encontrado" }, { status: 404 });
  }

  const day = parseISO(dateParam);
  if (Number.isNaN(day.getTime())) {
    return NextResponse.json({ error: "Fecha inválida" }, { status: 400 });
  }

  const [bookings, blocked] = await Promise.all([
    prisma.booking.findMany({
      where: {
        date: { gte: startOfDay(day), lte: endOfDay(day) },
        status: { notIn: ["cancelled"] },
      },
      select: { date: true, durationMin: true },
    }),
    prisma.blockedDate.findFirst({
      where: { date: { gte: startOfDay(day), lte: endOfDay(day) } },
    }),
  ]);

  const slots = getAvailableSlots({
    day,
    durationMin: service.durationMin,
    existingBookings: bookings,
    isBlocked: Boolean(blocked),
  });

  return NextResponse.json({ slots, blockedReason: blocked?.reason ?? null });
}
