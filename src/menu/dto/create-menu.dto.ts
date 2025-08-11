// src/menu/dto/create-menu.dto.ts
export class CreateMenuDto {
  nom: string;
  description: string;
  prix: number;
  disponible?: boolean; // optionnel
  image?: string | null; // nom du fichier image
  categorieId: number; // ID de la catégorie associée
}
