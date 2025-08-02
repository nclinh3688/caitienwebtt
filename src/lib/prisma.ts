import { PrismaClient } from '@prisma/client';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient | undefined;

export default function getPrismaClient(): PrismaClient {
  if (process.env.NODE_ENV === 'production') {
    if (!prisma) {
      prisma = new PrismaClient();
    }
    return prisma;
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    return global.prisma;
  }
}
