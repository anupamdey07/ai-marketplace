# Product Requirements Document v2.0
## AI-Powered Consumer Products Community Marketplace

**Version:** 2.0  
**Date:** January 2026  
**Status:** Post-MVP Iteration

---

## 1. Executive Summary

### 1.1 Revised Vision

We are **NOT** building another GitHub or Hugging Face. We are building the **onramp** — the layer that exists *before* those platforms.

**New Positioning:**
> *"The onramp from curiosity to your first AI hardware project"*

Or alternatively:
> *"Wirecutter meets Skillshare for programmable AI hardware"*

### 1.2 The Problem We Solve

**GitHub/Hugging Face user journey:**
- Already knows how to code
- Knows what they want to build
- Searches for "reachy mini python sdk"
- Finds repo, reads docs, builds project
- Success (for them)

**Our target user journey (currently broken):**
- "I think AI hardware is cool but idk where to start"
- "I want to learn to code but courses are boring"
- "What device should I even buy?"
- "Is Reachy Mini good for beginners or do I need Jetson?"
- Googles "programmable AI robot"
- Lands on... a mess of random results
- **This person is LOST before they even get to GitHub.**

**Our solution:**
```
Curious consumer → Overwhelming choice → Analysis paralysis → Never buys
                              ↓
         [YOUR PLATFORM INTERVENES HERE]
                              ↓
Curious consumer → Guided discovery → Clear first steps → Builds project → Success → Buys more
```

### 1.3 Core Value Proposition

We solve **discovery + onboarding**, not code distribution.

The platforms solve distribution of code. They don't solve:
- What to buy
- How to start
- Which product fits my skill level
- What can I actually build with this

### 1.4 The Marketplace Gap

**What EXISTS:**
- ✅ Thingiverse - 3D model FILES (not products)
- ✅ Shapeways - Custom 3D printing SERVICE
- ✅ Etsy - Handmade products (some 3D printed, not AI-native)
- ✅ Kickstarter - Crowdfunding prototypes
- ✅ Meshy - AI model generation + fulfillment (just launched)

**What DOESN'T exist:**
> "The Curated Marketplace for AI-Native Physical Products with Guided Learning Paths"

### 1.5 Consumer-Ready Products, Not Hobby Projects

**Critical Distinction:** Our platform is NOT for ad hoc hobby projects or rough prototypes.

We specifically curate products that:
- ✅ Have been **refined** beyond the prototype stage
- ✅ Have **gained traction** (community interest, early sales, reviews)
- ✅ Have **consumer product potential** (packaging, documentation, support)
- ✅ Are **repeatable** (can be manufactured/fulfilled consistently)
- ✅ Have **clear use cases** (not just "cool tech demo")

**What we DON'T feature:**
- ❌ One-off weekend projects
- ❌ Rough prototypes with no documentation
- ❌ "I made this cool thing" with no path to purchase
- ❌ Projects that only work for the creator
- ❌ Abandoned or unmaintained projects

**The Bar for Inclusion:**

| Criteria | Minimum Requirement |
|----------|---------------------|
| Documentation | Clear setup guide, not just code dump |
| Repeatability | Others have successfully built/used it |
| Support | Creator responds to questions |
| Polish | Packaging, branding, or clear presentation |
| Traction | Some evidence of interest (stars, sales, mentions) |

**Why This Matters:**

The internet is full of "I built a robot this weekend" posts. Our users don't need another list of half-finished projects. They need products they can actually buy, build, and use successfully.

> *"We're not a graveyard for abandoned side projects. We're a launchpad for the next generation of consumer products."*

---

## 2. Homepage Content Updates

### 2.1 Hero Section

**OLD:** "AI-Powered Products"

**NEW:** 
# Smart hardware products, by the next-gen of coders and creators.

**Tagline (below hero):**
> Your guided path from curious beginner to confident maker. Discover curated, consumer-ready AI hardware — refined products with real traction, not abandoned side projects.

### 2.2 Supporting Copy Options

**Option A (Discovery + Quality-focused):**
> Not sure where to start? Neither were we. That's why we curate only the best — products that have been refined, tested, and proven. Skip the graveyard of abandoned projects and find hardware that actually works.

**Option B (Community-focused):**
> From "I've never coded" to "I just built a robot" — discover products vetted by makers, follow guided projects, and learn alongside a community that was once exactly where you are.

**Option C (Anti-overwhelm + Quality):**
> The internet is full of half-finished AI projects. Most are abandoned, undocumented, or only work for the creator. We personally vet everything here — only consumer-ready products with real traction make the cut.

### 2.3 Section Headers to Update

| Current | Updated |
|---------|---------|
| "Featured Products" | "Start Here: Beginner-Friendly Picks" |
| "Current Top Products" | "What Makers Are Building This Week" |
| "Categories" | "Find Your Path" |
| "Community" | "Learn from Makers Like You" |
| "About" | "Why We Built This" |

---

## 3. Design System Updates

### 3.1 Color Palette (REVISED)

