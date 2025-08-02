import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({ 
      message: 'User registered successfully', 
      user: userWithoutPassword 
    }, { status: 201 });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error registering user:', error);
    }
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}
