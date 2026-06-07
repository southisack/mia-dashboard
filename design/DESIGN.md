---
colors:
  background: "#FEF0FF"
  foreground: "#1A1A1A"
  card: "#FFFFFF"
  card-foreground: "#1A1A1A"
  popover: "#FFFFFF"
  popover-foreground: "#1A1A1A"
  primary: "#FF6BB5"
  primary-foreground: "#FFFFFF"
  secondary: "#E8D5F5"
  secondary-foreground: "#9B7DB5"
  accent: "#FF6BB5"
  accent-foreground: "#FFFFFF"
  muted: "#F5E0FF"
  muted-foreground: "#9B7DB5"
  destructive: "#FF6B6B"
  destructive-foreground: "#FFFFFF"
  border: "#D5C0E8"
  input: "#D5C0E8"
  ring: "#FF6BB5"
  success: "#6BC96B"
  success-foreground: "#FFFFFF"
  success-subtle: "#E8F8E8"
  success-subtle-foreground: "#3D8B3D"
  warning: "#FFB347"
  warning-foreground: "#FFFFFF"
  warning-subtle: "#FFF3E0"
  warning-subtle-foreground: "#A06000"
  error: "#FF6B6B"
  error-foreground: "#FFFFFF"
  error-subtle: "#FFE8E8"
  error-subtle-foreground: "#CC3333"
  gradient-start: "#FFBF8C"
  gradient-end: "#FF6BB5"

typography:
  sans: "Nunito, system-ui, sans-serif"
  scale:
    xs: "0.75rem"       # 12px — caption, metadata, section labels
    sm: "0.875rem"      # 14px — links, small card labels
    base: "1rem"        # 16px — H4, input text, body base
    lg: "1.125rem"      # 18px — emphasized body
    xl: "1.375rem"      # 22px — H3, subsection titles
    2xl: "2rem"         # 32px — H2, section titles
    3xl: "3rem"         # 48px — H1, page headlines
    hero: "4.5rem"      # 72px — points balance display only
  weights:
    regular: 400
    medium: 500
    semibold: 600
    bold: 700
  line-height:
    tight: 1.25
    snug: 1.375
    normal: 1.5
    relaxed: 1.6
  tracking:
    tight: "-0.01em"
    normal: "0em"
    wide: "0.05em"
    wider: "0.1em"

spacing:
  unit: "4px"
  scale:
    1: "4px"
    2: "8px"
    3: "12px"
    4: "16px"
    5: "20px"
    6: "24px"
    7: "28px"
    8: "32px"
    10: "40px"
    12: "48px"
    16: "64px"
  semantic:
    component-padding: "16px"
    card-padding: "20px"
    card-padding-lg: "28px"
    section-gap: "64px"
    page-padding-mobile: "20px"
    page-padding-tablet: "32px"
    max-width: "768px"

rounded:
  none: "0px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  2xl: "24px"
  full: "9999px"

shadows:
  sm: "0 2px 12px rgba(213, 192, 232, 0.31)"
  md: "0 4px 20px rgba(213, 192, 232, 0.40)"
  lg: "0 8px 32px rgba(213, 192, 232, 0.50)"
  bottom-nav: "0 -4px 16px rgba(213, 192, 232, 0.25)"

animation:
  duration:
    fast: "150ms"
    base: "250ms"
    slow: "400ms"
    celebration: "600ms"
  easing:
    default: "cubic-bezier(0.4, 0, 0.2, 1)"
    out: "cubic-bezier(0, 0, 0.2, 1)"
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)"
    bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)"

breakpoints:
  sm: "390px"
  md: "768px"
  lg: "1024px"

components:
  button:
    height-sm: "36px"
    height-md: "48px"
    height-lg: "56px"
    padding-x-sm: "16px"
    padding-x-md: "24px"
    padding-x-lg: "32px"
    radius: "9999px"
    font-weight: 600
  card:
    padding: "20px"
    radius: "20px"
    shadow: "md"
  task-item:
    padding: "16px 20px"
    radius: "16px"
    shadow: "sm"
    checkbox-size: "32px"
  points-widget:
    padding: "28px"
    radius: "24px"
    fill: "gradient (gradient-start → gradient-end, 180deg)"
    number-size: "hero"
    number-weight: 700
  progress-bar:
    height: "16px"
    radius: "8px"
    track-color: "secondary"
    fill: "gradient (gradient-start → gradient-end, 90deg)"
  badge:
    height: "26px"
    padding: "4px 12px"
    radius: "9999px"
    font-size: "xs"
    font-weight: 600
  avatar:
    sm: "32px"
    md: "48px"
    lg: "64px"
    radius: "9999px"
    default-fill: "primary"
  bottom-nav:
    height: "80px"
    item-width: "72px"
    radius-top: "20px"
    fill: "card"
    shadow: "bottom-nav"
    active-color: "primary"
    inactive-color: "muted-foreground"
---

## Overview

Mia Dashboard is a kawaii reward journal for an 8-year-old — part game hub, part personal treasure chest. The interface should feel warm, sparkly, and exciting — like lifting the cover of a special notebook — never clinical, school-app, or generic. Every interaction should reinforce that this space belongs to her.

## Colors

