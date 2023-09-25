import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const user = await prisma.user.findUnique({ where: { id: id } });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const user = await prisma.user.findUnique({ where: { id: id } });
  if (!user)
    return NextResponse.json({ error: "User not found!" }, { status: 400 });

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(updatedUser, { status: 201 });
}

export async function PATCH(req: NextRequest, { params: { id } }: Props) {
  const body = await req.json();
  const hashPassword = await bcrypt.hash(body.password, 10);

  const user = await prisma.user.update({
    where: { id: id },
    data: {
      hashedPassword: hashPassword,
    },
  });

  if (!user)
    return NextResponse.json(
      { error: "User does not exist!" },
      { status: 404 }
    );

  return NextResponse.json(user, { status: 201 });
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  const user = await prisma.user.findUnique({ where: { id: id } });

  if (!user)
    return NextResponse.json({ error: "User not found!" }, { status: 400 });

  await prisma.user.delete({ where: { id: user.id } });

  return NextResponse.json({}, { status: 200 });
}
