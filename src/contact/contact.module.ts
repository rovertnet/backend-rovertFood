import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { PrismaService } from 'prisma/prisma.service';
import { ContactService } from './ contact.service';

@Module({
  controllers: [ContactController],
  providers: [ContactService, PrismaService],
})
export class ContactModule {}
