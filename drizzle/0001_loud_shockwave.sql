CREATE TABLE `contactSubmissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`company` varchar(255),
	`message` text NOT NULL,
	`type` varchar(100) DEFAULT 'inquiry',
	`status` enum('new','contacted','resolved') DEFAULT 'new',
	`adminNotes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contactSubmissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `faqItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category` varchar(100) NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`displayOrder` int DEFAULT 0,
	`isActive` int DEFAULT 1,
	`updatedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `faqItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pageContent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`section` varchar(100) NOT NULL,
	`title` text NOT NULL,
	`subtitle` text,
	`content` text,
	`ctaText` varchar(255),
	`ctaLink` varchar(255),
	`metadata` text,
	`updatedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pageContent_id` PRIMARY KEY(`id`),
	CONSTRAINT `pageContent_section_unique` UNIQUE(`section`)
);
--> statement-breakpoint
CREATE TABLE `processSteps` (
	`id` int AUTO_INCREMENT NOT NULL,
	`stepNumber` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`duration` varchar(100) NOT NULL,
	`details` text NOT NULL,
	`gradientFrom` varchar(7) NOT NULL,
	`gradientTo` varchar(7) NOT NULL,
	`isActive` int DEFAULT 1,
	`updatedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `processSteps_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`icon` varchar(100),
	`gradientFrom` varchar(7),
	`gradientTo` varchar(7),
	`displayOrder` int DEFAULT 0,
	`isActive` int DEFAULT 1,
	`updatedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `services_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `solutionTiers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tierId` varchar(100) NOT NULL,
	`badge` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`price` varchar(255) NOT NULL,
	`ctaText` varchar(255) NOT NULL,
	`gradientFrom` varchar(7) NOT NULL,
	`gradientTo` varchar(7) NOT NULL,
	`features` text NOT NULL,
	`displayOrder` int DEFAULT 0,
	`isActive` int DEFAULT 1,
	`updatedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `solutionTiers_id` PRIMARY KEY(`id`),
	CONSTRAINT `solutionTiers_tierId_unique` UNIQUE(`tierId`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`company` varchar(255),
	`role` varchar(255),
	`content` text NOT NULL,
	`imageUrl` varchar(500),
	`rating` int DEFAULT 5,
	`displayOrder` int DEFAULT 0,
	`isActive` int DEFAULT 1,
	`updatedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `faqItems` ADD CONSTRAINT `faqItems_updatedBy_users_id_fk` FOREIGN KEY (`updatedBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pageContent` ADD CONSTRAINT `pageContent_updatedBy_users_id_fk` FOREIGN KEY (`updatedBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `processSteps` ADD CONSTRAINT `processSteps_updatedBy_users_id_fk` FOREIGN KEY (`updatedBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `services` ADD CONSTRAINT `services_updatedBy_users_id_fk` FOREIGN KEY (`updatedBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `solutionTiers` ADD CONSTRAINT `solutionTiers_updatedBy_users_id_fk` FOREIGN KEY (`updatedBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `testimonials` ADD CONSTRAINT `testimonials_updatedBy_users_id_fk` FOREIGN KEY (`updatedBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;