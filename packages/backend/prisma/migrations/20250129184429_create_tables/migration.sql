/*
  Warnings:

  - Added the required column `phase` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Phase" AS ENUM ('STUDY', 'ACTION', 'IMPROVEMENT');

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "phase" "Phase" NOT NULL;
