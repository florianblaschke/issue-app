import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";

const passwordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = passwordSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const existingUser = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (existingUser)
    return NextResponse.json(
      { error: "User already exists!" },
      { status: 400 }
    );

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      hashedPassword,
    },
  });
  return NextResponse.json({ email: newUser.email }, { status: 201 });
}