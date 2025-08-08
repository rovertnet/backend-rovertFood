import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';

@Injectable()
export class CommandeService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCommandeDto) {
    return this.prisma.commande.create({
      data: {
        userId: data.userId,
        status: data.status,
        menus: data.menuIds
          ? {
              create: data.menuIds.map((id) => ({
                menu: { connect: { id } },
              })),
            }
          : undefined,
      },
      include: { menus: { include: { menu: true } }, user: true },
    });
  }

  findAll() {
    return this.prisma.commande.findMany({
      include: { menus: { include: { menu: true } }, user: true },
    });
  }

  findOne(id: number) {
    return this.prisma.commande.findUnique({
      where: { id },
      include: { menus: { include: { menu: true } }, user: true },
    });
  }

  update(id: number, data: UpdateCommandeDto) {
    return this.prisma.commande.update({
      where: { id },
      data: {
        status: data.status,
        menus: data.menuIds
          ? {
              deleteMany: {}, // Supprime les anciens menus
              create: data.menuIds.map((menuId) => ({
                menu: { connect: { id: menuId } },
              })),
            }
          : undefined,
      },
      include: { menus: { include: { menu: true } }, user: true },
    });
  }

  remove(id: number) {
    return this.prisma.commande.delete({ where: { id } });
  }
}
