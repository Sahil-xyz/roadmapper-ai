/*
  Warnings:

  - You are about to drop the column `progress` on the `Roadmap` table. All the data in the column will be lost.
  - Added the required column `resources` to the `Roadmap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Roadmap" DROP COLUMN "progress",
ADD COLUMN     "resources" JSONB NOT NULL;
