---
name: Obsidian Glass
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb2b7'
  on-tertiary: '#67001b'
  tertiary-container: '#ff516a'
  on-tertiary-container: '#5b0017'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#ffb2b7'
  on-tertiary-fixed: '#40000d'
  on-tertiary-fixed-variant: '#92002a'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 24px
  gutter: 16px
  card-gap: 20px
  section-margin: 48px
---

## Brand & Style

The design system is built on a "Premium Dark" philosophy, targeting financially conscious users who value precision, privacy, and modern aesthetics. The brand personality is sophisticated and high-tech, evoking the feeling of a high-end physical wallet or a futuristic financial terminal.

The visual style leverages **Glassmorphism** and **Minimalism**. UI elements appear as translucent layers of polished obsidian or glass floating in a deep space. It utilizes heavy background blurs (32px+) to maintain legibility while creating a sense of immense depth. High-end micro-interactions, such as subtle light-sweeps on card borders and soft glow transitions, reinforce the premium positioning.

## Colors

The palette is anchored by a deep **Obsidian** background to ensure maximum contrast for the neon accents. 

- **Primary (Electric Indigo):** Used for primary actions, active states, and brand highlights.
- **Success (Emerald):** Exclusively reserved for income streams and positive financial trends.
- **Error/Expense (Rose):** Used for spending, over-budget alerts, and critical deletions.
- **Surface:** A semi-transparent slate that allows background blurs to shine through.

Gradients should be used sparingly, primarily on high-level data visualizations or as a subtle "aurora" effect in the background of the application to prevent a completely static feel.

## Typography

This design system utilizes a dual-font approach. **Outfit** provides a geometric, premium feel for headlines and numerical data, while **Inter** ensures maximum legibility for body text and functional labels.

Numerical data in expense tracking is treated with high hierarchy. Large currency displays should always use `display-lg` with the `Outfit` font to emphasize the user's financial status. Use uppercase for `label-sm` to create a technical, "data-tag" aesthetic for categories and timestamps.

## Layout & Spacing

The layout follows a **fluid grid** model with a maximum content width of 1280px. 

- **Desktop:** 12-column grid with 24px gutters and 40px side margins.
- **Tablet:** 8-column grid with 16px gutters and 24px side margins.
- **Mobile:** 4-column grid with 16px gutters and 16px side margins.

A consistent 8px base unit (the "spacing scale") governs all padding and margins. Vertical rhythm is critical; group related cards with 20px gaps and separate major sections (e.g., "Monthly Overview" vs "Recent Transactions") with 48px margins to allow the glass elements room to breathe without feeling cluttered.

## Elevation & Depth

Depth is not communicated through traditional black shadows, but through **Tonal Layering** and **Backdrop Blurs**.

1.  **Level 0 (Base):** The obsidian background (`#020617`).
2.  **Level 1 (Cards):** Surface color `rgba(30, 41, 59, 0.5)` with a 32px backdrop blur. Borders are 1px thick, top-weighted to simulate a light source from above.
3.  **Level 2 (Modals/Popovers):** Higher opacity `rgba(30, 41, 59, 0.8)` with 64px backdrop blur and a subtle 1px white inner-glow on the top edge.

Shadows, when used, are "Neon Glows" rather than "Drop Shadows." For example, a primary button may cast a soft `rgba(99, 102, 241, 0.3)` glow when hovered.

## Shapes

The shape language is defined by oversized, friendly, yet professional curves. 

- **Cards & Modals:** Use `rounded-xl` (24px) to create the signature "glass pane" look.
- **Buttons & Inputs:** Use `rounded-lg` (16px) to maintain a cohesive feel with the larger containers.
- **Data Points/Chips:** Use pill-shapes (full-round) for categories (e.g., "Food", "Rent").

All borders on glass elements must be consistent 1px lines. Avoid thick borders which break the illusion of transparency.

## Components

### Buttons
Primary buttons use a solid Electric Indigo fill with a 10% white inner-glow on the top edge. Secondary buttons are "Ghost Glass" — transparent with a 1px border. On hover, buttons should scale slightly (1.02x) and increase their glow intensity.

### Cards
Cards are the primary container. They must feature a `32px backdrop-filter: blur()`. To differentiate "Income" vs "Expense" cards, apply a 2px left-border accent in Emerald or Rose respectively.

### Input Fields
Inputs use a darker glass fill (`rgba(15, 23, 42, 0.6)`). On focus, the border transitions from the standard glass border to a solid Electric Indigo with a 4px soft outer glow.

### Chips/Badges
Small, pill-shaped indicators for transaction categories. They should use a low-opacity version of the category color (e.g., 15% Emerald for income tags) to keep the UI clean.

### Progress Bars
Financial goals and budget limits use thick (12px) rounded tracks. The unfilled portion is dark slate, while the filled portion uses a vibrant neon gradient.