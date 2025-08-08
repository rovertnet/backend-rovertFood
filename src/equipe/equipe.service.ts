import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateEquipeDto } from './dto/create-equipe.dto';
import { UpdateEquipeDto } from './dto/update-equipe.dto';

@Injectable()
export class EquipeService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateEquipeDto) {
    return this.prisma.equipe.create({ data });
  }

  findAll() {
    return this.prisma.equipe.findMany();
  }

  findOne(id: number) {
    return this.prisma.equipe.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateEquipeDto) {
    return this.prisma.equipe.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.equipe.delete({ where: { id } });
  }
}
