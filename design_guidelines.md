# Music Theory Quiz App - Design Guidelines

## Design Approach

**Selected Approach:** Design System - Material Design (Minimal Variant)
**Justification:** This is a utility-focused educational tool where speed, clarity, and learnability are paramount. Drawing inspiration from successful learning platforms like Duolingo, Quizlet, and Brilliant, which prioritize clean interfaces optimized for rapid information processing.

**Core Principles:**
- Speed-optimized interface with minimal visual friction
- Clear visual hierarchy for instant comprehension
- Immediate, unambiguous feedback
- Distraction-free focus on content

## Typography

**Font Family:** Google Fonts - "Inter" (primary), "JetBrains Mono" (for musical notation/chord symbols)

**Hierarchy:**
- Question text: text-2xl font-semibold (28px)
- Answer options: text-lg font-medium (18px)
- Score display: text-base font-semibold (16px)
- Chord symbols/musical notation: text-xl font-mono (20px)
- Feedback messages: text-sm font-medium (14px)

## Layout System

**Spacing Units:** Tailwind units of 2, 4, 6, and 8 for consistent rhythm
- Component padding: p-6 or p-8
- Gap between elements: gap-4
- Section margins: mb-6 or mb-8
- Card spacing: space-y-4

**Container Strategy:**
- Main quiz area: max-w-2xl mx-auto (centered, focused)
- Single-column layout for all viewports
- Viewport: Full height (min-h-screen) with centered content

## Component Library

### Core Layout
**Quiz Container:** Centered card-style container with rounded corners (rounded-xl), subtle elevation, max-w-2xl width

**Header Bar:**
- Fixed top position
- Score counter (Correct/Incorrect/Streak)
- Progress indicator (questions answered)
- Settings/reset icon button

### Question Display
**Question Card:**
- Large, prominent question text
- Musical context clearly displayed (e.g., "D Major Scale - 3rd Degree")
- Generous padding (p-8)
- Clear visual separation from answers

### Answer Interface
**Answer Options:**
- Grid layout: 2 columns on desktop (grid-cols-2), single column on mobile
- Large touch targets (min-h-20)
- Keyboard shortcuts displayed (1-4 or A-D)
- Rounded buttons (rounded-lg) with clear borders
- Equal sizing for visual consistency

### Feedback System
**Instant Feedback:**
- Full-screen overlay (brief, 500ms) with success/error state
- Simple checkmark or X icon (large, bold)
- Next question auto-advances after feedback
- Score updates with smooth transitions

### Score Display
**Stats Panel:**
- Top-right corner positioning
- Compact format: "24/30 (80%)"
- Current streak indicator
- Session summary on completion

## Navigation & Interactions

**Keyboard Shortcuts:**
- Number keys (1-4) or letters (A-D) for answer selection
- Space/Enter to confirm
- R for retry/new quiz
- Escape for settings

**Quiz Flow:**
1. Start screen with difficulty/mode selection
2. Rapid question-answer loop
3. Completion screen with statistics and retry option

## Accessibility

- High contrast text on backgrounds
- Large, readable font sizes (minimum 16px)
- Clear focus states for keyboard navigation
- Screen reader friendly labels
- Touch targets minimum 44px

## Images

**No hero image required** - This is a functional application focused on quiz interaction. All visual elements are UI components and text-based content.

## Layout Specifics

**Question Screen Structure:**
1. Header bar (score, progress)
2. Question card (centered, prominent)
3. Answer grid (4 options, responsive)
4. Keyboard hint footer (subtle, bottom)

**Viewport Management:**
- Use natural content height, not forced 100vh
- Vertically centered quiz card in available space
- Responsive padding (p-4 mobile, p-8 desktop)

**Multi-Column Usage:**
- Answer grid only: 2 columns desktop, 1 column mobile
- All other content: single column for focus

## Performance Considerations

- Minimize animations - use only for feedback (fade in/out)
- Instant state updates for responsiveness
- Pre-load next question during feedback display
- Smooth transitions (duration-200) for state changes only

This design creates a focused, high-performance learning environment that prioritizes speed and clarity over decorative elements.