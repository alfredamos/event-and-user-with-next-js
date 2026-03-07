-- AlterTable
ALTER TABLE `tokens` MODIFY `revoked` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `expired` BOOLEAN NOT NULL DEFAULT false;
