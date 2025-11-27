/*
  Warnings:

  - You are about to drop the `usertype` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'AUTHOR', 'READER');

-- DropForeignKey
ALTER TABLE "public"."usertype" DROP CONSTRAINT "usertype_userId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "roles" "Role"[] DEFAULT ARRAY['READER']::"Role"[];

-- DropTable
DROP TABLE "public"."usertype";
