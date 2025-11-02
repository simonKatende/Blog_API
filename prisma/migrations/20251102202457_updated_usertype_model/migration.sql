/*
  Warnings:

  - A unique constraint covering the columns `[usertype]` on the table `usertype` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `usertype` on the `usertype` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."usertype" DROP CONSTRAINT "usertype_userId_fkey";

-- AlterTable
ALTER TABLE "usertype" DROP COLUMN "usertype",
ADD COLUMN     "usertype" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- DropEnum
DROP TYPE "public"."RoleType";

-- CreateIndex
CREATE UNIQUE INDEX "usertype_usertype_key" ON "usertype"("usertype");

-- AddForeignKey
ALTER TABLE "usertype" ADD CONSTRAINT "usertype_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
