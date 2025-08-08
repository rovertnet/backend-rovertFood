import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { PanierService } from './panier.service';
import { AddItemDto } from './dto/add-item.dto';
import { CreatePanierDto } from './dto/create-panier.dto';

@Controller('panier')
export class PanierController {
  constructor(private readonly panierService: PanierService) {}

  @Post('addPanier')
  create(@Body() dto: CreatePanierDto) {
    return this.panierService.create(dto);
  }

  @Post('item')
  addItem(@Body() dto: AddItemDto) {
    return this.panierService.addItem(dto);
  }

  @Get()
  findAll() {
    return this.panierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.panierService.findOne(Number(id));
  }

  @Delete('item/:id')
  removeItem(@Param('id') id: string) {
    return this.panierService.removeItem(Number(id));
  }

  @Delete('clear/:id')
  clearPanier(@Param('id') id: string) {
    return this.panierService.clearPanier(Number(id));
  }
}
