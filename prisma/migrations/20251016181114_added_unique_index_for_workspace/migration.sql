/*
  Warnings:

  - A unique constraint covering the columns `[name,ownerId]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Workspace_name_ownerId_key" ON "Workspace"("name", "ownerId");
