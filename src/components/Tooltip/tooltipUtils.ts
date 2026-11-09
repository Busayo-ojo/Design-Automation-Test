/* ═══════════════════════════════════════════════════════════════════════════
   Tooltip — variant unions and pointer-position helpers.

   Kept separate from Tooltip.tsx so that file only exports components
   (react-refresh/only-export-components).
   ═══════════════════════════════════════════════════════════════════════════ */

/** Which side of the tooltip the pointer sits on. */
export type TooltipEdge = 'top' | 'bottom' | 'left' | 'right';

/** Where along that edge the pointer sits. */
export type TooltipAlign = 'start' | 'center' | 'end';

/** Figma `pointer position` variant (6237:23991) — all 12 combinations. */
export type TooltipPointerPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'
  | 'left-top' | 'left-center' | 'left-bottom'
  | 'right-top' | 'right-center' | 'right-bottom';

/** Figma `theme` variant. */
export type TooltipTheme = 'light' | 'dark';

export const TOOLTIP_POINTER_POSITIONS: TooltipPointerPosition[] = [
  'top-left', 'top-center', 'top-right',
  'bottom-left', 'bottom-center', 'bottom-right',
  'left-top', 'left-center', 'left-bottom',
  'right-top', 'right-center', 'right-bottom',
];

/**
 * Splits a Figma pointer position into its edge and alignment.
 *
 * Figma reads the two tokens differently depending on the edge: `top-left`
 * means the pointer is on the **top edge, at the left**, whereas `left-top`
 * means the **left edge, at the top**. The second token is always an
 * alignment, never an edge.
 */
export function parsePointerPosition(pos: TooltipPointerPosition): {
  edge: TooltipEdge;
  align: TooltipAlign;
} {
  const [edge, rest] = pos.split('-') as [TooltipEdge, string];
  const align: TooltipAlign =
    rest === 'center' ? 'center'
      : rest === 'left' || rest === 'top' ? 'start'
        : 'end';
  return { edge, align };
}
