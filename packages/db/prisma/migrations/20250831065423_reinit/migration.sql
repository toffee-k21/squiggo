/*
  Warnings:

  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sketch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sketch" DROP CONSTRAINT "Sketch_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Sketch" DROP CONSTRAINT "Sketch_userId_fkey";

-- DropTable
DROP TABLE "Chat";

-- DropTable
DROP TABLE "Sketch";
