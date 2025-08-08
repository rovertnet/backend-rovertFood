import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';

@Injectable()
export class NewsletterService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateNewsletterDto) {
    return this.prisma.newsletter.create({ data });
  }

  findAll() {
    return this.prisma.newsletter.findMany();
  }

  findOne(id: number) {
    return this.prisma.newsletter.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateNewsletterDto) {
    return this.prisma.newsletter.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.newsletter.delete({ where: { id } });
  }
}
