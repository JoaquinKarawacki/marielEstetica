import { NextResponse } from "next/server";
import { endOfDay, endOfWeek, startOfDay, startOfWeek } from "date-fns";
import { prisma } from "@/lib/prisma";
import { isAdminAuthed } from "@/lib/admin-auth";

export async function GET() {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const now = new Date();
  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

  const [todayCount, upcomingCount, cancelledCount, weekBookings] = await Promise.all([
    prisma.booking.count({
      where: { date: { gte: todayStart, lte: todayEnd }, status: { notIn: ["cancelled"] } },
    }),
    prisma.booking.count({
      where: { date: { gt: todayEnd }, status: { notIn: ["cancelled"] } },
    }),
    prisma.booking.count({ where: { status: "cancelled" } }),
    prisma.booking.findMany({
      where: {
        date: { gte: weekStart, lte: weekEnd },
        status: { notIn: ["cancelled"] },
      },
      include: { service: true },
    }),
  ]);

  const revenueThisWeek = weekBookings.reduce((sum, b) => sum + b.service.price, 0);

  return NextResponse.json({
    todayCount,
    upcomingCount,
    cancelledCount,
    revenueThisWeek,
    bookingsThisWeek: weekBookings.length,
  });
}
