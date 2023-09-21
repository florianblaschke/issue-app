import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import productSchema from "./productSchema";

export async function GET(req: NextRequest) {
  const products = await prisma.product.findMany();
  return NextResponse.json(products, { status: 201 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = productSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newProduct = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
    },
  });
  return NextResponse.json(newProduct, { status: 201 });
}
