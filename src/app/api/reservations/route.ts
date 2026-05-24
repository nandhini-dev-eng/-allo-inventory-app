import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { productId, warehouseId, quantity } = body;

    const inventory = await prisma.inventory.findFirst({
      where: {
        productId,
        warehouseId,
      },
    });

    if (!inventory) {
      return NextResponse.json(
        { error: "Inventory not found" },
        { status: 404 }
      );
    }

    if (inventory.quantity < quantity) {
      return NextResponse.json(
        { error: "Not enough stock available" },
        { status: 409 }
      );
    }

    const reservation = await prisma.reservation.create({
      data: {
        productId,
        warehouseId,
        quantity,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 }
    );
  }
}