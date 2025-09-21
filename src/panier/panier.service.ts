import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AddItemDto } from './dto/add-item.dto';

@Injectable()
export class PanierService {
  constructor(private prisma: PrismaService) {}

  // Créer ou récupérer le panier d’un user
  async getOrCreatePanier(userId: number) {
    let panier = await this.prisma.panier.findUnique({ where: { userId } });
    if (!panier) {
      panier = await this.prisma.panier.create({ data: { userId } });
    }
    return panier;
  }

  // Ajouter un item
  async addItem(data: AddItemDto & { userId: number }) {
    const panier = await this.getOrCreatePanier(data.userId);

    // Vérifie si l’item existe déjà
    const existingItem = await this.prisma.panierItem.findFirst({
      where: { panierId: panier.id, menuId: data.menuId },
    });

    if (existingItem) {
      // On incrémente la quantité
      return this.prisma.panierItem.update({
        where: { id: existingItem.id },
        data: { quantite: existingItem.quantite + data.quantite },
      });
    }

    // Sinon on crée un nouvel item
    return this.prisma.panierItem.create({
      data: {
        panierId: panier.id,
        menuId: data.menuId,
        quantite: data.quantite,
      },
      include: { menu: true },
    });
  }

  // Récupérer le panier d’un user
  async findByUser(userId: number) {
    const panier = await this.getOrCreatePanier(userId);
    return this.prisma.panierItem.findMany({
      where: { panierId: panier.id },
      include: { menu: true },
    });
  }

  // Supprimer un item
  async removeItem(itemId: number, userId: number) {
    const item = await this.prisma.panierItem.findUnique({
      where: { id: itemId },
      include: { panier: true },
    });
    if (!item || item.panier.userId !== userId)
      throw new NotFoundException("Cet item n'appartient pas à votre panier.");
    return this.prisma.panierItem.delete({ where: { id: itemId } });
  }

  // Vider le panier
  async clearPanier(userId: number) {
    const panier = await this.getOrCreatePanier(userId);
    return this.prisma.panierItem.deleteMany({
      where: { panierId: panier.id },
    });
  }
}
