// categorie.service.ts
import { Injectable } from '@nestjs/common';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CategorieService {
  constructor(private prisma: PrismaService) {}

  create(createCategorieDto: CreateCategorieDto) {
    return this.prisma.categorie.create({
      data: createCategorieDto,
    });
  }

  findAll() {
    return this.prisma.categorie.findMany();
  }

  async findOne(id: number) {
    if (!id || isNaN(id)) {
      throw new Error('ID invalide');
    }

    return this.prisma.categorie.findUnique({
      where: { id },
      include: { menus: true },
    });
  }

  update(id: number, updateCategorieDto: UpdateCategorieDto) {
    return this.prisma.categorie.update({
      where: { id },
      data: updateCategorieDto,
    });
  }

  remove(id: number) {
    return this.prisma.categorie.delete({
      where: { id },
    });
  }
}
