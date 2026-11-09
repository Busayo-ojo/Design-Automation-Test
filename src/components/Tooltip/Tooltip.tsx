import React, { forwardRef, useCallback, useId, useRef, useState, type ReactNode } from 'react';
import { Icon } from '../../foundations/icons';
import { Button } from '../../elements/Button';
import {
  parsePointerPosition,
  type TooltipEdge,
  type TooltipPointerPosition,
  type TooltipTheme,
} from './tooltipUtils';
import './Tooltip.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Tooltip — built 1:1 from the Figma page "✤ Tooltip ⚜️"
   (file Hq7luvf787VJlCj1d3YJYw, COMPONENT_SET 6237:23991 — 24 variants)

   `pointer position` (12) × `theme` (2), plus five Figma BOOLEAN properties:
   has title · has close button · has buttons · has primary CTA · has secondary CTA

   Structure, straight from Figma:
     root           VERTICAL for top/bottom edges, HORIZONTAL for left/right,
                    with a -1/-2px gap so the pointer tucks under the border
       pointer      330×12 (top/bottom) or 12×152 (left/right), 16px inset
       Container    r8, 16px padding, 16px gap
         content    HORIZONTAL gap 8 — texts + close button
           texts    VERTICAL gap 4 — Title (SemiBold 14) + subtitle (Regular 14)
         buttons    HORIZONTAL, SPACE_BETWEEN — secondary then primary

   Reuse (rules/FIGMA_STORYBOOK_RULES.md §0): the CTAs are the existing Button
   element (`variant="text"`, `buttonType="secondary" | "primary"`, `size="sm"`),
   matching Figma's `Button / texts` instances exactly. The close affordance is
   the `multiply` icon from foundations. Neither is re-implemented here.
   ═══════════════════════════════════════════════════════════════════════════ */

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(' ');

/* ─── Pointer ──────────────────────────────────────────────────────────────
   Figma draws the arrow as a 20×12 VECTOR with a 1.5px rounded apex, filled
   with the container colour and stroked with the container border. A single
   upward SVG is rotated per edge, which also swaps its 20×12 footprint to
   12×20 on the left/right edges, matching Figma.                            */

