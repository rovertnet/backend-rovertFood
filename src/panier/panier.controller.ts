import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PanierService } from './panier.service';
import { AddItemDto } from './dto/add-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('panier')
@UseGuards(JwtAuthGuard)
export class PanierController {
  constructor(private readonly panierService: PanierService) {}

  @Post('item')
  addItem(@Body() dto: AddItemDto, @Req() req) {
    return this.panierService.addItem({ ...dto, userId: req.user.id });
  }

  @Get()
  getPanier(@Req() req) {
    return this.panierService.findByUser(req.user.id);
  }

  @Delete('item/:id')
  removeItem(@Param('id') id: string, @Req() req) {
    return this.panierService.removeItem(Number(id), req.user.id);
  }

  @Delete('clear')
  clearPanier(@Req() req) {
    return this.panierService.clearPanier(req.user.id);
  }
}
