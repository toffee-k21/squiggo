/*
  Warnings:

  - The primary key for the `Room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `slug` on the `Room` table. All the data in the column will be lost.
  - Added the required column `mode` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Room_slug_key";

-- AlterTable
ALTER TABLE "public"."Room" DROP CONSTRAINT "Room_pkey",
DROP COLUMN "slug",
ADD COLUMN     "drawTime" INTEGER NOT NULL DEFAULT 60,
ADD COLUMN     "hint" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "mode" TEXT NOT NULL,
ADD COLUMN     "round" INTEGER NOT NULL DEFAULT 3,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Room_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Room_id_seq";
