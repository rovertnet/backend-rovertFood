import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';

@Injectable()
export class CommandeService {
  constructor(private prisma: PrismaService) {}

  // 🔹 Création d'une commande avec menus
  create(data: CreateCommandeDto) {
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
        status: data.status,
        menus: data.items
          ? {
              create: data.items.map((item) => ({
                menu: { connect: { id: item.menuIds } },
                quantite: item.quantite,
                prix: item.prix,
              })),
            }
          : undefined,
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
  update(id: number, data: UpdateCommandeDto) {
    return this.prisma.commande.update({
      where: { id },
      data: {
        status: data.status,
        menus: data.items
          ? {
              deleteMany: {}, // Supprime les anciens menus
              create: data.items.map((item) => ({
                menu: { connect: { id: item.menuIds } },
              })),
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
