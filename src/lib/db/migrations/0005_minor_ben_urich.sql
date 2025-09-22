DROP TABLE "donation_files" CASCADE;--> statement-breakpoint
ALTER TABLE "donations" ADD COLUMN "transfer_attachment_url" varchar(1000);--> statement-breakpoint
ALTER TABLE "donations" ADD COLUMN "deposit_attachment_url" varchar(1000);--> statement-breakpoint
ALTER TABLE "donations" DROP COLUMN "has_transfer_file";--> statement-breakpoint
ALTER TABLE "donations" DROP COLUMN "has_deposit_file";