import { NextRequest } from 'next/server';
import { POST } from './route';
import { PrismaClient } from '@prisma/client';

// Mock Prisma
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  })),
}));

describe('/api/auth/register', () => {
  let mockPrisma: any;

  beforeEach(() => {
    mockPrisma = new PrismaClient();
    jest.clearAllMocks();
  });

  it('should register a new user successfully', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };

    mockPrisma.user.findUnique.mockResolvedValue(null);
    mockPrisma.user.create.mockResolvedValue({
      id: '1',
      email: userData.email,
      name: userData.name,
      createdAt: new Date(),
    });

    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.user.email).toBe(userData.email);
    expect(data.user.name).toBe(userData.name);
    expect(data.user.password).toBeUndefined(); // Password should not be returned
  });

  it('should return error for existing email', async () => {
    const userData = {
      email: 'existing@example.com',
      password: 'password123',
      name: 'Test User',
    };

    mockPrisma.user.findUnique.mockResolvedValue({
      id: '1',
      email: userData.email,
    });

    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Email already exists');
  });

  it('should validate required fields', async () => {
    const invalidData = {
      email: 'invalid-email',
      password: '123', // Too short
    };

    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(invalidData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('validation');
  });

  it('should handle database errors gracefully', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };

    mockPrisma.user.findUnique.mockRejectedValue(new Error('Database connection failed'));

    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Internal server error');
  });

  it('should handle invalid JSON', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: 'invalid json',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('Invalid JSON');
  });
}); 