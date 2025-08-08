/*
  Warnings:

  - The primary key for the `WishlistMenu` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."WishlistMenu" DROP CONSTRAINT "WishlistMenu_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "WishlistMenu_pkey" PRIMARY KEY ("id");
