import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AddItemDto } from './dto/add-item.dto';
import { CreatePanierDto } from './dto/create-panier.dto';

@Injectable()
export class PanierService {
  constructor(private prisma: PrismaService) {}

  create(data: CreatePanierDto) {
    return this.prisma.panier.create({
      data,
      include: { items: true },
    });
  }

  addItem(data: AddItemDto) {
    return this.prisma.panierItem.create({
      data,
      include: { menu: true },
    });
  }

  findAll() {
    return this.prisma.panier.findMany({
      include: { items: { include: { menu: true } } },
    });
  }

  findOne(id: number) {
    return this.prisma.panier.findUnique({
      where: { id },
      include: { items: { include: { menu: true } } },
    });
  }

  removeItem(id: number) {
    return this.prisma.panierItem.delete({ where: { id } });
  }

  clearPanier(id: number) {
    return this.prisma.panierItem.deleteMany({ where: { panierId: id } });
  }
}
