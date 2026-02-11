/**
 * Content Management Router
 * Provides tRPC procedures for managing landing page content
 * Protected procedures require admin authentication
 */

import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import {
  getAllPageContent,
  getPageContentBySection,
  updatePageContent,
  getAllServices,
  getServiceById,
  updateService,
  getAllSolutionTiers,
  getSolutionTierById,
  updateSolutionTier,
  getAllProcessSteps,
  getProcessStepById,
  updateProcessStep,
  getAllFAQItems,
  getFAQItemById,
  createFAQItem,
  updateFAQItem,
  deleteFAQItem,
  getAllTestimonials,
  createContactSubmission,
  getAllContactSubmissions,
  updateContactSubmission,
} from "../db";

// ============================================================================
// PAGE CONTENT PROCEDURES
// ============================================================================

export const pageContentRouter = router({
  // Get all page content sections
  getAll: publicProcedure.query(async () => {
    return await getAllPageContent();
  }),

  // Get specific page content by section
  getBySection: publicProcedure
    .input(z.object({ section: z.string() }))
    .query(async ({ input }) => {
      return await getPageContentBySection(input.section);
    }),

  // Update page content (admin only)
  update: protectedProcedure
    .input(
      z.object({
        section: z.string(),
        title: z.string().optional(),
        subtitle: z.string().optional(),
        content: z.string().optional(),
        ctaText: z.string().optional(),
        ctaLink: z.string().optional(),
        metadata: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
      }

      await updatePageContent(
        input.section,
        {
          title: input.title,
          subtitle: input.subtitle,
          content: input.content,
          ctaText: input.ctaText,
          ctaLink: input.ctaLink,
          metadata: input.metadata,
        },
        ctx.user.id
      );

      return { success: true };
    }),
});

// ============================================================================
// SERVICES PROCEDURES
// ============================================================================

export const servicesRouter = router({
  // Get all active services
  getAll: publicProcedure.query(async () => {
    return await getAllServices();
  }),

  // Get specific service by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await getServiceById(input.id);
    }),

  // Update service (admin only)
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        icon: z.string().optional(),
        gradientFrom: z.string().optional(),
        gradientTo: z.string().optional(),
        displayOrder: z.number().optional(),
        isActive: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
      }

      await updateService(input.id, input, ctx.user.id);

      return { success: true };
    }),
});

// ============================================================================
// SOLUTION TIERS PROCEDURES
// ============================================================================

export const solutionTiersRouter = router({
  // Get all active solution tiers
  getAll: publicProcedure.query(async () => {
    return await getAllSolutionTiers();
  }),

  // Get specific tier by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await getSolutionTierById(input.id);
    }),

  // Update solution tier (admin only)
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.string().optional(),
        ctaText: z.string().optional(),
        features: z.string().optional(),
        displayOrder: z.number().optional(),
        isActive: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
      }

      await updateSolutionTier(input.id, input, ctx.user.id);

      return { success: true };
    }),
});

// ============================================================================
// PROCESS STEPS PROCEDURES
// ============================================================================

export const processStepsRouter = router({
  // Get all active process steps
  getAll: publicProcedure.query(async () => {
    return await getAllProcessSteps();
  }),

  // Get specific step by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await getProcessStepById(input.id);
    }),

  // Update process step (admin only)
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        duration: z.string().optional(),
        details: z.string().optional(),
        displayOrder: z.number().optional(),
        isActive: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
      }

      await updateProcessStep(input.id, input, ctx.user.id);

      return { success: true };
    }),
});

// ============================================================================
// FAQ PROCEDURES
// ============================================================================

export const faqRouter = router({
  // Get all active FAQ items
  getAll: publicProcedure.query(async () => {
    return await getAllFAQItems();
  }),

  // Get specific FAQ item by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await getFAQItemById(input.id);
    }),

  // Create new FAQ item (admin only)
  create: protectedProcedure
    .input(
      z.object({
        category: z.string(),
        question: z.string(),
        answer: z.string(),
        displayOrder: z.number().default(0),
        isActive: z.number().default(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
      }

      const newItem = await createFAQItem(
        {
          ...input,
          updatedBy: ctx.user.id,
        },
        ctx.user.id
      );

      return newItem;
    }),

  // Update FAQ item (admin only)
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        category: z.string().optional(),
        question: z.string().optional(),
        answer: z.string().optional(),
        displayOrder: z.number().optional(),
        isActive: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
      }

      await updateFAQItem(input.id, input, ctx.user.id);

      return { success: true };
    }),

  // Delete FAQ item (admin only)
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
      }

      await deleteFAQItem(input.id);

      return { success: true };
    }),
});

// ============================================================================
// TESTIMONIALS PROCEDURES
// ============================================================================

export const testimonialsRouter = router({
  // Get all active testimonials
  getAll: publicProcedure.query(async () => {
    return await getAllTestimonials();
  }),
});

// ============================================================================
// CONTACT PROCEDURES
// ============================================================================

export const contactRouter = router({
  // Submit contact form (public)
  submit: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        company: z.string().optional(),
        message: z.string().min(1),
        type: z.string().default("inquiry"),
      })
    )
    .mutation(async ({ input }) => {
      const submission = await createContactSubmission({
        name: input.name,
        email: input.email,
        phone: input.phone || null,
        company: input.company || null,
        message: input.message,
        type: input.type,
        status: "new",
        adminNotes: null,
      });

      return submission;
    }),

  // Get all submissions (admin only)
  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    return await getAllContactSubmissions();
  }),

  // Update submission status (admin only)
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "contacted", "resolved"]),
        adminNotes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
      }

      await updateContactSubmission(input.id, {
        status: input.status,
        adminNotes: input.adminNotes,
      });

      return { success: true };
    }),
});
