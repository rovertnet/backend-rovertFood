import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMenuDto: CreateMenuDto,
  ) {
    const menuData = {
      nom: createMenuDto.nom,
      description: createMenuDto.description,
      prix: parseFloat(createMenuDto.prix as any), // ✅ conversion en float
      categorieId: parseInt(createMenuDto.categorieId as any, 10), // ✅ conversion en int
      disponible: (createMenuDto.disponible as any) === 'true', // ✅ conversion en boolean
      image: file?.filename || null, // ✅ image facultative
    };

    return this.menuService.create(menuData as any);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/menus',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateMenuDto: UpdateMenuDto,
  ) {
    const menuData: any = {
      nom: updateMenuDto.nom,
      description: updateMenuDto.description,
      prix: updateMenuDto.prix
        ? parseFloat(updateMenuDto.prix as any)
        : undefined,
      categorieId: updateMenuDto.categorieId
        ? parseInt(updateMenuDto.categorieId as any, 10)
        : undefined,
      disponible:
        updateMenuDto.disponible !== undefined
          ? (updateMenuDto.disponible as any) === 'true'
          : undefined,
      image: file?.filename || undefined, // garde l’ancienne si pas de nouvelle
    };

    return this.menuService.update(+id, menuData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