export const TooltipPointer: React.FC<{ edge: TooltipEdge }> = ({ edge }) => (
  <span className={cx('fmdqui-tooltip__pointer', `fmdqui-tooltip__pointer--${edge}`)} aria-hidden="true">
    <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.8 0.9 L0.5 11.5 H19.5 L11.2 0.9 C10.6 0.1 9.4 0.1 8.8 0.9 Z"
        className="fmdqui-tooltip__pointer-shape"
      />
    </svg>
  </span>
);

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma `pointer position` variant */
  pointerPosition?: TooltipPointerPosition;
  /** Figma `theme` variant */
  theme?: TooltipTheme;
  /** Figma `has title` BOOLEAN property */
  hasTitle?: boolean;
  /** Title text. Figma default: "This is a tooltip" */
  title?: ReactNode;
  /** Body copy. Figma default is the descriptive sentence shown in the file. */
  description?: ReactNode;
  /** Figma `has close button` BOOLEAN property */
  hasCloseButton?: boolean;
  /** Figma `has buttons` BOOLEAN property — the whole CTA row */
  hasButtons?: boolean;
  /** Figma `has secondary CTA` BOOLEAN property */
  hasSecondaryCta?: boolean;
  /** Figma `has primary CTA` BOOLEAN property */
  hasPrimaryCta?: boolean;
  /** Figma default: "Secondary CTA" */
  secondaryLabel?: string;
  /** Figma default: "Primary CTA" */
  primaryLabel?: string;
  /** Hide the pointer entirely (not a Figma variant — useful when anchoring) */
  hasPointer?: boolean;
  onClose?: () => void;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      pointerPosition = 'top-left',
      theme = 'light',
      hasTitle = true,
      title = 'This is a tooltip',
      description = 'Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function.',
      hasCloseButton = true,
      hasButtons = true,
      hasSecondaryCta = true,
      hasPrimaryCta = true,
      secondaryLabel = 'Secondary CTA',
      primaryLabel = 'Primary CTA',
      hasPointer = true,
      onClose,
      onPrimaryClick,
      onSecondaryClick,
      className,
      role = 'tooltip',
      ...rest
    },
    ref
  ) => {
    const { edge, align } = parsePointerPosition(pointerPosition);
    // Figma hides the CTA row when `has buttons` is off, or when neither CTA is on.
    const showButtons = hasButtons && (hasPrimaryCta || hasSecondaryCta);

    return (
      <div
        ref={ref}
        role={role}
        className={cx(
          'fmdqui-tooltip',
          `fmdqui-tooltip--${theme}`,
          `fmdqui-tooltip--edge-${edge}`,
          `fmdqui-tooltip--align-${align}`,
          className
        )}
        {...rest}
      >
        {hasPointer && <TooltipPointer edge={edge} />}

        <div className="fmdqui-tooltip__container">
          <div className="fmdqui-tooltip__content">
            <div className="fmdqui-tooltip__texts">
              {hasTitle && <span className="fmdqui-tooltip__title">{title}</span>}
              <span className="fmdqui-tooltip__subtitle">{description}</span>
            </div>
            {hasCloseButton && (
              <button
                type="button"
                className="fmdqui-tooltip__close"
                onClick={onClose}
                aria-label="Close tooltip"
              >
                <Icon name="multiply" variant="linear" size={20} />
              </button>
            )}
          </div>

          {showButtons && (
            <div className="fmdqui-tooltip__buttons">
              {hasSecondaryCta && (
                <Button
                  variant="text"
                  buttonType="secondary"
                  size="sm"
                  onClick={onSecondaryClick}
                >
                  {secondaryLabel}
                </Button>
              )}
              {hasPrimaryCta && (
                <Button
                  variant="text"
                  buttonType="primary"
                  size="sm"
                  onClick={onPrimaryClick}
                >
                  {primaryLabel}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';

/* ═══════════════════════════════════════════════════════════════════════════
   TooltipTrigger — the behaviour layer.

   Figma's Best Practices frame spells out the interaction:
     · "Tooltips should only appear when the user has paused on the target"
     · "They should remain visible if the user briefly moves the mouse off and
        back on to the target"
     · "Tooltips should not immediately disappear"
     · "When the user scrolls … immediately hide the tooltip"
     · "Tooltips do not receive input focus"
   All five are implemented below.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface TooltipTriggerProps extends Omit<TooltipProps, 'children'> {
  /** The element the tooltip describes */
  children: ReactNode;
  /** Pause before showing, in ms. Figma: "only … when the user has paused". */
  openDelay?: number;
  /** Grace period before hiding, so a brief mouse slip doesn't dismiss it. */
  closeDelay?: number;
  /** Start visible (handy for stories and docs) */
  defaultOpen?: boolean;
  /** Controlled visibility — overrides the hover behaviour when provided */
  open?: boolean;
  /** Wrapper class for the inline-block anchor */
  triggerClassName?: string;
}

export const TooltipTrigger: React.FC<TooltipTriggerProps> = ({
  children,
  openDelay = 400,
  closeDelay = 200,
  defaultOpen = false,
  open,
  pointerPosition = 'top-left',
  triggerClassName,
  onClose,
  ...tooltipProps
}) => {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const visible = isControlled ? open : internalOpen;
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useId();

  const clearTimers = useCallback(() => {
    if (showTimer.current) { clearTimeout(showTimer.current); showTimer.current = null; }
    if (hideTimer.current) { clearTimeout(hideTimer.current); hideTimer.current = null; }
  }, []);

  const show = useCallback(() => {
    if (isControlled) return;
    clearTimers();
    showTimer.current = setTimeout(() => setInternalOpen(true), openDelay);
  }, [isControlled, clearTimers, openDelay]);

  const hide = useCallback(() => {
    if (isControlled) return;
    clearTimers();
    hideTimer.current = setTimeout(() => setInternalOpen(false), closeDelay);
  }, [isControlled, clearTimers, closeDelay]);

  // Figma: "When the user scrolls … immediately hide the tooltip."
  React.useEffect(() => {
    if (!visible || isControlled) return;
    const onScroll = () => { clearTimers(); setInternalOpen(false); };
    window.addEventListener('scroll', onScroll, true);
    return () => window.removeEventListener('scroll', onScroll, true);
  }, [visible, isControlled, clearTimers]);

  React.useEffect(() => clearTimers, [clearTimers]);

  const { edge } = parsePointerPosition(pointerPosition);

  return (
    <span
      className={cx('fmdqui-tooltip-trigger', triggerClassName)}
      onMouseEnter={show}
      onMouseLeave={hide}
      aria-describedby={visible ? tooltipId : undefined}
    >
      {children}
      {visible && (
        <span
          className={cx(
            'fmdqui-tooltip-trigger__layer',
            `fmdqui-tooltip-trigger__layer--${edge}`
          )}
          // Figma: "Tooltips do not receive input focus."
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          <Tooltip
            id={tooltipId}
            pointerPosition={pointerPosition}
            onClose={() => {
              if (!isControlled) setInternalOpen(false);
              onClose?.();
            }}
            {...tooltipProps}
          />
        </span>
      )}
    </span>
  );
};

TooltipTrigger.displayName = 'TooltipTrigger';
