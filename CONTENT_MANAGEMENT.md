# Content Management System Documentation

## Overview

Your Inceptum landing page now includes a **full-stack content management system** that allows non-technical team members to update copy, manage FAQ items, and track contact submissions without touching code.

---

## Architecture

### Database Layer
- **MySQL Database** with 8 content management tables
- Automatic timestamps and user tracking for all changes
- Role-based access control (admin vs. regular users)

### Backend API (tRPC)
- **7 content management routers** with public and protected endpoints
- Type-safe API with automatic validation
- All admin operations require `admin` role

### Frontend
- **Admin Dashboard** at `/admin` (admin-only access)
- Integrated with DashboardLayout for consistent UX
- Real-time data fetching and mutations

---

## Database Schema

### Tables

#### 1. `pageContent`
Stores copy for major page sections (hero, features, etc.)

```
- id (primary key)
- section (unique) - e.g., "hero", "features", "footer"
- title, subtitle, content
- ctaText, ctaLink
- metadata (JSON for flexibility)
- updatedBy (user ID)
- createdAt, updatedAt
```

#### 2. `services`
Manages service offerings displayed in the Features Grid

```
- id (primary key)
- name, description
- icon (icon name/reference)
- gradientFrom, gradientTo (CSS color values)
- displayOrder, isActive
- updatedBy
- createdAt, updatedAt
```

#### 3. `solutionTiers`
Pricing packages for the Solutions Slider

```
- id (primary key)
- name, description, price
- ctaText, features (JSON array)
- displayOrder, isActive
- updatedBy
- createdAt, updatedAt
```

#### 4. `processSteps`
"How It Works" section steps

```
- id (primary key)
- stepNumber, title, description
- duration, details
- displayOrder, isActive
- updatedBy
- createdAt, updatedAt
```

#### 5. `faqItems`
FAQ questions and answers

```
- id (primary key)
- category, question, answer
- displayOrder, isActive
- updatedBy
- createdAt, updatedAt
```

#### 6. `testimonials`
Customer testimonials

```
- id (primary key)
- name, company, role
- content, rating
- displayOrder, isActive
- updatedBy
- createdAt, updatedAt
```

#### 7. `contactSubmissions`
Form submissions from the landing page

```
- id (primary key)
- name, email, phone, company
- message, type
- status ("new", "contacted", "resolved")
- adminNotes
- createdAt, updatedAt
```

#### 8. `users`
Core user table for authentication

```
- id (primary key)
- openId (Manus OAuth ID)
- name, email, loginMethod
- role ("user" or "admin")
- createdAt, updatedAt, lastSignedIn
```

---

## API Routes

### Public Routes (No Authentication Required)

#### FAQ
```typescript
// Get all active FAQ items
GET /api/trpc/faq.getAll

// Get specific FAQ by ID
GET /api/trpc/faq.getById?id=1
```

#### Services
```typescript
// Get all active services
GET /api/trpc/services.getAll

// Get specific service
GET /api/trpc/services.getById?id=1
```

#### Solution Tiers
```typescript
// Get all active solution tiers
GET /api/trpc/solutionTiers.getAll

// Get specific tier
GET /api/trpc/solutionTiers.getById?id=1
```

#### Process Steps
```typescript
// Get all active process steps
GET /api/trpc/processSteps.getAll

// Get specific step
GET /api/trpc/processSteps.getById?id=1
```

#### Testimonials
```typescript
// Get all active testimonials
GET /api/trpc/testimonials.getAll
```

#### Page Content
```typescript
// Get all page content sections
GET /api/trpc/pageContent.getAll

// Get specific section
GET /api/trpc/pageContent.getBySection?section=hero
```

#### Contact (Public Submission)
```typescript
// Submit contact form
POST /api/trpc/contact.submit
{
  name: string,
  email: string,
  phone?: string,
  company?: string,
  message: string,
  type?: string
}
```

### Admin-Only Routes (Requires `role: "admin"`)

#### FAQ Management
```typescript
// Create FAQ
POST /api/trpc/faq.create
{
  category: string,
  question: string,
  answer: string,
  displayOrder?: number,
  isActive?: number
}

// Update FAQ
POST /api/trpc/faq.update
{
  id: number,
  category?: string,
  question?: string,
  answer?: string,
  displayOrder?: number,
  isActive?: number
}

// Delete FAQ
POST /api/trpc/faq.delete
{ id: number }
```

#### Services Management
```typescript
// Update service
POST /api/trpc/services.update
{
  id: number,
  name?: string,
  description?: string,
  icon?: string,
  gradientFrom?: string,
  gradientTo?: string,
  displayOrder?: number,
  isActive?: number
}
```

#### Solution Tiers Management
```typescript
// Update tier
POST /api/trpc/solutionTiers.update
{
  id: number,
  name?: string,
  description?: string,
  price?: string,
  ctaText?: string,
  features?: string,
  displayOrder?: number,
  isActive?: number
}
```

#### Process Steps Management
```typescript
// Update step
POST /api/trpc/processSteps.update
{
  id: number,
  title?: string,
  description?: string,
  duration?: string,
  details?: string,
  displayOrder?: number,
  isActive?: number
}
```

#### Page Content Management
```typescript
// Update page content
POST /api/trpc/pageContent.update
{
  section: string,
  title?: string,
  subtitle?: string,
  content?: string,
  ctaText?: string,
  ctaLink?: string,
  metadata?: string
}
```

