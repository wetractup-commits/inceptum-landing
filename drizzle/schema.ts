import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Page Content Table
 * Stores all copywriting for different sections of the landing page
 * Allows non-technical users to update content via admin dashboard
 */
export const pageContent = mysqlTable("pageContent", {
  id: int("id").autoincrement().primaryKey(),
  
  // Section identifier (hero, features, how-it-works, why-choose-us, faq, etc.)
  section: varchar("section", { length: 100 }).notNull().unique(),
  
  // Section title/heading
  title: text("title").notNull(),
  
  // Section subtitle or description
  subtitle: text("subtitle"),
  
  // Main content/body text
  content: text("content"),
  
  // CTA button text
  ctaText: varchar("ctaText", { length: 255 }),
  
  // CTA button link/action
  ctaLink: varchar("ctaLink", { length: 255 }),
  
  // JSON field for flexible data (features list, stats, etc.)
  metadata: text("metadata"), // Stored as JSON string
  
  // Track who updated this content
  updatedBy: int("updatedBy").references(() => users.id),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PageContent = typeof pageContent.$inferSelect;
export type InsertPageContent = typeof pageContent.$inferInsert;

/**
 * Service/Feature Items Table
 * Stores individual services/features that can be displayed in grids
 * Allows easy management of service offerings
 */
export const services = mysqlTable("services", {
  id: int("id").autoincrement().primaryKey(),
  
  // Service name
  name: varchar("name", { length: 255 }).notNull(),
  
  // Service description
  description: text("description").notNull(),
  
  // Icon identifier or name
  icon: varchar("icon", { length: 100 }),
  
  // Gradient colors for visual styling
  gradientFrom: varchar("gradientFrom", { length: 7 }), // Hex color
  gradientTo: varchar("gradientTo", { length: 7 }), // Hex color
  
  // Display order
  displayOrder: int("displayOrder").default(0),
  
  // Is this service active/visible
  isActive: int("isActive").default(1), // 1 = true, 0 = false
  
  updatedBy: int("updatedBy").references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Service = typeof services.$inferSelect;
export type InsertService = typeof services.$inferInsert;

/**
 * Solution Tiers Table
 * Stores the different pricing/solution packages (Essentials, Scale, Complete)
 */
export const solutionTiers = mysqlTable("solutionTiers", {
  id: int("id").autoincrement().primaryKey(),
  
  // Tier identifier (essentials, scale, enterprise)
  tierId: varchar("tierId", { length: 100 }).notNull().unique(),
  
  // Badge text (Low Budget Startup, Growth Stage, etc.)
  badge: varchar("badge", { length: 255 }).notNull(),
  
  // Tier name
  name: varchar("name", { length: 255 }).notNull(),
  
  // Tier description
  description: text("description").notNull(),
  
  // Pricing information
  price: varchar("price", { length: 255 }).notNull(),
  
  // CTA button text
  ctaText: varchar("ctaText", { length: 255 }).notNull(),
  
  // Gradient colors
  gradientFrom: varchar("gradientFrom", { length: 7 }).notNull(),
  gradientTo: varchar("gradientTo", { length: 7 }).notNull(),
  
  // Features list (stored as JSON array)
  features: text("features").notNull(), // JSON array
  
  // Display order
  displayOrder: int("displayOrder").default(0),
  
  // Is this tier active
  isActive: int("isActive").default(1),
  
  updatedBy: int("updatedBy").references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SolutionTier = typeof solutionTiers.$inferSelect;
export type InsertSolutionTier = typeof solutionTiers.$inferInsert;

/**
 * Process Steps Table
 * Stores the "How It Works" process steps
 */
export const processSteps = mysqlTable("processSteps", {
  id: int("id").autoincrement().primaryKey(),
  
  // Step number
  stepNumber: int("stepNumber").notNull(),
  
  // Step title
  title: varchar("title", { length: 255 }).notNull(),
  
  // Step description
  description: text("description").notNull(),
  
  // Estimated duration
  duration: varchar("duration", { length: 100 }).notNull(),
  
  // Details/bullet points (stored as JSON array)
  details: text("details").notNull(), // JSON array
  
  // Gradient colors
  gradientFrom: varchar("gradientFrom", { length: 7 }).notNull(),
  gradientTo: varchar("gradientTo", { length: 7 }).notNull(),
  
  // Is this step active
  isActive: int("isActive").default(1),
  
  updatedBy: int("updatedBy").references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ProcessStep = typeof processSteps.$inferSelect;
export type InsertProcessStep = typeof processSteps.$inferInsert;

/**
 * FAQ Items Table
 * Stores frequently asked questions organized by category
 */
export const faqItems = mysqlTable("faqItems", {
  id: int("id").autoincrement().primaryKey(),
  
  // FAQ category (Licensing, Compliance, Costs, etc.)
  category: varchar("category", { length: 100 }).notNull(),
  
  // Question text
  question: text("question").notNull(),
  
  // Answer text
  answer: text("answer").notNull(),
  
  // Display order within category
  displayOrder: int("displayOrder").default(0),
  
  // Is this FAQ item active
  isActive: int("isActive").default(1),
  
  updatedBy: int("updatedBy").references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FAQItem = typeof faqItems.$inferSelect;
export type InsertFAQItem = typeof faqItems.$inferInsert;

/**
 * Testimonials Table
 * Stores customer testimonials and case studies (for future use)
 */
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  
  // Company/person name
  name: varchar("name", { length: 255 }).notNull(),
  
  // Company name
  company: varchar("company", { length: 255 }),
  
  // Role/position
  role: varchar("role", { length: 255 }),
  
  // Testimonial text
  content: text("content").notNull(),
  
  // Image URL
  imageUrl: varchar("imageUrl", { length: 500 }),
  
  // Rating (1-5)
  rating: int("rating").default(5),
  
  // Display order
  displayOrder: int("displayOrder").default(0),
  
  // Is this testimonial active
  isActive: int("isActive").default(1),
  
  updatedBy: int("updatedBy").references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

/**
 * Contact Submissions Table
 * Stores form submissions from the landing page
 */
export const contactSubmissions = mysqlTable("contactSubmissions", {
  id: int("id").autoincrement().primaryKey(),
  
  // Submitter name
  name: varchar("name", { length: 255 }).notNull(),
  
  // Submitter email
  email: varchar("email", { length: 320 }).notNull(),
  
  // Submitter phone
  phone: varchar("phone", { length: 20 }),
  
  // Company name
  company: varchar("company", { length: 255 }),
  
  // Message content
  message: text("message").notNull(),
  
  // Submission type (consultation, inquiry, etc.)
  type: varchar("type", { length: 100 }).default("inquiry"),
  
  // Status (new, contacted, resolved)
  status: mysqlEnum("status", ["new", "contacted", "resolved"]).default("new"),
  
  // Notes from admin
  adminNotes: text("adminNotes"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;