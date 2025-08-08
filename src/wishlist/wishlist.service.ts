import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { AddWishlistItemDto } from './dto/add-item.dto';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateWishlistDto) {
    return this.prisma.wishlist.create({
      data,
    });
  }

  addItem(data: AddWishlistItemDto) {
    return this.prisma.wishlistMenu.create({
      data,
      include: { menu: true },
    });
  }

  findAll() {
    return this.prisma.wishlist.findMany({
      include: { menus: { include: { menu: true } } },
    });
  }

  findOne(id: number) {
    return this.prisma.wishlist.findUnique({
      where: { id },
      include: { menus: { include: { menu: true } } },
    });
  }

  removeItem(id: number) {
    return this.prisma.wishlistMenu.delete({
      where: { id },
    });
  }

  clearWishlist(id: number) {
    return this.prisma.wishlistMenu.deleteMany({ where: { wishlistId: id } });
  }
}
