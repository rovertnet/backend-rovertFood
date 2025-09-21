/*
  Warnings:

  - Added the required column `adresse` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codePostal` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nom` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paiement` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ville` to the `Commande` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Commande" ADD COLUMN     "adresse" TEXT NOT NULL,
ADD COLUMN     "codePostal" TEXT NOT NULL,
ADD COLUMN     "nom" TEXT NOT NULL,
ADD COLUMN     "paiement" TEXT NOT NULL,
ADD COLUMN     "telephone" TEXT NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ville" TEXT NOT NULL;
