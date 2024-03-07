/*
  Warnings:

  - You are about to drop the column `latitude` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Event` table. All the data in the column will be lost.
  - Added the required column `googleMapsUrl` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "googleMapsUrl" TEXT NOT NULL;
