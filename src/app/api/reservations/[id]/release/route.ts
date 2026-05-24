import { NextResponse } from "next/server";
import { PrismaClient, ReservationStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const reservation = await prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    const updatedReservation = await prisma.reservation.update({
      where: { id },
      data: {
        status: ReservationStatus.RELEASED,
      },
    });

    return NextResponse.json(updatedReservation);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to release reservation" },
      { status: 500 }
    );
  }
}