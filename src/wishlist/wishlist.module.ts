import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [WishlistController],
  providers: [WishlistService, PrismaService],
})
export class WishlistModule {}