**Primary Background:** Sage Green (not beige)

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Background** | Sage Green | #B2C9AD | Main page background |
| **Background Alt** | Light Sage | #D4E4CF | Cards, sections |
| **Primary** | Deep Forest | #2D4A3E | Headers, primary buttons |
| **Secondary** | Warm Cream | #F5F0E8 | Text backgrounds, contrast |
| **Accent** | Coral Orange | #E8734A | CTAs, highlights, badges |
| **Text Primary** | Charcoal | #2C3E2D | Body text |
| **Text Secondary** | Sage Dark | #5A7A5C | Captions, metadata |
| **Success/Trust** | Mint | #7FB99B | Verification badges |

### 3.2 Typography (REVISED)

**Goal:** Robotic/coder aesthetic BUT approachable and playful for beginners

| Element | Font | Weight | Notes |
|---------|------|--------|-------|
| **Headings** | Space Grotesk | 600-700 | Geometric, techy but friendly |
| **Body** | Inter | 400-500 | Highly readable, neutral |
| **Code/Technical** | JetBrains Mono | 400 | Monospace for specs |
| **Playful Accents** | Nunito | 600 | For badges, callouts, fun elements |

**Typography Principles:**
- Larger font sizes than typical (16px minimum body)
- Generous line height (1.6-1.8)
- Short paragraphs, scannable content
- Use icons + text together (not just text)

### 3.3 Visual Hierarchy

**Characters at the Top:**
- Mascot/character illustrations should appear in the header/hero area
- Friendly, approachable robot or maker characters
- Not overly corporate — more indie/maker aesthetic
- Consider animated micro-interactions

**Card Design:**
- Rounded corners (12-16px radius)
- Soft shadows (no harsh edges)
- Generous padding
- Clear visual hierarchy: Image → Title → Description → Metadata

---

## 4. Category Navigation (REVISED)

### 4.1 Category Navigation: Horizontal Scroll Cards

**Decision: Option A — Horizontal Scroll Cards**

The Crystal Ball / dial navigation was not functioning properly. We're replacing it with a simpler, more reliable solution.

**Implementation:**
- Horizontal scrollable row of category cards
- Each card = icon + name + product count
- Works seamlessly on mobile and desktop
- Snap-scroll behavior for better UX
- Easy to implement and maintain

**Technical approach:**
```jsx
<div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
  {categories.map(cat => (
    <CategoryCard 
      key={cat.id} 
      icon={cat.icon}
      name={cat.name}
      count={cat.productCount}
      className="snap-start"
    />
  ))}
</div>
```

**Future consideration:** Revisit animated dial in Phase 2 if there's demand

### 4.2 Category Structure (Unchanged)

| Category | Icon | Description |
|----------|------|-------------|
| 🤖 Programmable Robotics | Robot | Arduino, Raspberry Pi, Jetson bots |
| 🎨 Prompt-to-Product | Magic wand | Describe it, AI makes it |
| 🖨️ 3D Printed Innovations | Printer | Physical creations |
| 📦 Assistant Boxes | Speaker | Voice assistants, home companions |
| 👶 Kids Learning Tools | Graduation cap | STEM, coding toys |
| 🎙️ Voice Assistants | Microphone | Smart speakers |

---

## 5. Signature Products & Multi-Category Mapping

### 5.1 Why Multi-Category Matters

Products that span multiple categories have broader appeal and showcase the platform's range.

### 5.2 Signature Product Examples

**Example 1: Reachy Mini**
| Category | Fit | Appeal |
|----------|-----|--------|
| ✅ Robotic gadget (Cat 1) | Primary | Makers who want to code robots |
| ✅ Kids learning tool (Cat 5) | Secondary | Teaches programming concepts |
| ✅ Assistant box (Cat 4) | Tertiary | Can be home companion |

**Multi-category = broader discovery + higher conversion**

---

**Example 2: AI 3D Printer + Prompting**
| Category | Fit | Appeal |
|----------|-----|--------|
| ✅ Prompt-to-product (Cat 2) | Primary | Describe what you want |
| ✅ 3D printed (Cat 3) | Primary | Physical output |
| ✅ Learning tool (Cat 5) | Secondary | Kids learn design thinking |

---

**Example 3: Programmable Pet Robot**
| Category | Fit | Appeal |
|----------|-----|--------|
| ✅ Robotic gadget (Cat 1) | Primary | Code custom behaviors |
| ✅ Assistant box (Cat 4) | Secondary | Monitors pet, home use |
| ✅ Kids tool (Cat 5) | Secondary | Teaches responsibility + coding |

### 5.3 Product Page Updates

Each product should display:
- **Primary category** (main tag)
- **Secondary categories** (additional tags)
- **Skill level indicator** (Beginner / Intermediate / Advanced)
- **"Perfect for..." section** (e.g., "Perfect for: First-time coders, Parents, Educators")

---

## 6. User Journey Updates

### 6.1 New User Flow

```
Landing Page
    ↓
"Find Your Path" Quiz (optional)
    - What do you want to build?
    - Have you coded before?
    - What's your budget?
    ↓
Personalized Recommendations
    ↓
Product Page with:
    - Skill level badge
    - "Start Here" tutorial link
    - Community projects gallery
    ↓
Purchase / Wishlist
    ↓
Post-purchase: Guided first project
```

