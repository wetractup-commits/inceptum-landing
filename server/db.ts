import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  pageContent,
  services,
  solutionTiers,
  processSteps,
  faqItems,
  testimonials,
  contactSubmissions,
  type PageContent,
  type Service,
  type SolutionTier,
  type ProcessStep,
  type FAQItem,
  type Testimonial,
  type ContactSubmission,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================================================
// PAGE CONTENT QUERIES
// ============================================================================

export async function getPageContentBySection(
  section: string
): Promise<PageContent | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(pageContent)
    .where(eq(pageContent.section, section))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getAllPageContent(): Promise<PageContent[]> {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(pageContent);
}

export async function updatePageContent(
  section: string,
  updates: Partial<PageContent>,
  userId: number
): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db
    .update(pageContent)
    .set({
      ...updates,
      updatedBy: userId,
      updatedAt: new Date(),
    })
    .where(eq(pageContent.section, section));
}

// ============================================================================
// SERVICES QUERIES
// ============================================================================

export async function getAllServices(): Promise<Service[]> {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(services)
    .where(eq(services.isActive, 1))
    .orderBy(services.displayOrder);
}

export async function getServiceById(id: number): Promise<Service | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(services)
    .where(eq(services.id, id))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createService(
  service: Omit<Service, "id" | "createdAt" | "updatedAt">,
  userId: number
): Promise<Service> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(services).values({
    ...service,
    updatedBy: userId,
  });

  const newService = await getServiceById(Number(result[0].insertId));
  if (!newService) throw new Error("Failed to create service");

  return newService;
}

export async function updateService(
  id: number,
  updates: Partial<Service>,
  userId: number
): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db
    .update(services)
    .set({
      ...updates,
      updatedBy: userId,
      updatedAt: new Date(),
    })
    .where(eq(services.id, id));
}

// ============================================================================
// SOLUTION TIERS QUERIES
// ============================================================================

export async function getAllSolutionTiers(): Promise<SolutionTier[]> {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(solutionTiers)
    .where(eq(solutionTiers.isActive, 1))
    .orderBy(solutionTiers.displayOrder);
}

export async function getSolutionTierById(
  id: number
): Promise<SolutionTier | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(solutionTiers)
    .where(eq(solutionTiers.id, id))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function updateSolutionTier(
  id: number,
  updates: Partial<SolutionTier>,
  userId: number
): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db
    .update(solutionTiers)
    .set({
      ...updates,
      updatedBy: userId,
      updatedAt: new Date(),
    })
    .where(eq(solutionTiers.id, id));
}

// ============================================================================
// PROCESS STEPS QUERIES
// ============================================================================

export async function getAllProcessSteps(): Promise<ProcessStep[]> {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(processSteps)
    .where(eq(processSteps.isActive, 1))
    .orderBy(processSteps.stepNumber);
}

export async function getProcessStepById(
  id: number
): Promise<ProcessStep | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(processSteps)
    .where(eq(processSteps.id, id))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function updateProcessStep(
  id: number,
  updates: Partial<ProcessStep>,
  userId: number
): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db
    .update(processSteps)
    .set({
      ...updates,
      updatedBy: userId,
      updatedAt: new Date(),
    })
    .where(eq(processSteps.id, id));
}

// ============================================================================
// FAQ ITEMS QUERIES
// ============================================================================

export async function getAllFAQItems(): Promise<FAQItem[]> {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(faqItems)
    .where(eq(faqItems.isActive, 1))
    .orderBy(faqItems.category, faqItems.displayOrder);
}

export async function getFAQItemById(id: number): Promise<FAQItem | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(faqItems)
    .where(eq(faqItems.id, id))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createFAQItem(
  item: Omit<FAQItem, "id" | "createdAt" | "updatedAt">,
  userId: number
): Promise<FAQItem> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(faqItems).values({
    ...item,
    updatedBy: userId,
  });

  const newItem = await getFAQItemById(Number(result[0].insertId));
  if (!newItem) throw new Error("Failed to create FAQ item");

  return newItem;
}

export async function updateFAQItem(
  id: number,
  updates: Partial<FAQItem>,
  userId: number
): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db
    .update(faqItems)
    .set({
      ...updates,
      updatedBy: userId,
      updatedAt: new Date(),
    })
    .where(eq(faqItems.id, id));
}

export async function deleteFAQItem(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.delete(faqItems).where(eq(faqItems.id, id));
}

// ============================================================================
// TESTIMONIALS QUERIES
// ============================================================================

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.isActive, 1))
    .orderBy(testimonials.displayOrder);
}

// ============================================================================
// CONTACT SUBMISSIONS QUERIES
// ============================================================================

export async function createContactSubmission(
  submission: Omit<ContactSubmission, "id" | "createdAt" | "updatedAt">
): Promise<ContactSubmission> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(contactSubmissions).values(submission);

  const newSubmission = await getContactSubmissionById(
    Number(result[0].insertId)
  );
  if (!newSubmission) throw new Error("Failed to create contact submission");

  return newSubmission;
}

export async function getContactSubmissionById(
  id: number
): Promise<ContactSubmission | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(contactSubmissions)
    .where(eq(contactSubmissions.id, id))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getAllContactSubmissions(): Promise<ContactSubmission[]> {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.createdAt));
}

export async function updateContactSubmission(
  id: number,
  updates: Partial<ContactSubmission>
): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db
    .update(contactSubmissions)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(contactSubmissions.id, id));
}
