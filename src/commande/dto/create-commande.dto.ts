import {
  IsInt,
  IsEnum,
  IsOptional,
  IsArray,
  IsString,
  IsNumber,
} from 'class-validator';
import { StatutCommande } from '@prisma/client';

class CommandeItemDto {
  @IsInt()
  menuIds: number;

  @IsInt()
  quantite: number;

  @IsNumber()
  prix: number;
}

export class CreateCommandeDto {
  @IsInt()
  userId: number;

  @IsString()
  nom: string;

  @IsString()
  adresse: string;

  @IsString()
  ville: string;

  @IsString()
  codePostal: string;

  @IsString()
  telephone: string;

  @IsString()
  paiement: string; // "Carte" | "PayPal" | "Espèces"

  @IsOptional()
  @IsEnum(StatutCommande)
  status?: StatutCommande;

  @IsArray()
  items: CommandeItemDto[];

  @IsNumber()
  total: number;
}