#### Contact Management
```typescript
// Get all submissions (admin only)
GET /api/trpc/contact.getAll

// Update submission status
POST /api/trpc/contact.updateStatus
{
  id: number,
  status: "new" | "contacted" | "resolved",
  adminNotes?: string
}
```

---

## Admin Dashboard

### Access
- **URL**: `/admin`
- **Requirements**: Must be logged in with `admin` role
- **Auto-redirect**: Non-admins are redirected to home page

### Tabs

#### 1. FAQ Management
- **View**: All FAQ items organized by category
- **Create**: Add new FAQ with category, question, and answer
- **Edit**: Update existing FAQ items
- **Delete**: Remove FAQ items
- Real-time updates across all tabs

#### 2. Services
- **View**: All service offerings
- **Status**: Shows which services are active
- Edit functionality coming soon

#### 3. Submissions
- **View**: All contact form submissions
- **Filter**: By status (New, Contacted, Resolved)
- **Update**: Change submission status and add admin notes
- **Count**: Shows total submissions

---

## How to Use

### For Admins: Managing FAQ

1. **Navigate to Admin Dashboard**
   - Go to `/admin` (requires login with admin role)

2. **Click "FAQ" Tab**

3. **To Create FAQ:**
   - Click "Add FAQ" button
   - Fill in Category (e.g., "Licensing", "Compliance")
   - Enter Question and Answer
   - Click "Save"

4. **To Edit FAQ:**
   - Click edit icon on any FAQ card
   - Update fields as needed
   - Click "Save"

5. **To Delete FAQ:**
   - Click trash icon on any FAQ card
   - Confirm deletion

### For Admins: Managing Submissions

1. **Navigate to Admin Dashboard**
   - Go to `/admin`

2. **Click "Submissions" Tab**

3. **View Submissions:**
   - See all contact form submissions
   - Status badges show current state (New, Contacted, Resolved)

4. **Update Status:**
   - Click status buttons to change state
   - Add admin notes if needed

### For Frontend: Fetching Content

All frontend components can fetch content via tRPC hooks:

```typescript
// Get all FAQs
const { data: faqs } = trpc.faq.getAll.useQuery();

// Get all services
const { data: services } = trpc.services.getAll.useQuery();

// Get solution tiers
const { data: tiers } = trpc.solutionTiers.getAll.useQuery();

// Get process steps
const { data: steps } = trpc.processSteps.getAll.useQuery();

// Get page content
const { data: content } = trpc.pageContent.getBySection.useQuery({
  section: "hero"
});
```

---

## User Roles

### Admin Role
- Can create, read, update, delete FAQ items
- Can update services, tiers, and process steps
- Can view and manage contact submissions
- Can update page content sections

### User Role
- Can view all public content
- Can submit contact forms
- Cannot access admin dashboard

---

## Setting Up Admin Users

To make a user an admin:

1. **Via Database (Direct SQL)**
   ```sql
   UPDATE users SET role = 'admin' WHERE openId = 'user-open-id';
   ```

2. **Via Management UI**
   - Go to Database panel in Management UI
   - Find the user in the `users` table
   - Change `role` column to `admin`
   - Save changes

---

## Testing

All content management routes have comprehensive unit tests:

```bash
# Run tests
pnpm test

# Output
✓ server/routers/content.test.ts (17 tests) 328ms
✓ server/auth.logout.test.ts (1 test) 6ms

Test Files  2 passed (2)
     Tests  18 passed (18)
```

Tests cover:
- Public access to content routes
- Admin-only access restrictions
- Create, read, update, delete operations
- Contact form submissions
- Status updates

---

## Best Practices

### Content Management
1. **Keep copy concise** - Shorter text performs better on mobile
2. **Use consistent terminology** - Maintain brand voice across sections
3. **Regular updates** - Keep content fresh and relevant
4. **Test changes** - Review on mobile and desktop before publishing

### Admin Access
1. **Limit admin users** - Only promote trusted team members
2. **Document changes** - Use admin notes for context
3. **Regular backups** - Database is automatically backed up
4. **Monitor submissions** - Check contact submissions regularly

### Performance
1. **Lazy load content** - Components fetch data on demand
2. **Cache responses** - tRPC automatically caches queries
3. **Optimize images** - Use appropriate formats and sizes
4. **Monitor database** - Check query performance in logs

---

## Troubleshooting

### Admin Dashboard Not Loading
- **Check**: Are you logged in?
- **Check**: Is your user role set to `admin`?
- **Check**: Is JavaScript enabled in your browser?

### Changes Not Appearing
- **Clear cache**: Hard refresh browser (Ctrl+Shift+R)
- **Check database**: Verify changes were saved in Database panel
- **Check logs**: Look for errors in browser console

### Contact Submissions Not Showing
- **Check**: Are you an admin?
- **Check**: Is the contact form working? (Test submission)
- **Check**: Database connection is active

---

## Future Enhancements

Potential features to add:
- [ ] Bulk import/export of content
- [ ] Content versioning and rollback
- [ ] Scheduled content publishing
- [ ] Multi-language support
- [ ] Content preview before publishing
- [ ] Email notifications for submissions
- [ ] Analytics integration
- [ ] SEO metadata management

---

## Support

For questions or issues:
1. Check the logs in `.manus-logs/` directory
2. Review the tRPC procedures in `server/routers/content.ts`
3. Check database schema in `drizzle/schema.ts`
4. Review test cases in `server/routers/content.test.ts`

---

**Last Updated**: February 11, 2026
**Version**: 1.0.0
