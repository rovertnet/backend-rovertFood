import { IsInt, Min } from 'class-validator';

export class AddItemDto {
  @IsInt()
  menuId: number;

  @IsInt()
  @Min(1)
  quantite: number;
}
