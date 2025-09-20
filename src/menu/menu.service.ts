import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; // ⚡ Vérifie le chemin exact
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
        prix: Number(data.prix), // assure-toi que c'est bien un number
        disponible:
          typeof data.disponible === 'string'
            ? data.disponible === 'true'
            : (data.disponible ?? true),
        categorie: { connect: { id: Number(data.categorieId) } },
        image: data.image || null,
      },
    });
  }

  async findAll() {
    return this.prisma.menu.findMany({
      include: { commandes: true, categorie: true }, // 👈 inclure categorie
    });
  }

  async findOne(id: number) {
    return this.prisma.menu.findUnique({
      where: { id },
      include: { categorie: true },
    });
  }

  async update(id: number, data: UpdateMenuDto) {
    return this.prisma.menu.update({
      where: { id },
      data: {
        nom: data.nom,
        description: data.description,
        prix: data.prix !== undefined ? Number(data.prix) : undefined,
        disponible:
          data.disponible !== undefined ? Boolean(data.disponible) : undefined,
        categorieId:
          data.categorieId !== undefined ? Number(data.categorieId) : undefined,
        image: data.image ?? undefined,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.menu.delete({ where: { id } });
  }
}
