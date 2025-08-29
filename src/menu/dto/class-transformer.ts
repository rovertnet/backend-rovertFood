import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  nom: string;

  @IsString()
  description: string;

  @Type(() => Number)
  @IsNumber()
  prix: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  disponible?: boolean;

  @Type(() => Number)
  @IsNumber()
  categorieId: number;

  @IsOptional()
  @IsString()
  image?: string;
}
