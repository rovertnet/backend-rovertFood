import { IsInt } from 'class-validator';

export class AddWishlistItemDto {
  @IsInt()
  wishlistId: number;

  @IsInt()
  menuId: number;
}
