# AESTHETIC.md — Mia Dashboard

## Design Dials
DESIGN_VARIANCE: 6        // playful asymmetry and expressive moments, not rigid grids
MOTION_INTENSITY: 7       // bouncy, satisfying micro-interactions — tapping things should feel good
VISUAL_DENSITY: 4         // room to breathe; she's lingering, not scanning

## Vibe
This is a kawaii reward journal for an 8-year-old — part game hub, part personal treasure chest. The vibe is warm, sparkly, cozy, and exciting all at once. It should feel like something she owns and wants to come back to, not a chore tracker dressed up in color.
Not a school app. Not a parent dashboard. Not a productivity tool.

Reference archetype: Claymorphism (UI only)
→ Soft 3D inflated elements, pastel palette, playful and bouncy — kawaii done right in UI

→ **Important distinction:** Claymorphism is for UI surfaces (cards, buttons, widgets, icons) — NOT for reward illustrations. Reward artwork should be **regular kawaii illustration**: flat-to-soft shading, clean black outlines, simple rounded shapes, big-eyed/cute character energy — think kawaii sticker/stationery art, not 3D inflated clay renders. The illustration style should feel hand-drawn and charming, distinct from (and complementary to) the claymorphic UI chrome around it.

→ **Asset format:** Reward illustrations are exported as flat raster images (webp) with the **gradient backdrop baked directly into the artwork** — not composited in code. Vary the gradient across illustrations (a small rotating set of pastel combinations drawn from the locked palette below) so the rewards grid feels lively rather than repetitive. Square corners on the artwork itself (the surrounding card handles corner rounding).

## Forbidden Patterns

### Fonts
- Never use Inter, Roboto, or any grotesque sans-serif that reads as "business app"
- No system fonts for display text
- Use a rounded, friendly typeface for headings (e.g. Nunito, Baloo 2, Fredoka One)
- Body text must stay legible at small sizes — no decorative fonts for paragraphs

### Colors
- No muted, desaturated palettes — this is not a wellness app for adults
- No cold or desaturated blacks — black is allowed as a design element (kawaii outline aesthetic) but must feel intentional, not default
- No "AI blue" or cold teals as primary accent
- No more than 2 accent colors on screen at once
- Background must feel warm — soft cream, blush, or lavender, never pure white or gray

### Layout
- No 3-column grid layouts that read like a dashboard
- No sharp corners — border-radius should be generous (16px minimum on cards)
- No edge-to-edge sticky navbars that feel like a productivity app
- No dense tables or list views — use cards with breathing room

### Visual
- No flat icons — use filled, rounded, slightly inflated icon style (UI chrome stays claymorphic)
- No gradient text fills
- No stock photography or generic illustration sets
- Reward illustrations: regular kawaii (flat-to-soft shading, black outline, simple cute shapes) — NOT claymorphism/3D-clay renders. Keep the clay look confined to UI surfaces only.
- Shadows must be soft and warm-tinted, never pure black drop shadows
- Sparkle and shine moments are welcome — shimmer on rewards, star bursts on milestones — but used purposefully, not everywhere

### Motion
- No linear transitions — use spring physics or ease-out-back for bounce
- Animate only transform and opacity
- Point increases, task completions, and reward unlocks must have a satisfying feedback animation
- No motion that feels mechanical or instant — everything should have a little life to it

### Copy & Content
- No generic placeholder names
- No adult productivity language ("tasks", "objectives", "dashboard") — use kid-appropriate framing ("things to do", "rewards", "goals")
- No startup slop: "seamless", "effortless", "powerful"
- Tone should be warm and encouraging, like a fun older sibling — not corporate cheerful

## What Good Looks Like
- Opening the app feels like lifting the cover of a special notebook — immediate warmth and color
- The points balance is the hero of the screen — big, celebratory, impossible to miss
- Reward items look desirable — large imagery, soft glow or shimmer, clear price in points
- Tasks feel achievable, not overwhelming — one at a time or small grouped clusters
- Completing a task or earning points triggers a moment of delight: animation, sound cue, star burst
- The whole thing feels like it belongs to *her* — personal, cozy, not a generic kids app
- Parents and kids use it differently but it never feels clinical from either side
- The pastel orange-to-pink gradient (coral → bubblegum) is a signature moment — use it on hero elements, point balances, or milestone celebrations, not as a background fill

## Locked Colors
Surface: #FEF0FF — lavender blush
Accent: #FF6BB5 — bubblegum pink
Gradient: #FFBF8C → #FF6BB5 — pastel orange to pink (coral to bubblegum) — hero/celebration use only
Foreground: #1A1A1A — near black (kawaii outline weight)
Muted: #9B7DB5 — soft purple
Subdued: #E8D5F5 — pale lavender
Typeface: Nunito
