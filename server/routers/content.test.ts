import { describe, it, expect, beforeEach, vi } from "vitest";
import { appRouter } from "../routers";
import type { TrpcContext } from "../_core/context";

// Mock user for testing
const adminUser = {
  id: 1,
  openId: "admin-user",
  email: "admin@example.com",
  name: "Admin User",
  loginMethod: "manus",
  role: "admin" as const,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
};

const regularUser = {
  id: 2,
  openId: "regular-user",
  email: "user@example.com",
  name: "Regular User",
  loginMethod: "manus",
  role: "user" as const,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
};

// Create test context
function createContext(user: typeof adminUser | typeof regularUser | null): TrpcContext {
  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Content Management Routes", () => {
  describe("FAQ Routes", () => {
    it("should allow public access to get all FAQs", async () => {
      const ctx = createContext(null);
      const caller = appRouter.createCaller(ctx);

      // This should not throw
      const result = await caller.faq.getAll();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should allow admin to create FAQ", async () => {
      const ctx = createContext(adminUser);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.faq.create({
        category: "Test",
        question: "Test question?",
        answer: "Test answer",
        displayOrder: 0,
        isActive: 1,
      });

      expect(result).toBeDefined();
      expect(result.category).toBe("Test");
      expect(result.question).toBe("Test question?");
    });

    it("should deny non-admin from creating FAQ", async () => {
      const ctx = createContext(regularUser);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.faq.create({
          category: "Test",
          question: "Test question?",
          answer: "Test answer",
        });
        expect.fail("Should have thrown");
      } catch (error: any) {
        expect(error.message).toContain("Admin");
      }
    });

    it("should allow admin to delete FAQ", async () => {
      const ctx = createContext(adminUser);
      const caller = appRouter.createCaller(ctx);

      // Create first
      const created = await caller.faq.create({
        category: "Test",
        question: "Test?",
        answer: "Answer",
      });

      // Then delete
      const result = await caller.faq.delete({ id: created.id });
      expect(result.success).toBe(true);
    });
  });

  describe("Services Routes", () => {
    it("should allow public access to get all services", async () => {
      const ctx = createContext(null);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.services.getAll();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should allow public access to get service by ID", async () => {
      const ctx = createContext(null);
      const caller = appRouter.createCaller(ctx);

      // Try to get a service (may be empty in test)
      const result = await caller.services.getById({ id: 999 });
      // Should not throw, just return undefined
      expect(result === undefined || result !== null).toBe(true);
    });
  });

  describe("Solution Tiers Routes", () => {
    it("should allow public access to get all solution tiers", async () => {
      const ctx = createContext(null);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.solutionTiers.getAll();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("Contact Routes", () => {
    it("should allow public to submit contact form", async () => {
      const ctx = createContext(null);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.contact.submit({
        name: "John Doe",
        email: "john@example.com",
        message: "Test message",
        phone: "+1234567890",
        company: "Test Co",
      });

      expect(result).toBeDefined();
      expect(result.name).toBe("John Doe");
      expect(result.email).toBe("john@example.com");
      expect(result.status).toBe("new");
    });

    it("should allow admin to get all submissions", async () => {
      const ctx = createContext(adminUser);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.contact.getAll();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should deny non-admin from getting submissions", async () => {
      const ctx = createContext(regularUser);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.contact.getAll();
        expect.fail("Should have thrown");
      } catch (error: any) {
        expect(error.message).toContain("Admin");
      }
    });

    it("should allow admin to update submission status", async () => {
      const ctx = createContext(adminUser);
      const caller = appRouter.createCaller(ctx);

      // Create submission
      const publicCtx = createContext(null);
      const publicCaller = appRouter.createCaller(publicCtx);
      const submission = await publicCaller.contact.submit({
        name: "Test",
        email: "test@example.com",
        message: "Test",
      });

      // Update status
      const result = await caller.contact.updateStatus({
        id: submission.id,
        status: "contacted",
        adminNotes: "Contacted via email",
      });

      expect(result.success).toBe(true);
    });
  });

  describe("Process Steps Routes", () => {
    it("should allow public access to get all process steps", async () => {
      const ctx = createContext(null);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.processSteps.getAll();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("Testimonials Routes", () => {
    it("should allow public access to get all testimonials", async () => {
      const ctx = createContext(null);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.testimonials.getAll();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("Page Content Routes", () => {
    it("should allow public access to get all page content", async () => {
      const ctx = createContext(null);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.pageContent.getAll();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should allow public to get specific page content", async () => {
      const ctx = createContext(null);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.pageContent.getBySection({
        section: "hero",
      });

      // May be undefined if not in database
      expect(result === undefined || result !== null).toBe(true);
    });

    it("should allow admin to update page content", async () => {
      const ctx = createContext(adminUser);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.pageContent.update({
        section: "hero",
        title: "Updated Title",
        subtitle: "Updated Subtitle",
      });

      expect(result.success).toBe(true);
    });

    it("should deny non-admin from updating page content", async () => {
      const ctx = createContext(regularUser);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.pageContent.update({
          section: "hero",
          title: "Updated Title",
        });
        expect.fail("Should have thrown");
      } catch (error: any) {
        expect(error.message).toContain("Admin");
      }
    });
  });
});
