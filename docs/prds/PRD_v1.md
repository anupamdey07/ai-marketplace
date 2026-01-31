# AI_Marketplace_PRD_v1

**PRODUCT REQUIREMENTS DOCUMENT**

AI-Powered Consumer Products Community Marketplace

*Version 1.0 | January 2026*

1. Executive Summary

1.1 Vision

Build a next-generation, community-driven, open-source marketplace for AI-powered physical consumer products. This platform bridges the gap between passive technology consumption and active creation, empowering curious makers to build, share, and discover innovative gadgets—from programmable robots to 3D-printed assistants.

1.2 Mission Statement

*"Come out of the era of staring at screens. Start creating, making, and connecting with physical objects and people."*

1.3 Core Differentiators

- **Physical-first:** Real products you can touch, not just chatbots
- **Trust-verified:** Personally vetted products with transparent privacy practices
- **Community-powered:** Contributor ecosystem with badges and governance
- **Beginner-friendly:** Designed for curious coders, not ML engineers

2. Target Audience

2.1 Primary Users

| **Persona** | **Description** | **Goals** |
| --- | --- | --- |
| The Curious Coder | New to coding, learning through AI-augmented tools | Create their first physical project |
| The Weekend Maker | Has basic technical skills, limited time | Find curated, achievable projects |
| The Parent/Educator | Looking for STEM learning tools for kids | Discover safe, educational products |
| The DIY Enthusiast | Loves tinkering but intimidated by complex setups | Access beginner-friendly robotics |

2.2 Who We're NOT Targeting

- Professional ML engineers building models on HuggingFace
- Hardcore developers already deep in Python/embedded systems
- Enterprise B2B customers

3. Product Scope

3.1 Product Categories (The "Crystal Ball" Menu)

| **Category** | **Icon Concept** | **Examples** |
| --- | --- | --- |
| Programmable Robotics | 🤖 Robot | Richie Mini, Arduino bots |
| Prompt-to-Product | 🎨 Magic wand | Meshy-based creations |
| 3D Printed Innovations | 🖨️ Printer/cube | Custom enclosures, gadgets |
| Assistant Boxes | 📦 Speaker/box | Sticker Box, voice assistants |
| Kids Learning Tools | 👶 Graduation cap | Coding toys, STEM kits |
| Voice Assistants | 🎙️ Microphone | Smart speakers, voice bots |

3.2 Initial Product Lineup (MVP)

1. **Richie Mini** - Programmable robot (Raspberry Pi-based)
2. **Sticker Box** - [Details TBD]
3. **Meshy Product** - Prompt-to-3D creation
4. **3D Printed Innovation** - [Details TBD]

4. Platform Architecture

4.1 User Roles & Hierarchy

The platform operates with a simplified role hierarchy designed for clarity and ease of participation:

| **Role** | **Responsibilities & Capabilities** |
| --- | --- |
| Makers | Create products, certify apps, hold governance tokens, can upvote/verify/approve new products |
| Contributors | Build apps for products, share modifications, upvote/downvote products on leaderboard |
| Community Members | Download apps, share creations, upvote/downvote products, discover and purchase |

4.2 Badge System (Simplified)

A streamlined badge system with 3-4 tiers for clarity:

| **Badge** | **Icon** | **Requirements** |
| --- | --- | --- |
| Member | 🌱 | Joined the community, can browse and purchase |
| Contributor | ⚡ | Created and shared apps, mods, or content for products |
| Maker | 🏆 | Published original product, holds governance tokens, can verify/approve new products |

4.3 Governance Model

- **Governance Tokens:** Earned exclusively by verified Makers
- **Upvote/Downvote Power:** All users can vote; Maker votes carry additional weight
- **Dynamic Leaderboard:** Products rank based on real-time upvote tracking (Hacker News-style)
- **Curation Commitment:** First 1,500 products personally vetted by founding team

5. Feature Specifications

5.1 The Crystal Ball Navigation

An interactive, animated dial showing product categories. The primary implementation approach is Framer Motion Dial for balance of polish and performance.

**Design Reference:** aisafety.com/map - Interactive, explorable interface with smooth animations and category-based discovery.

**Implementation: Framer Motion Dial**

- Animated dial with spring physics
- Maximum 8 category slots visible
- Minimalist icons (line art style)
- Touch/scroll gesture support
- Keyboard navigation for accessibility
- Lazy-load category content

5.2 Header Navigation (GitHub/Hugging Face Style)

