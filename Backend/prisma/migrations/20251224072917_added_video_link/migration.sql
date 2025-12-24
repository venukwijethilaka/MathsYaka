/*
  Warnings:

  - Added the required column `videoLink` to the `video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "video" ADD COLUMN     "videoLink" TEXT NOT NULL;
