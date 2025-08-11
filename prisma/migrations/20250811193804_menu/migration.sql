-- AlterTable
ALTER TABLE "public"."Menu" ADD COLUMN     "image" TEXT,
ALTER COLUMN "description" DROP NOT NULL;