Moving away from typical e-commerce header (logo, search, cart) to a developer/community-focused navigation:

- **Left:** Logo + Primary nav (Explore, Community, Blog/Newsletter, Leaderboard)
- **Center:** Search bar with "Ask anything you want to do with AI products" placeholder
- **Right:** Profile/Login, Notifications, Settings

5.3 Homepage Layout

The homepage structure from top to bottom:

1. **Header:** GitHub/Hugging Face style navigation
2. **Crystal Ball Navigation:** Category dial with animated interactions
3. **Featured Launch:** Hero section for Richie Mini with "Coming Soon" and notify button
4. **Current Top Products:** Hacker News-style leaderboard with dynamic upvote tracking
5. **Latest from Blog/Newsletter:** Substack integration (same content)
6. **Community Spotlight:** Featured makers, recent badges, contributor activity
7. **Footer:** About, Trust & Privacy, Socials

5.4 Category Pages (Hugging Face Spaces Style)

Each category page displays products in a tile/card grid layout inspired by Hugging Face Spaces:

**Card Structure:**

- Product thumbnail/preview image
- Product name with emoji indicator
- Short description (1-2 lines)
- Maker name with badge icon
- Verification status indicator
- Upvote count and timestamp
- Featured tag if applicable

**Page Features:**

- "Products of the Week" featured section with date selector
- Filter by name, recency, popularity
- Sort options (relevance, newest, most upvotes)

5.5 Product Detail Page

**Sections:**

1. Hero image/video with "Buy Now" CTA
2. Trust badges (Privacy Verified, Personally Vetted, GDPR Compliant)
3. Specifications & compatibility info
4. App Store Section: Maker-certified apps, community-created apps, "Create Your Own" tutorial
5. Community gallery (user creations)
6. Contributors Section: All contributors with badges who have interacted/created around the product
7. Reviews & ratings
8. Related products

5.6 Community Feed (Twitter-Style Posts)

A social feed where makers and contributors can share updates, similar to Hugging Face Hub posts:

- Twitter-style post format with text, images, and links
- Posts ideally linked to a product tile (encouraged but not mandatory)
- User can share creative creations, project updates, tips
- Hashtag support for categorization
- Reply functionality
- "Recently active users" sidebar
- Sort by newest

5.7 Blog & Newsletter Integration (Substack)

Blog and Newsletter are unified - same content posted to both email subscribers and the website.

**Implementation:**

- Embed Substack feed directly on the website
- Single source of truth - no dual maintenance
- Signup form for email notifications
- Weekly/bi-weekly cadence with product launch announcements and community highlights

5.8 Dynamic Leaderboard (Hacker News-Style)

**Features:**

- Real-time upvote tracking - products move up/down based on votes
- Daily/Weekly/All-time views
- Weighted voting: Maker votes carry more weight
- Filters by category
- "New" tag for products < 7 days old
- Maker profile preview on hover

**Algorithm Factors:** Upvotes (weighted by user badge), recency, maker credibility score, community engagement (comments, shares)

6. Technical Architecture

6.1 Tech Stack

| **Layer** | **Technology** | **Rationale** |
| --- | --- | --- |
| Frontend | React + TypeScript | Type safety, component reusability |
| Styling | Tailwind CSS | Rapid prototyping, minimal footprint |
| Animation | Framer Motion | Crystal Ball dial interactions |
| State | Zustand / React Query | Lightweight, good for catalog data |
| Backend/API | Airtable API | No-code database, easy catalog management |
| Hosting | Vercel or Netlify | Easy React deployment, good DX |
| Blog | Substack (embedded) | Single source of truth |
| Auth | Clerk or Auth0 | Quick setup, social login |
| Payments | Stripe | Industry standard |
| Analytics | Plausible or Fathom | Privacy-friendly |

6.2 Airtable Schema (Catalog)

**Products Table:**

| **Field** | **Type** |
| --- | --- |
| ID | Auto |
| Name | Text |
| Category | Single Select |
| Description | Long Text |
| Price | Currency |
| Images | Attachment |
| Creator | Link to Users |
| Status | Single Select (Coming Soon, Available, Sold Out) |
| Upvotes | Number (dynamic tracking) |
| Privacy_Verified | Checkbox |
| Launch_Date | Date |

**Users Table:**

| **Field** | **Type** |
| --- | --- |
| ID | Auto |
| Name | Text |
| Avatar | Attachment |
| Badge | Single Select (Member, Contributor, Maker) |
| Governance_Tokens | Number (Makers only) |
| Credibility_Score | Number |
| Products | Link to Products |
| Contributions | Link to Apps |

