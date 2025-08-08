import { IsInt, IsEnum, IsOptional, IsArray } from 'class-validator';
import { StatutCommande } from '@prisma/client';

export class CreateCommandeDto {
  @IsInt()
  userId: number;

  @IsOptional()
  @IsEnum(StatutCommande)
  status?: StatutCommande;

  @IsOptional()
  @IsArray()
  menuIds?: number[]; // Liste d'IDs de menus à ajouter dans la commande
}
