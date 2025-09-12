import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/guard/roles.decorator';

@Controller('categories')
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}

  // ✅ Créer une catégorie (seulement admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() createCategorieDto: CreateCategorieDto) {
    return this.categorieService.create(createCategorieDto);
  }

  // ✅ Afficher toutes les catégories (accessible à tous)
  @Get()
  findAll() {
    return this.categorieService.findAll();
  }

  // ✅ Afficher une catégorie spécifique (accessible à tous)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categorieService.findOne(id);
  }

  // ✅ Afficher les menus d'une catégorie (accessible à tous)
  @Get(':id/menus')
  findMenusByCategorie(@Param('id', ParseIntPipe) id: number) {
    return this.categorieService
      .findOne(id)
      .then((categorie) => categorie?.menus || []);
  }

  // ✅ Modifier une catégorie (seulement admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategorieDto: UpdateCategorieDto,
  ) {
    return this.categorieService.update(id, updateCategorieDto);
  }

  // ✅ Supprimer une catégorie (seulement admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categorieService.remove(id);
  }
}
