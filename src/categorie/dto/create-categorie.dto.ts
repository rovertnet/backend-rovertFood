import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateCategorieDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'imageUrl doit être une URL valide' })
  imageUrl?: string;
}
