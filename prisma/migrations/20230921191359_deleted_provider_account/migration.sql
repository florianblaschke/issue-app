/*
  Warnings:

  - You are about to drop the column `provider_account_id` on the `accounts` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `providerAccountId` ON `accounts`;

-- AlterTable
ALTER TABLE `accounts` DROP COLUMN `provider_account_id`;
