import { NextRequest, NextResponse } from "next/server";
import priceSchema from "./priceSchema";

interface Props {
  params: { slug: string };
}

export function GET(req: NextRequest) {
  return NextResponse.json(
    [
      { id: 1, name: "milk", price: 2.5 },
      { id: 2, name: "bread", price: 3.5 },
    ],
    { status: 201 }
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = priceSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  return NextResponse.json(
    { id: 10, name: body.name, price: body.price },
    { status: 201 }
  );
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const validation = priceSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  return NextResponse.json({ id: 101, name: body.name, price: body.price });
}

export function DELETE(req: NextResponse, { params: { slug } }: Props) {
  if (!slug)
    return NextResponse.json({ error: "Product not found!" }, { status: 400 });
  return NextResponse.json({}, { status: 200 });
}
