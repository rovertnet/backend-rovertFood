import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';

@Injectable()
export class CommandeService {
  constructor(private prisma: PrismaService) {}

  // 🔹 Création d'une commande avec menus
  async create(data: CreateCommandeDto) {
    // On récupère les menus pour avoir les bons prix
    const menus = await this.prisma.menu.findMany({
      where: { id: { in: data.items.map((i) => i.menuId) } },
    });

    return this.prisma.commande.create({
      data: {
        userId: data.userId,
        nom: data.nom,
        adresse: data.adresse,
        ville: data.ville,
        codePostal: data.codePostal,
        telephone: data.telephone,
        paiement: data.paiement,
        total: data.total,
        status: data.status ?? 'EN_ATTENTE', // valeur par défaut
        menus: {
          create: data.items.map((item) => {
            const menu = menus.find((m) => m.id === item.menuId);
            return {
              menu: { connect: { id: item.menuId } },
              quantite: item.quantite,
              prix: menu?.prix ?? 0, // prix sécurisé depuis la DB
            };
          }),
        },
      },
      include: { menus: { include: { menu: true } }, user: true },
    });
  }

  // 🔹 Récupérer toutes les commandes
  findAll() {
    return this.prisma.commande.findMany({
      include: { menus: { include: { menu: true } }, user: true },
    });
  }

  // 🔹 Récupérer une commande par ID
  findOne(id: number) {
    return this.prisma.commande.findUnique({
      where: { id },
      include: { menus: { include: { menu: true } }, user: true },
    });
  }

  // 🔹 Mettre à jour une commande avec possibilité de changer les menus
  async update(id: number, data: UpdateCommandeDto) {
    const menus = data.items
      ? await this.prisma.menu.findMany({
          where: { id: { in: data.items.map((i) => i.menuId) } },
        })
      : [];

    return this.prisma.commande.update({
      where: { id },
      data: {
        status: data.status,
        menus: data.items
          ? {
              deleteMany: {}, // supprime les anciens menus
              create: data.items.map((item) => {
                const menu = menus.find((m) => m.id === item.menuId);
                return {
                  menu: { connect: { id: item.menuId } },
                  quantite: item.quantite,
                  prix: menu?.prix ?? 0,
                };
              }),
            }
          : undefined,
      },
      include: { menus: { include: { menu: true } }, user: true },
    });
  }

  // 🔹 Supprimer une commande
  remove(id: number) {
    return this.prisma.commande.delete({ where: { id } });
  }
}
