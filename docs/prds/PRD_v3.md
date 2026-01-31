# Product Requirements Document — ANNEX v3.0
## AI-Powered Consumer Products Community Marketplace

**Version:** 3.0 (Annex to PRD v1.0 and v2.0)  
**Date:** January 2026  
**Status:** Beta v3 Development  
**Builds on:** PRD v1.0 (MVP), PRD v2.0 (Post-MVP Iteration)

---

## Document Purpose

This is an **additive annex** to the existing PRD documentation. It documents new features, improvements, and changes for the Beta v3 release. For foundational context, refer to:
- `prd.md` — Original MVP specification
- `prd-v2.md` — Post-MVP iteration with design system and positioning updates

---

## Table of Contents

1. [Release Overview](#1-release-overview)
2. [Content & Copy Changes](#2-content--copy-changes)
3. [Authentication System](#3-authentication-system)
4. [Product Submission & Curation](#4-product-submission--curation)
5. [Governance Token System](#5-governance-token-system)
6. [Checkout & Payments](#6-checkout--payments)
7. [User Profiles & Bookmarks](#7-user-profiles--bookmarks)
8. [Notification System](#8-notification-system)
9. [Maker Community Pages](#9-maker-community-pages)
10. [New Product Categories](#10-new-product-categories)
11. [Marketing & Content Strategy](#11-marketing--content-strategy)
12. [Bug Fixes & UI Polish](#12-bug-fixes--ui-polish)
13. [Algorithm Philosophy](#13-algorithm-philosophy)
14. [Technical Implementation Notes](#14-technical-implementation-notes)
15. [Consistency Checklist](#15-consistency-checklist)
16. [Open Questions & Conflicts](#16-open-questions--conflicts)

---

## 1. Release Overview

### 1.1 Beta v3 Goals

| Goal | Description |
|------|-------------|
| **Community Governance** | Implement federated, token-based community moderation |
| **Streamlined Checkout** | One-step purchase flow, no traditional cart |
| **User Engagement** | Bookmarks, notifications, profile enhancements |
| **Product Submission** | Allow community to submit products for curation |
| **Content Refresh** | Update copy to reflect "community marketplace" positioning |

### 1.2 Philosophy Statement

> Our marketplace algorithms are **open source** and **publicly documented**. We do NOT optimize for engagement. We optimize for **community value** through federated governance tokens — inspired by Bitcoin/blockchain methodology.

---

## 2. Content & Copy Changes

### 2.1 Landing Page Updates

| Location | Current | Change To |
|----------|---------|-----------|
| Hero subtitle | "The learning marketplace" | **"The community marketplace"** |
| Featured section header | "Featured: Beginner-Friendly Picks" | **"Featured: Exclusive Beginner Pick(s) for January 2026"** |

### 2.2 Featured Picks Section Logic

**Current behavior:** Static featured products

**New behavior:**
- Sync featured image with the product tile image from the Product Detail Page (PDP)
- Clicking the large featured image tile → navigates to that product's PDP
- Support for 1-3 exclusive picks per skill level (Beginner/Intermediate/Advanced)
- Rotate picks monthly or weekly (configurable)

```
Featured Section Structure:
├── Large hero image (synced from PDP product tile image)
├── "Exclusive Beginner Pick for January 2026" label
├── Click → navigates to /products/[product-slug]
└── Optional: Show 2-3 picks for different levels
```

### 2.3 Category Name Change

| Current | New |
|---------|-----|
| "Dropship" | **"Custom 3D Printed Dropship"** |

---

## 3. Authentication System

### 3.1 Login Methods

Implement **two OAuth login options**:

| Method | Provider | Priority |
|--------|----------|----------|
| GitHub Login | GitHub OAuth | Primary (developer audience) |
| Google Login | Google OAuth | Secondary (general audience) |

### 3.2 Implementation Notes

```
Login Flow:
├── User clicks "Login" in header
├── Modal/dropdown shows two options:
│   ├── "Continue with GitHub" (GitHub icon)
│   └── "Continue with Google" (Google icon)
├── OAuth redirect → callback
├── Create/update user record
└── Redirect to previous page or profile
```

### 3.3 User Data Captured

| Field | Source | Required |
|-------|--------|----------|
| Email | OAuth provider | Yes |
| Display Name | OAuth provider | Yes |
| Avatar | OAuth provider | Optional |
| GitHub username | GitHub only | If GitHub login |

---

## 4. Product Submission & Curation

### 4.1 Community Product Submission

**New Feature:** Allow users to submit products they've discovered for potential inclusion.

**Submission Form Fields:**

| Field | Type | Required |
|-------|------|----------|
| Product Link | URL | Yes |
| Why I like it / Notes | Text (short) | Optional |

**Note:** We intentionally keep this minimal. No product name field — the link is enough for curators to evaluate.

### 4.2 Submission Flow

```
User Journey:
├── User finds cool product elsewhere
├── Clicks "Submit a Product" (location TBD: header? footer? dedicated page?)
├── Fills minimal form (link + optional note)
├── Submits
├── Receives confirmation + governance tokens reward
└── Product enters curation queue

Curation Queue:
├── Governance token holders receive notification
├── Curators review submission
├── Approve for:
│   ├── Leaderboard + Marketplace (full feature)
│   └── Marketplace only (no leaderboard ranking)
│   └── Reject (with optional feedback)
└── Submitter notified of decision
```

### 4.3 Rewards

| Action | Token Reward |
|--------|--------------|
| Submit a product (approved) | +X governance tokens |
| Submit a product (rejected) | +0 tokens |
| First submission bonus | +Y tokens |

*Token amounts TBD based on governance model (see Section 5)*

---

## 5. Governance Token System

### 5.1 Philosophy

Inspired by **Bitcoin/blockchain methodology** and **federated community governance**:
- Decentralized moderation
- Transparent voting rights
- No single point of control
- Open-source algorithms

### 5.2 Token Tiers & Voting Rights

| Tier | Token Range | Rights |
|------|-------------|--------|
| **Observer** | 0-99 tokens | View leaderboard, bookmark, upvote products |
| **Contributor** | 100-499 tokens | Above + submit products, moderate comments |
| **Curator** | 500-999 tokens | Above + approve products for Marketplace only |
| **Guardian** | 1000+ tokens | Above + approve products for Leaderboard, feature products |

### 5.3 Token Earning Methods

| Action | Tokens Earned |
|--------|---------------|
| Account creation | 10 |
| First product submission (approved) | 50 |
| Product submission (approved) | 25 |
| Product upvoted by others | 5 per upvote |
| Helpful review/comment | 10 |
| Reported spam (confirmed) | 15 |
| Monthly active contributor bonus | 20 |

### 5.4 Governance Decisions

| Decision Type | Required Tier | Voting Mechanism |
|---------------|---------------|------------------|
| Upvote/downvote products | Observer+ | Direct vote |
| Approve for Marketplace | Curator+ | Majority vote (3+ curators) |
| Approve for Leaderboard | Guardian+ | Supermajority (5+ guardians, 70%+) |
| Feature on homepage | Guardian+ | Nomination + vote |
| Remove product | Guardian+ | Supermajority + review |

### 5.5 Transparency Commitment

- All governance decisions logged publicly
- Algorithm weights published in docs
- Token distribution visible on user profiles
- Monthly governance reports published

---

## 6. Checkout & Payments

### 6.1 Design Philosophy

> **No traditional cart page.** One-step checkout directly from product interaction.

### 6.2 Checkout Flow

```
User clicks "Get Project" button on product card/PDP
    ↓
Dropdown appears with two sub-options:
    ├── PayPal (PayPal icon)
    └── Google Pay (Google Pay icon)
    ↓
User selects payment method
    ↓
Inline form expands OR redirect to payment provider:
    ├── Login to payment provider
    ├── Confirm/enter shipping address
    ├── Phone number (required)
    └── Email (pre-filled if logged in, else required)
    ↓
One-click confirmation
    ↓
Order complete → confirmation screen
```

### 6.3 Payment Methods (v3)

| Method | Status | Priority |
|--------|--------|----------|
| PayPal | Implement | Primary |
| Google Pay | Implement | Secondary |
| Stripe | Deferred to v4 | — |
| Apple Pay | Deferred to v4 | — |

### 6.4 Cart Icon Behavior

The cart icon in the header **does not** navigate to a cart page. Instead:

```
Cart Icon Click:
    ↓
Right sidebar dropdown opens:
    ├── Current item(s) in cart (if any)
    ├── "Login to PayPal" or "Login to Google Pay" button
    ├── Shipping address form
    ├── Phone number field
    └── "Complete Purchase" CTA
```

### 6.5 Bookmarks vs. Cart

| Feature | Purpose | Location |
|---------|---------|----------|
| **Bookmark** | Save for later, follow updates | Profile > Bookmarks |
| **Cart** | Ready to purchase now | Header dropdown |

**Note:** We explicitly avoid "wishlist" terminology to stay minimal.

---

## 7. User Profiles & Bookmarks

### 7.1 Profile Access

- Click profile icon (top right header)
- Opens profile page/modal

### 7.2 Profile Contents

| Section | Description |
|---------|-------------|
| **Basic Info** | Name, avatar, email, join date |
| **Badges** | Member, Contributor, Curator, Guardian badges |
| **Governance Tokens** | Current balance, tier, earning history |
| **Bookmarks** | Saved products, creators, contributors |
| **Submissions** | Products submitted, status (pending/approved/rejected) |
| **Activity** | Recent upvotes, comments, contributions |

### 7.3 Bookmark Functionality

**What can be bookmarked:**
- Product tiles
- Creators (Makers)
- Contributors

**Bookmark benefits:**
- Saved to profile for easy access
- **Notifications** for updates (see Section 8)

---

## 8. Notification System

### 8.1 Notification Bell

Location: Header, next to profile icon

### 8.2 Notification Triggers

| Trigger | Notification Content |
|---------|---------------------|
| Bookmarked **product** has update | "Reachy Mini added new feature: Voice Control" |
| Bookmarked **product** has new app | "New community app for Reachy Mini: Dance Mode" |
| Bookmarked **creator** posts update | "TechMaker shared a new community post" |
| Bookmarked **creator** adds product | "TechMaker launched a new product: LED Cube" |
| Bookmarked **contributor** shares review | "CodeNewbie reviewed Reachy Mini" |
| Product you submitted was approved | "Your submission was approved for Marketplace!" |
| Governance vote needed (Curator+) | "New product pending approval: AI Pet Bot" |

### 8.3 Notification Preferences

Users can configure (in profile settings):
- Email notifications: On/Off
- In-app notifications: On/Off
- Notification frequency: Immediate / Daily digest / Weekly digest

---

## 9. Maker Community Pages

### 9.1 Current State

Makers have profile pages showing their approved products.

### 9.2 New Feature: Extended Product Tiles

**Makers can add additional product tiles** to their community page that:
- Link to their own website or external pages
- Are visible on their profile/community page
- **Do NOT appear in the main leaderboard**
- **Do NOT appear in the curated marketplace catalog**

### 9.3 Approval Flow for Maker Products

```
Maker adds product to their community page:
    ↓
Product visible on their profile immediately (external link)
    ↓
Governance token holders receive notification
    ↓
Curators can:
    ├── Approve for Marketplace only (browsable, not ranked)
    ├── Approve for Leaderboard + Marketplace (full feature)
    └── Keep as profile-only (no action needed)
```

### 9.4 Product Visibility Matrix

| Product Type | Maker Profile | Marketplace | Leaderboard |
|--------------|---------------|-------------|-------------|
| External link (default) | ✅ | ❌ | ❌ |
| Approved for Marketplace | ✅ | ✅ | ❌ |
| Approved for Leaderboard | ✅ | ✅ | ✅ |

---

## 10. New Product Categories

### 10.1 New Products to Add

| Product | Categories | Notes |
|---------|------------|-------|
| **AI-Powered Box** | Assistant Boxes, Kids Learning | General AI assistant hardware |
| **AI-Powered Bhagavad Gita Box** | Assistant Boxes, Voice Assistants | Spiritual/cultural AI assistant |

### 10.2 Category Fit

```
AI-Powered Box:
├── Primary: Assistant Boxes (📦)
├── Secondary: Kids Learning Tools (👶)
└── Use case: Home companion, learning aid

AI-Powered Bhagavad Gita Box:
├── Primary: Assistant Boxes (📦)
├── Secondary: Voice Assistants (🎙️)
└── Use case: Spiritual guidance, meditation companion
```

---

## 11. Marketing & Content Strategy

### 11.1 Street Interviews

**Concept:** Conduct random street interviews and tech conference interviews asking:
> "What's the coolest AI discovery you've found or used?"

**Content output:**
- Instagram Reels
- Short-form video clips
- Potential TikTok content

### 11.2 Instagram Content Mix

| Content Type | Format | Frequency |
|--------------|--------|-----------|
| Product tiles by creators | Static image/carousel | 3-4x/week |
| Street interview clips | Reels | 1-2x/week |
| Tech conference interviews | Reels | When available |
| Behind-the-scenes | Stories | Daily |

### 11.3 Content → Platform Connection

- Each interview can link to relevant products on the marketplace
- Product tiles on Instagram link to PDP
- Bio link: Link-in-bio to marketplace homepage or featured products

---

## 12. Bug Fixes & UI Polish

### 12.1 Color Palette Update — Lighter Tones

**Change:** Make the background two shades lighter than current sage green/beige.

| Role | Previous Hex | New Hex | Notes |
|------|--------------|---------|-------|
| **Background** | #B2C9AD (Sage Green) | **#E8F0E6** | Two shades lighter, more white space feel |
| **Background Alt** | #D4E4CF (Light Sage) | **#F2F7F1** | Cards, sections — very light sage tint |
| **Surface** | — | **#FAFCFA** | Near-white with subtle green undertone |

**Rationale:**
- Creates more white space and breathing room
- Feels cleaner and more modern
- Better contrast for product images
- More accessible / easier on eyes for long browsing

**Implementation:**
```css
:root {
  --bg-primary: #E8F0E6;    /* Main background - light sage */
  --bg-secondary: #F2F7F1;  /* Cards, sections */
  --bg-surface: #FAFCFA;    /* Near-white surface */
}
```

**Note:** All other colors (Deep Forest, Coral, Charcoal) remain unchanged for contrast.

### 12.2 Critical Bug Fix: Mobile Horizontal Scroll

**Issue:** When dragging the page left on mobile web app, there's ~0.5cm white space visible on the right edge.

**Fix:**
```css
/* Add to global styles or body */
html, body {
  overflow-x: hidden;
  width: 100%;
  position: relative;
}

/* Or on the main container */
.app-container {
  overflow-x: hidden;
  max-width: 100vw;
}
```

**Root cause investigation:**
- Check for elements with `width > 100vw`
- Check for negative margins causing overflow
- Check horizontal scroll on category cards section

### 12.3 Leaderboard UI Polish

**Issue:** "Not Available" and "Coming Soon" pills are too large in leaderboard rows.

**Fix:**
- Reduce pill font size (suggest: 10px → 8px or use `text-xs`)
- Reduce pill padding (suggest: `px-2 py-1` → `px-1.5 py-0.5`)
- Ensure pills fit on one line with product title

**Before:**
```
[Reachy Mini] [██ NOT AVAILABLE ██]  ← Too large
```

**After:**
```
[Reachy Mini] [not available]  ← Compact, fits one line
```

**CSS suggestion:**
```css
.status-pill {
  font-size: 0.625rem; /* 10px */
  padding: 0.125rem 0.375rem;
  white-space: nowrap;
}
```

---

## 13. Algorithm Philosophy

### 13.1 Anti-Engagement Optimization

> We explicitly **reject** engagement-maximizing algorithms.

**What we DON'T do:**
- ❌ Optimize for time-on-site
- ❌ Optimize for clicks/views
- ❌ A/B test for addictive patterns
- ❌ Use dark patterns
- ❌ Prioritize viral content over quality

**What we DO:**
- ✅ Optimize for community value (governance token voting)
- ✅ Surface quality products (curation-first)
- ✅ Reward genuine contributions
- ✅ Transparent ranking factors

### 13.2 Leaderboard Ranking Algorithm

**Factors (all weights published):**

| Factor | Weight | Description |
|--------|--------|-------------|
| Community upvotes | 40% | Weighted by voter tier |
| Curator approval | 25% | Quality gate |
| Documentation quality | 15% | Setup guides, support |
| Creator responsiveness | 10% | Support tickets, comments |
| Recency | 10% | Slight boost for new products |

### 13.3 Open Source Commitment

- Algorithm code published on GitHub
- Weight changes announced in advance
- Community input on algorithm updates
- Monthly transparency reports

---

## 14. Technical Implementation Notes

### 14.1 Airtable Schema Additions

**Users Table — New Fields:**

| Field | Type | Notes |
|-------|------|-------|
| auth_provider | Single Select | github, google |
| github_username | Text | If GitHub login |
| governance_tokens | Number | Current balance |
| governance_tier | Formula | Calculated from tokens |
| bookmarked_products | Link to Products | Many-to-many |
| bookmarked_creators | Link to Users | Many-to-many |
| notification_prefs | JSON/Text | Email, in-app settings |

**Products Table — New Fields:**

| Field | Type | Notes |
|-------|------|-------|
| submitted_by | Link to Users | Community submitter |
| submission_status | Single Select | pending, approved_marketplace, approved_leaderboard, rejected |
| approval_votes | JSON/Text | Curator votes log |
| is_external_only | Checkbox | Maker profile only, not in catalog |

**Submissions Table (New):**

| Field | Type | Notes |
|-------|------|-------|
| id | Auto | — |
| product_link | URL | Submitted URL |
| submitter_notes | Long Text | "Why I like it" |
| submitted_by | Link to Users | — |
| submitted_at | Date | — |
| status | Single Select | pending, approved, rejected |
| reviewed_by | Link to Users | Curator who reviewed |
| review_notes | Long Text | Feedback |

### 14.2 API Endpoints Needed

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/github` | GET | GitHub OAuth initiate |
| `/auth/google` | GET | Google OAuth initiate |
| `/auth/callback` | GET | OAuth callback handler |
| `/api/submissions` | POST | Submit new product |
| `/api/submissions/:id/approve` | POST | Curator approve |
| `/api/bookmarks` | GET/POST/DELETE | Manage bookmarks |
| `/api/notifications` | GET | Fetch user notifications |
| `/api/governance/vote` | POST | Cast governance vote |

### 14.3 Third-Party Integrations

| Service | Purpose | Priority |
|---------|---------|----------|
| GitHub OAuth | Authentication | v3 |
| Google OAuth | Authentication | v3 |
| PayPal SDK | Payments | v3 |
| Google Pay API | Payments | v3 |
| Airtable API | Database | Existing |

---

## 15. Consistency Checklist

After implementing v3 changes, verify consistency across:

| Area | Check |
|------|-------|
| **Copy** | All instances of "learning marketplace" → "community marketplace" |
| **Featured section** | All pages use new header format with date |
| **Category names** | "Dropship" → "Custom 3D Printed Dropship" everywhere |
| **Status pills** | Consistent sizing across all leaderboard views |
| **Login buttons** | Same styling for GitHub/Google across all touchpoints |
| **Bookmark icons** | Consistent icon and behavior across products/creators/contributors |
| **Notification bell** | Same position and behavior on all pages |
| **Checkout flow** | Identical dropdown behavior from all "Get Project" buttons |

---

## 16. Open Questions & Conflicts

### 16.1 Questions Requiring Decision

| # | Question | Options | Recommendation |
|---|----------|---------|----------------|
| 1 | Where should "Submit a Product" link live? | Header / Footer / Dedicated page / Profile | Footer + Profile page |
| 2 | Token amounts for each action? | See Section 5.3 | Start conservative, adjust based on activity |
| 3 | How many curators needed to approve? | 1 / 3 / 5 | 3 for Marketplace, 5 for Leaderboard |
| 4 | Should rejected submissions get feedback? | Yes / No / Optional | Optional (curator can add notes) |
| 5 | Notification digest frequency default? | Immediate / Daily / Weekly | Daily digest default |

### 16.2 Potential Conflicts Identified

| Conflict | Description | Resolution Needed |
|----------|-------------|-------------------|
| **Cart vs. No Cart** | We say "no traditional cart" but have cart icon in header | Clarify: Cart icon opens checkout sidebar, not cart page |
| **Bookmark vs. Wishlist** | PRD v2 mentioned "Wishlist" in user flow | Remove wishlist terminology, use only "Bookmark" |
| **Featured picks timing** | "Monthly" vs "Weekly" rotation mentioned | Decide: Start with monthly, option to go weekly |
| **Email field** | "Optional email" mentioned but also "Email we already have" | If logged in: pre-filled, not editable. If guest: required |

### 16.3 Deferred to v4

- Stripe/Apple Pay integration
- Advanced analytics dashboard for makers
- API for third-party integrations
- Mobile native app (beyond PWA)
- Multi-language support

---

## Appendix A: User Flow Diagrams

### A.1 Product Submission Flow

```
┌─────────────────┐
│  User finds     │
│  cool product   │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Click "Submit   │
│ a Product"      │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Fill form:      │
│ - Product link  │
│ - Notes (opt)   │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Submit →        │
│ +Tokens reward  │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Enters curation │
│ queue           │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Curators vote   │
│ (3+ required)   │
└────────┬────────┘
         ↓
    ┌────┴────┐
    ↓         ↓
┌───────┐ ┌───────┐
│Approve│ │Reject │
└───┬───┘ └───┬───┘
    ↓         ↓
┌───────┐ ┌───────┐
│+Tokens│ │Notify │
│Notify │ │user   │
└───────┘ └───────┘
```

### A.2 Checkout Flow

```
┌─────────────────┐
│ "Get Project"   │
│ button click    │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Dropdown:       │
│ ┌─────────────┐ │
│ │ PayPal      │ │
│ ├─────────────┤ │
│ │ Google Pay  │ │
│ └─────────────┘ │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Payment login + │
│ Address + Phone │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Confirm →       │
│ Order complete  │
└─────────────────┘
```

---

## Appendix B: Governance Token Economics

### B.1 Token Distribution Model

```
Initial allocation:
├── New user signup: 10 tokens
├── Early adopter bonus (first 1000 users): +50 tokens
└── Founding team: 1000 tokens each (Guardian tier)

Ongoing earning:
├── Product submission (approved): 25 tokens
├── Upvotes received: 5 tokens each
├── Quality content bonus: 10-50 tokens
└── Monthly active bonus: 20 tokens

Spending (optional future feature):
├── Boost product visibility: -X tokens
├── Premium features: -X tokens
└── Physical badges/merch: -X tokens
```

### B.2 Anti-Gaming Measures

- Rate limits on submissions (max 5/day)
- Upvote cooldown (1 per product per 24h)
- Curator vote weight caps
- Suspicious activity detection
- Community reporting system

---

*Document Version: 3.0 (Annex)*  
*Last Updated: January 2026*  
*Status: Beta v3 Development*  
*Previous versions: prd.md (v1.0), prd-v2.md (v2.0)*
