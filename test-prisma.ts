import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const utilisateurs = await prisma.user.findMany();
  console.log(utilisateurs);
}

main();