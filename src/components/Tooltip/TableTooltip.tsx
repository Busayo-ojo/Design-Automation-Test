import React, { forwardRef, type ReactNode } from 'react';
import {
  parsePointerPosition,
  type TooltipPointerPosition,
} from './tooltipUtils';
import { TooltipPointer } from './Tooltip';
import './TableTooltip.css';

/* ═══════════════════════════════════════════════════════════════════════════
   TableTooltip — built 1:1 from the Figma page "✤ Tooltip ⚜️"
   (file Hq7luvf787VJlCj1d3YJYw, COMPONENT_SET 11041:686955 — 12 variants)

   Figma description:
   "Tooltip that holds a data table, for breakdowns on hover. Based on Tool tip.
   Put Table header and content cells in the Table slot. Light theme only,
   because the table cells have no dark variant. Dev note: when this opens from
   a card with Shadow/Normal/small, remove the shadow from that card while the
   tooltip is open."

   Anatomy:
     root (inline-flex, pointer-alignment)
       pointer (20×12 SVG arrow rotated per edge, 16px inset)
       container (330px, 12px padding, 8px gap, r8, shadow, #FFFFFF, border neutral-100)
         title (DM Sans SemiBold 12px, neutral-900)
         table slot (children / table content)
   ═══════════════════════════════════════════════════════════════════════════ */

export interface TableTooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma `pointer position` variant (12 positions) */
  pointerPosition?: TooltipPointerPosition;
  /** Controls title visibility — maps to Figma "has title" */
  hasTitle?: boolean;
  /** Title text — Figma default: "Top 5 compliant and non-compliant DMBs" */
  title?: ReactNode;
  /** Content for the Table slot (can also be passed as children) */
  table?: ReactNode;
  /** Controls pointer arrow visibility */
  hasPointer?: boolean;
  children?: ReactNode;
}

export const TableTooltip = forwardRef<HTMLDivElement, TableTooltipProps>(
  (
    {
      pointerPosition = 'top-left',
      hasTitle = true,
      title = 'Top 5 compliant and non-compliant DMBs',
      table,
      hasPointer = true,
      children,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const { edge, align } = parsePointerPosition(pointerPosition);
    const content = table ?? children;

    const classes = [
      'fmdqui-table-tooltip',
      `fmdqui-table-tooltip--edge-${edge}`,
      `fmdqui-table-tooltip--align-${align}`,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        style={style}
        role="tooltip"
        {...props}
      >
        {hasPointer && <TooltipPointer edge={edge} />}

        <div className="fmdqui-table-tooltip__container">
          {hasTitle && title && (
            <span className="fmdqui-table-tooltip__title">{title}</span>
          )}

          <div className="fmdqui-table-tooltip__table-slot">
            {content}
          </div>
        </div>
      </div>
    );
  }
);

TableTooltip.displayName = 'TableTooltip';

