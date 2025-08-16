import { PrismaClient } from '@prisma/client';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prismaClient: PrismaClient | undefined;

function getPrismaClient(): PrismaClient {
  if (process.env.NODE_ENV === 'production') {
    if (!prismaClient) {
      prismaClient = new PrismaClient();
    }
    return prismaClient;
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    return global.prisma;
  }
}

// Export prisma instance for direct use
export const prisma = getPrismaClient();

// Keep default export for backward compatibility
export default getPrismaClient;