### 6.2 Content Additions Needed

**"Start Here" Guides:**
- "Your First Robot: A Complete Beginner's Guide"
- "I Bought a Reachy Mini, Now What?"
- "From Unboxing to Hello World in 30 Minutes"

**Comparison Content:**
- "Reachy Mini vs. Arduino Starter Kit: Which is Right for You?"
- "Best AI Hardware for Kids Under $100"
- "The Complete Beginner's Buying Guide"

---

## 7. Competitive Positioning

### 7.1 What We Are NOT

| Platform | What They Do | Why We're Different |
|----------|--------------|---------------------|
| GitHub | Code hosting | We help you BEFORE you need code |
| Hugging Face | ML model hosting | We're for physical products, not models |
| Tindie | Maker marketplace | We add curation + learning paths |
| Amazon | Everything store | We're curated, not overwhelming |

### 7.2 What We ARE

> "The trusted guide for your first AI hardware project — featuring only consumer-ready products"

- **Curated** (not everything, just refined products with real traction)
- **Consumer-ready** (no abandoned prototypes or weekend hacks)
- **Educational** (learn while you shop)
- **Community-driven** (see what others built)
- **Beginner-first** (you don't need to be a developer)

---

## 8. Technical Updates

### 8.1 Category Dial Fix Options

**Immediate Fix (Recommended):**
```jsx
// Replace Framer Motion dial with simple horizontal scroll
<div className="flex overflow-x-auto gap-4 pb-4 snap-x">
  {categories.map(cat => (
    <CategoryCard key={cat.id} {...cat} />
  ))}
</div>
```

**Phase 2:**
- Revisit animated dial with proper testing
- Consider Radix UI or Headless UI components
- Ensure mobile compatibility

### 8.2 Airtable Schema Updates

**Add to Products Table:**
| Field | Type | Notes |
|-------|------|-------|
| Secondary_Categories | Multi-select | For multi-category products |
| Skill_Level | Single Select | Beginner / Intermediate / Advanced |
| Perfect_For | Multi-select | First-time coders, Parents, etc. |
| Start_Guide_URL | URL | Link to beginner tutorial |

---

## 9. Updated MVP Scope

### 9.1 In Scope (This Iteration)

- [ ] Update hero copy to new messaging
- [ ] Update tagline and supporting copy
- [ ] Change background to sage green palette
- [ ] Add character/mascot to header area
- [ ] Fix or replace category dial with simpler navigation
- [ ] Add skill level badges to product cards
- [ ] Add multi-category tags to products
- [ ] Create "Start Here" section for beginners
- [ ] Update fonts (Space Grotesk + Inter + Nunito accents)

### 9.2 Deferred to Phase 2

- [ ] "Find Your Path" onboarding quiz
- [ ] Personalized recommendations
- [ ] Full comparison content
- [ ] Animated category dial (if we revisit)
- [ ] Video tutorials integration

---

## 10. Content Audit

### 10.1 Pages Needing Copy Updates

| Page | Current State | Action Needed |
|------|---------------|---------------|
| Homepage Hero | "AI-Powered Products" | Change to new headline |
| Homepage Tagline | Generic marketplace copy | Update to discovery/learning focus |
| About Page | Standard "about us" | Reframe around "why we built this" story |
| Category Headers | Just category names | Add "who this is for" subtext |
| Product Cards | Title + price only | Add skill level + "perfect for" tags |
| Footer | Standard links | Add "New here? Start with..." link |

### 10.2 New Copy Needed

1. **Homepage hero headline + tagline** ✅ (see Section 2)
2. **"Why We Built This" story** (About page)
3. **Category descriptions** with "who it's for"
4. **Skill level explanations** (What does "Beginner" mean?)
5. **"Start Here" guide** for new visitors

---

## 11. Estimated Cost Update

**This iteration:** $3,000 - $5,000 (design updates + copy + category nav fix)

**Ongoing monthly:** $200 - $500 (hosting, Airtable, services)

---

## 12. Open Questions

1. **Mascot/Character:** Do we design a custom mascot or use illustration library?
2. **Category Nav:** Horizontal scroll vs. tab-based vs. grid — which do we test first?
3. **Skill Level:** How do we define Beginner/Intermediate/Advanced?
4. **Quiz:** Should "Find Your Path" quiz be on homepage or separate page?
5. **Content:** Who writes the "Start Here" guides?

---

## Appendix A: Design Reference Screenshots

- Hugging Face Spaces (tile layout) — See uploaded image 1
- Hugging Face Hub Posts (community feed) — See uploaded image 2
- aisafety.com/map (interactive navigation reference)

---

## Appendix B: Sage Green Color Palette Preview

```
Background:     ███████ #B2C9AD (Sage Green)
Background Alt: ███████ #D4E4CF (Light Sage)
Primary:        ███████ #2D4A3E (Deep Forest)
Secondary:      ███████ #F5F0E8 (Warm Cream)
Accent:         ███████ #E8734A (Coral Orange)
Text:           ███████ #2C3E2D (Charcoal)
```

---

*Document Version: 2.0*  
*Last Updated: January 2026*
