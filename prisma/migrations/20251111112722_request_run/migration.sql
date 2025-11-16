/*
  Warnings:

  - The `body` column on the `RequestRun` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "RequestRun" DROP COLUMN "body",
ADD COLUMN     "body" JSONB;
