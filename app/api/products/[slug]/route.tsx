import prisma from "@/prisma/client";
import { NextResponse, NextRequest } from "next/server";
import productSchema from "../productSchema";

interface Props {
  params: { slug: string };
}

export async function GET(req: NextRequest, { params: { slug } }: Props) {
  const product = await prisma.product.findUnique({
    where: { name: slug },
  });

  if (!product)
    return NextResponse.json({ error: "Product not found!" }, { status: 400 });

  return NextResponse.json(product, { status: 200 });
}

export async function PUT(req: NextRequest, { params: { slug } }: Props) {
  const body = await req.json();
  const validation = productSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const productToUpdate = await prisma.product.findUnique({
    where: { name: slug },
  });

  if (!productToUpdate)
    return NextResponse.json(
      { error: "Could not find the product!" },
      { status: 400 }
    );

  const updatedProduct = await prisma.product.update({
    where: { name: productToUpdate.name },
    data: {
      name: body.name,
      price: body.price,
    },
  });

  return NextResponse.json({ updatedProduct }, { status: 201 });
}

export async function DELETE(req: NextResponse, { params: { slug } }: Props) {
  const productToDelete = await prisma.product.findUnique({
    where: { name: slug },
  });

  if (!productToDelete)
    return NextResponse.json({ error: "Product not found!" }, { status: 400 });

  await prisma.product.delete({ where: { name: productToDelete.name } });

  return NextResponse.json({}, { status: 200 });
}
