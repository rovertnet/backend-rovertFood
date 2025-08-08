import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { AddWishlistItemDto } from './dto/add-item.dto';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post('addWishlist')
  create(@Body() dto: CreateWishlistDto) {
    return this.wishlistService.create(dto);
  }

  @Post('item')
  addItem(@Body() dto: AddWishlistItemDto) {
    return this.wishlistService.addItem(dto);
  }

  @Get()
  findAll() {
    return this.wishlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishlistService.findOne(Number(id));
  }

  @Delete('item/:id')
  removeItem(@Param('id') id: string) {
    return this.wishlistService.removeItem(Number(id));
  }

  @Delete('clear/:id')
  clearWishlist(@Param('id') id: string) {
    return this.wishlistService.clearWishlist(Number(id));
  }
}
