import { Module } from '@nestjs/common';
import { PanierService } from './panier.service';
import { PanierController } from './panier.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [PanierController],
  providers: [PanierService, PrismaService],
})
export class PanierModule {}
