import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AddItemDto } from './dto/add-item.dto';
import { CreatePanierDto } from './dto/create-panier.dto';

@Injectable()
export class PanierService {
  constructor(private prisma: PrismaService) {}

  // Création d’un panier lié à un utilisateur
  async create(data: CreatePanierDto & { userId: number }) {
    // Vérifier si le user a déjà un panier
    const existing = await this.prisma.panier.findUnique({
      where: { userId: data.userId },
    });

    if (existing) {
      return existing; // éviter de créer plusieurs paniers pour un user
    }

    return this.prisma.panier.create({
      data: {
        userId: data.userId,
      },
      include: { items: { include: { menu: true } } },
    });
  }

  // Ajouter un item au panier du user connecté
  async addItem(data: AddItemDto & { userId: number }) {
    const panier = await this.prisma.panier.findUnique({
      where: { userId: data.userId },
    });

    if (!panier) {
      throw new NotFoundException('Aucun panier trouvé pour cet utilisateur.');
    }

    return this.prisma.panierItem.create({
      data: {
        menuId: data.menuId,
        quantite: data.quantite,
        panierId: panier.id,
      },
      include: { menu: true },
    });
  }

  // Récupérer le panier du user
  async findByUser(userId: number) {
    return this.prisma.panier.findUnique({
      where: { userId },
      include: { items: { include: { menu: true } } },
    });
  }

  // Supprimer un item du panier (vérification user)
  async removeItem(itemId: number, userId: number) {
    const item = await this.prisma.panierItem.findUnique({
      where: { id: itemId },
      include: { panier: true },
    });

    if (!item || item.panier.userId !== userId) {
      throw new NotFoundException("Cet item n'appartient pas à votre panier.");
    }

    return this.prisma.panierItem.delete({ where: { id: itemId } });
  }

  // Vider le panier du user
  async clearPanier(userId: number) {
    const panier = await this.prisma.panier.findUnique({ where: { userId } });

    if (!panier) {
      throw new NotFoundException('Aucun panier trouvé.');
    }

    return this.prisma.panierItem.deleteMany({
      where: { panierId: panier.id },
    });
  }
}
