import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';


@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateMenuDto) {
    return this.prisma.menu.create({
      data: {
        nom: data.nom,
        description: data.description,
        prix: data.prix,
        disponible: data.disponible ?? true,
        categorie: { connect: { id: data.categorieId } }, // ✅ Relation
        image: data.image ? data.image : null, // ✅ Gestion de l'image
      },
    });
  }

  findAll() {
    return this.prisma.menu.findMany({ include: { commandes: true } });
  }

  findOne(id: number) {
    return this.prisma.menu.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateMenuDto) {
    return this.prisma.menu.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.menu.delete({ where: { id } });
  }
}
