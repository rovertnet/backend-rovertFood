import { PartialType } from '@nestjs/mapped-types';
import { CreateCommandeDto } from './create-commande.dto';
import { IsOptional, IsArray } from 'class-validator';

export class UpdateCommandeDto extends PartialType(CreateCommandeDto) {
  @IsOptional()
  @IsArray()
  menuIds?: number[];
}
