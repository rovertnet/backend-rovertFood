import { IsInt } from 'class-validator';

export class CreatePanierDto {
  @IsInt()
  userId: number;
}