The background (`#FEF0FF`) is a soft lavender blush — warm enough to feel personal, light enough to let content breathe. The `primary` accent (`#FF6BB5`) is bubblegum pink — the pull color for every action she should take. The signature `gradient` (`#FFBF8C → #FF6BB5`, pastel orange to pink) is reserved for hero moments only: the points balance widget, progress fills, and celebration states — not used as general background fills. `foreground` (`#1A1A1A`) is a warm near-black that references the thick outline style of kawaii food illustration. Semantic colors (success green, warning orange, error red) are soft and pastel-toned to stay within the kawaii register.

## Typography

Nunito is the sole typeface — its rounded terminals and friendly proportions are inherently kawaii without being childish. Every weight from 400 to 700 is in use. H1 (`3rem/700`) is for page headlines. H2 (`2rem/600`) for section titles. H3 (`1.375rem/600`) for subsections. H4 (`1rem/500`) for card labels and nav items. Body (`1rem/400`, line-height 1.6) for readable paragraphs — the relaxed line-height gives breathing room. Caption (`0.75rem/400`) for metadata and timestamps. The `hero` size (`4.5rem/700`) is used exclusively on the points balance number — it is the largest element on screen by intent.

## Layout & Spacing

Base unit is 4px. This is a mobile-first app (primary target: tablet/phone) with a max content width of 768px. Page padding is 20px on mobile, 32px on tablet. Cards use 20–28px internal padding depending on prominence — the points widget gets 28px to breathe. Section gap is 64px in the UI Kit reference; on screen, 32–40px is appropriate given the compact mobile context. Bottom navigation is fixed at 80px with 20px top radius, creating a floating tray effect.

## Elevation & Depth

All shadows are tinted to `#D5C0E8` (the border lavender) — never pure black. This keeps depth warm and on-palette. Cards use `shadow-md` (`0 4px 20px rgba(213,192,232,0.40)`). Task items use `shadow-sm` for subtlety. The bottom nav casts upward (`shadow-bottom-nav`). The points widget and celebration cards have no shadow — the gradient fill provides enough presence.

## Shapes

Everything is soft. Buttons are full pill (`9999px`) — they should feel like stickers, not rectangles. Main cards (reward card, points widget, job card) use `rounded-xl` (20px). Task items use `rounded-lg` (16px) — slightly tighter since they stack. Progress bars use `rounded-sm` (8px). Badges and avatars are pill. No sharp corners anywhere in the kid-facing UI.

## Components

- **Button (primary):** Filled `#FF6BB5`, pill, `semibold` — the default CTA. Never use a flat or ghost button as the primary action.
- **Button (secondary):** Filled `#E8D5F5`, pill, muted text — for lower-priority actions like "View All".
- **Points widget:** Gradient fill, hero number centered, motivational caption below — always the first element on the Home screen.
- **Reward card:** White card, image at top (clipped), name + point badge + CTA below. Locked state dims the CTA and swaps badge to muted. Illustration style is **regular kawaii** (flat-to-soft shading, clean black outline, simple cute shapes) — distinct from the claymorphic UI chrome around it; do not render reward art as 3D clay. The gradient backdrop is **baked directly into each illustration** (rotate across a handful of pastel gradient combinations from the locked palette for variety) — not composited in code.
- **Task item:** White card, circle checkbox left, name + earns label center, gradient point badge right. Completed state turns checkbox green and dims text.
- **Job card:** White card, job title prominent, reward callout panel in subdued fill, gradient point badge in header, full-width CTA at bottom.
- **Progress bar:** Gradient fill on subdued track. Show label row (goal name left, current/total right) and motivational caption below.
- **Bottom nav:** White tray, pink indicator dot above active icon, pink icon + label when active, muted when inactive. Four tabs: Home, Rewards, Jobs, Goals.
- **Badge:** Pill, contextual color fills (subdued/success-subtle/warning-subtle/error-subtle). Never use solid dark fills.
- **Avatar:** Pink fill with white initial. Round always.

## Do's and Don'ts

### Do
- Use the gradient (`#FFBF8C → #FF6BB5`) on the points balance, progress fills, and milestone celebrations — it is the signature moment.
- Use `spring` easing (`cubic-bezier(0.34, 1.56, 0.64, 1)`) for all interactive feedback — taps, completions, point increases should bounce.
- Animate only `transform` and `opacity` — never `top`, `left`, `width`, or `height`.
- Keep black (`#1A1A1A`) as foreground and icon strokes — it references kawaii outline illustration and grounds the palette.
- Use Nunito at every scale — do not mix in a second typeface.
- Give reward images generous space — they are the emotional pull of the rewards screen.
- Draw reward illustrations in **regular kawaii style** — flat-to-soft shading, clean black outlines, simple rounded cute shapes (sticker/stationery energy). Reserve claymorphism (3D inflated clay look) for UI chrome only.
- Bake the gradient backdrop directly into each reward illustration, rotating across a small set of pastel gradient pairings (from the locked palette) so the grid has variety — don't composite the gradient in code.

### Don't
- Don't use the gradient as a page background or decorative fill — it loses impact if overused.
- Don't use Inter, Roboto, or any grotesque sans-serif — they read as adult productivity tools.
- Don't use pure white (`#FFFFFF`) as the page background — always use `background` (`#FEF0FF`).
- Don't use sharp corners — `border-radius` minimum is 8px on any visible surface.
- Don't use adult productivity language ("tasks", "objectives", "dashboard") — use "things to do", "rewards", "jobs", "goals".
- Don't use linear or `ease-in-out` transitions — everything should have a little life to it.
- Don't render reward illustrations as claymorphism/3D-clay — that's a UI-chrome treatment only; illustrations should be regular flat-to-soft kawaii art with black outlines.
