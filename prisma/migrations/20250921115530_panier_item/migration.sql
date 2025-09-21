/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Panier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `prix` to the `CommandeMenu` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."PanierItem" DROP CONSTRAINT "PanierItem_panierId_fkey";

-- AlterTable
ALTER TABLE "public"."CommandeMenu" ADD COLUMN     "prix" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantite" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "public"."PanierItem" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Panier_userId_key" ON "public"."Panier"("userId");

-- AddForeignKey
ALTER TABLE "public"."PanierItem" ADD CONSTRAINT "PanierItem_panierId_fkey" FOREIGN KEY ("panierId") REFERENCES "public"."Panier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
