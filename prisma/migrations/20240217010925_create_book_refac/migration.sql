/*
  Warnings:

  - You are about to drop the column `author` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `books` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "barCode" TEXT NOT NULL
);
INSERT INTO "new_books" ("barCode", "description", "id", "title") SELECT "barCode", "description", "id", "title" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books_barCode_key" ON "books"("barCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
