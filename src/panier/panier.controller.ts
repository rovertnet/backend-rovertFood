import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PanierService } from './panier.service';
import { AddItemDto } from './dto/add-item.dto';
import { CreatePanierDto } from './dto/create-panier.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('panier')
@UseGuards(JwtAuthGuard) // toutes les routes nécessitent un user connecté
export class PanierController {
  constructor(private readonly panierService: PanierService) {}

  // Créer un panier pour l’utilisateur connecté
  @Post('addPanier')
  create(@Body() dto: CreatePanierDto, @Req() req) {
    const userId = req.user.id; // récupéré depuis le token
    return this.panierService.create({ ...dto, userId });
  }

  // Ajouter un produit dans le panier du user connecté
  @Post('item')
  addItem(@Body() dto: AddItemDto, @Req() req) {
    const userId = req.user.id;
    return this.panierService.addItem({ ...dto, userId });
  }

  // Récupérer le panier de l’utilisateur connecté
  @Get()
  findAll(@Req() req) {
    const userId = req.user.id;
    return this.panierService.findByUser(userId);
  }

  // ⚠️ Pas besoin de passer un id ici → on reste sur le user connecté
  @Delete('item/:id')
  removeItem(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return this.panierService.removeItem(Number(id), userId);
  }

  @Delete('clear')
  clearPanier(@Req() req) {
    const userId = req.user.id;
    return this.panierService.clearPanier(userId);
  }
}
