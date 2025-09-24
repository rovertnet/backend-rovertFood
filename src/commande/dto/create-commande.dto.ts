import {
  IsInt,
  IsEnum,
  IsOptional,
  IsArray,
  IsString,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { StatutCommande } from '@prisma/client';

class CommandeItemDto {
  @IsInt()
  menuId: number; // ✅ corrige ici

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

  @IsEnum(['Carte', 'PayPal', 'Espèces']) // ✅ plus strict
  paiement: string;

  @IsOptional()
  @IsEnum(StatutCommande)
  status?: StatutCommande;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommandeItemDto) // ✅ pour bien valider chaque objet
  items: CommandeItemDto[];

  @IsNumber()
  total: number;
}
