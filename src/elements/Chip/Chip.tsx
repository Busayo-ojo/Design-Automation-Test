import React, { forwardRef } from 'react';
import './Chip.css';

export type ChipType = 'Input' | 'Filter';
export type ChipState = 'default' | 'focused' | 'disabled';

export interface ChipProps {
  /** The text content of the chip */
  label: string;
  /** Chip type variant - maps to Figma 'Type' */
  type?: ChipType;
  /** Chip state - maps to Figma 'state' */
  state?: ChipState;
  /** Whether to show the left icon - maps to Figma 'icon' */
  hasIcon?: boolean;
  /** Whether to show the close button - maps to Figma 'has close button' */
  hasCloseButton?: boolean;
  /** Custom left icon */
  leftIcon?: React.ReactNode;
  /** Callback when the chip is clicked */
  onClick?: () => void;
  /** Callback when the close button is clicked */
  onClose?: (e: React.MouseEvent) => void;
  /** Additional CSS class names */
  className?: string;
  /** Custom ID */
  id?: string;
}

/**
 * Chip component matching FMDQ Design System 2026.
 * Used for input tags, filters, and small labels with interaction.
 */
export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      label,
      type = 'Input',
      state = 'default',
      hasIcon = false,
      hasCloseButton = true,
      leftIcon,
      onClick,
      onClose,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const isDisabled = state === 'disabled';


    const containerClasses = [
      'fmdqui-chip',
      `fmdqui-chip--${type.toLowerCase()}`,
      `fmdqui-chip--${state}`,
      className,
    ].filter(Boolean).join(' ');

    const handleClose = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isDisabled && onClose) {
        onClose(e);
      }
    };

    // Default icons based on Figma (Filter typically uses a search/filter icon)
    const renderLeftIcon = () => {
      if (!hasIcon && type !== 'Filter') return null;
      
      // If a custom leftIcon is provided, use it
      if (leftIcon) return <span className="fmdqui-chip__icon fmdqui-chip__icon--left">{leftIcon}</span>;

      // Default Filter icon (simplified placeholder icon to match Figma intent)
      if (type === 'Filter') {
        return (
          <span className="fmdqui-chip__icon fmdqui-chip__icon--left">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.6667 2H1.33333L6.66667 8.30667V12.6667L9.33333 14V8.30667L14.6667 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        );
      }

      // Default Input icon (if hasIcon=true but no leftIcon provided)
      return (
        <span className="fmdqui-chip__icon fmdqui-chip__icon--left">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </span>
      );
    };

    return (
      <div
        ref={ref}
        id={id}
        className={containerClasses}
        onClick={!isDisabled ? onClick : undefined}
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        aria-disabled={isDisabled}
        {...props}
      >
        {renderLeftIcon()}
        <span className="fmdqui-chip__label">{label}</span>
        {hasCloseButton && (
          <button
            type="button"
            className="fmdqui-chip__close"
            onClick={handleClose}
            disabled={isDisabled}
            aria-label="Remove"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Chip.displayName = 'Chip';
