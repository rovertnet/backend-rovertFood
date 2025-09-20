import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsOptional()
  @IsString()
  description?: string;

  // prix arrive en string (FormData), donc on le garde souple
  @IsOptional()
  @IsString()
  prix?: string;

  // disponible arrive en string ("true"/"false"), on le garde en string
  @IsOptional()
  @IsString()
  disponible?: string;

  // categorieId arrive aussi en string
  @IsOptional()
  @IsString()
  categorieId?: string;

  @IsOptional()
  @IsString()
  image?: string;
}