**Apps Table (for Richie Mini etc.):**

| **Field** | **Type** |
| --- | --- |
| ID | Auto |
| Name | Text |
| Product | Link to Products |
| Creator | Link to Users |
| Certified | Checkbox |
| Downloads | Number |
| Description | Long Text |

7. Design System

7.1 Design Principles

1. **Minimalist:** Clean lines, generous whitespace
2. **Futuristic:** Subtle tech aesthetic without being cold
3. **Trustworthy:** Clear privacy indicators, human touches
4. **Accessible:** WCAG 2.1 AA compliance
5. **Performant:** Fast load times, smooth animations

7.2 Color Palette

| **Role** | **Color** | **Hex** |
| --- | --- | --- |
| Primary | Deep Space Blue | #0F172A |
| Secondary | Electric Cyan | #06B6D4 |
| Accent | Warm Coral | #F97316 |
| Background | Off-White | #FAFAF9 |
| Surface | Light Gray | #F5F5F4 |
| Trust Badge | Verified Green | #10B981 |

7.3 Typography

- **Headings:** Inter or Space Grotesk (modern, technical)
- **Body:** Inter (highly readable)
- **Monospace:** JetBrains Mono (code snippets)

7.4 Trust Indicators

Display prominently on all product pages:

- ✓ Privacy Verified
- ✓ Personally Vetted by [Founder]
- ✓ GDPR Compliant
- ✓ Open Source Hardware

8. Sitemap

/

├── / (Homepage)

├── /explore

│ ├── /explore/robotics

│ ├── /explore/3d-printed

│ ├── /explore/assistants

│ ├── /explore/kids-learning

│ └── /explore/voice

├── /products

│ └── /products/[product-slug]

│ └── /products/[product-slug]/apps

├── /makers

│ └── /makers/[maker-slug]

├── /community (Twitter-style feed)

├── /leaderboard

├── /blog (Substack - also serves as Newsletter)

├── /about

├── /trust (Privacy & verification info)

├── /login

├── /dashboard (authenticated)

│ ├── /dashboard/my-products

│ ├── /dashboard/my-apps

│ └── /dashboard/settings

└── /governance (token info)

9. MVP Scope (Phase 1)

9.1 In Scope

- [ ]  Homepage with Framer Motion category dial
- [ ]  GitHub/Hugging Face style header navigation
- [ ]  Featured product section (Richie Mini "Coming Soon")
- [ ]  Category pages with tile/card layout (Hugging Face Spaces style)
- [ ]  Product listing page (Airtable-powered)
- [ ]  Individual product pages with contributor section
- [ ]  Substack blog/newsletter embed (unified)
- [ ]  Dynamic leaderboard with real-time upvote tracking
- [ ]  About & Trust pages
- [ ]  Progressive Web App (PWA) - accessible via browser, no app store
- [ ]  Basic auth (view-only for MVP)

9.2 Out of Scope (Phase 2+)

- 3D Crystal Ball navigation (upgrade from Framer Motion dial)
- Full governance token system
- User-generated apps/marketplace
- Full community feed (Twitter-style posts)
- Maker dashboard
- Payment integration
- Badge progression system

10. Estimated Cost

MVP development estimate: $15,000 - $25,000 (depending on team composition and timeline). Ongoing monthly costs (hosting, Airtable, auth services): $200 - $500/month.

11. Open Questions

1. Crystal Ball Nav: What specific interactions should the Framer Motion dial support?
2. Payments: Stripe direct or third-party marketplace solution?
3. Governance Tokens: Web3 tokens or internal points system?
4. Apps Marketplace: Build custom or integrate existing solution?
5. Moderation: How do we handle community-submitted apps/products?

12. Appendix

A. Competitive Analysis

- **Tindie** - Maker marketplace (less community-focused)
- **Hackster.io** - Project sharing (no commerce)
- **Product Hunt** - Discovery model (software-focused)

B. Design References

- aisafety.com/map - Interactive map/dial navigation inspiration
- Hugging Face Spaces - Tile/card layout for category pages
- Hugging Face Hub Posts - Community feed inspiration

C. Technical References

- Substack Embed Documentation: substack.com/embed
- Airtable API Docs: airtable.com/developers/web/api/introduction
- Framer Motion: framer.com/motion
- Tailwind CSS: tailwindcss.com

*—— End of Document ——*