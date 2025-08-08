import { Module } from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { EquipeController } from './equipe.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [EquipeController],
  providers: [EquipeService, PrismaService],
})
export class EquipeModule {}
