import { Module } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [CommandeController],
  providers: [CommandeService, PrismaService],
})
export class CommandeModule {}
