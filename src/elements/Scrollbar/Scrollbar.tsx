import React, { forwardRef, useState, useEffect, useRef, useCallback } from 'react';
import type { HTMLAttributes, RefObject } from 'react';
import './Scrollbar.css';

export type ScrollbarOrientation = 'horizontal' | 'vertical';
export type ScrollbarSize = 'sm' | 'md';
export type ScrollbarState = 'default' | 'hover' | 'dragging';
export type ScrollbarTheme = 'light' | 'dark';

export interface ScrollbarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onScroll'> {
  /** Orientation of the scrollbar: horizontal or vertical. Default: 'horizontal' */
  orientation?: ScrollbarOrientation;
  /** Thickness of track and thumb: sm (6px) or md (8px). Default: 'sm' */
  size?: ScrollbarSize;
  /** Explicit interactive state: default, hover, or dragging. Controlled or auto. */
  state?: ScrollbarState;
  /** Surface theme: light or dark. Default: 'light' */
  theme?: ScrollbarTheme;
  /** Whether the track background is visible. Default: true */
  hasTrack?: boolean;
  /**
   * Length/size of the thumb (number in px, or percentage string like '50%').
   * If not provided, defaults to 60% of total length.
   */
  thumbLength?: number | string;
  /**
   * Current scroll position as a normalized fraction (0 to 1).
   * Overridden automatically if `targetRef` is provided.
   */
  position?: number;
  /** Optional callback fired when the user drags the scrollbar or clicks the track. */
  onPositionChange?: (position: number) => void;
  /**
   * Optional ref to a scrollable element (e.g. table container, overflow div).
   * When passed, the scrollbar automatically syncs position and controls the element.
   */
  targetRef?: RefObject<HTMLElement | null>;
}

export const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(
  (
    {
      orientation = 'horizontal',
      size = 'sm',
      state: propState,
      theme = 'light',
      hasTrack = true,
      thumbLength,
      position: propPosition,
      onPositionChange,
      targetRef,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const isHorizontal = orientation === 'horizontal';

    // Internal scroll position (0 to 1)
    const [internalPosition, setInternalPosition] = useState<number>(propPosition ?? 0);
    const [internalThumbRatio, setInternalThumbRatio] = useState<number>(0.6);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const trackRef = useRef<HTMLDivElement>(null);
    const dragStartRef = useRef<{ mousePos: number; startPos: number }>({ mousePos: 0, startPos: 0 });

    const effectivePosition = propPosition !== undefined ? propPosition : internalPosition;
    const effectiveState: ScrollbarState = propState ?? (isDragging ? 'dragging' : isHovered ? 'hover' : 'default');

    // Sync with targetRef scroll container if provided
    useEffect(() => {
      const target = targetRef?.current;
      if (!target) return;

      const handleTargetScroll = () => {
        if (isDragging) return; // avoid feedback loop while dragging
        if (isHorizontal) {
          const maxScroll = target.scrollWidth - target.clientWidth;
          if (maxScroll > 0) {
            const pos = target.scrollLeft / maxScroll;
            setInternalPosition(pos);
            setInternalThumbRatio(Math.max(0.1, target.clientWidth / target.scrollWidth));
          }
        } else {
          const maxScroll = target.scrollHeight - target.clientHeight;
          if (maxScroll > 0) {
            const pos = target.scrollTop / maxScroll;
            setInternalPosition(pos);
            setInternalThumbRatio(Math.max(0.1, target.clientHeight / target.scrollHeight));
          }
        }
      };

      handleTargetScroll();
      target.addEventListener('scroll', handleTargetScroll, { passive: true });
      return () => target.removeEventListener('scroll', handleTargetScroll);
    }, [targetRef, isHorizontal, isDragging]);

    const updatePosition = useCallback(
      (newPos: number) => {
        const clamped = Math.max(0, Math.min(1, newPos));
        setInternalPosition(clamped);
        onPositionChange?.(clamped);

        const target = targetRef?.current;
        if (target) {
          if (isHorizontal) {
            const maxScroll = target.scrollWidth - target.clientWidth;
            target.scrollTo({ left: clamped * maxScroll });
          } else {
            const maxScroll = target.scrollHeight - target.clientHeight;
            target.scrollTo({ top: clamped * maxScroll });
          }
        }
      },
      [targetRef, isHorizontal, onPositionChange]
    );

    // Mouse drag handlers on thumb
    const handleThumbMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);

      dragStartRef.current = {
        mousePos: isHorizontal ? e.clientX : e.clientY,
        startPos: effectivePosition,
      };

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const track = trackRef.current;
        if (!track) return;

        const trackRect = track.getBoundingClientRect();
        const trackLen = isHorizontal ? trackRect.width : trackRect.height;
        const currentMouse = isHorizontal ? moveEvent.clientX : moveEvent.clientY;
        const mouseDelta = currentMouse - dragStartRef.current.mousePos;

        // Calculate thumb pixel length
        const thumbPx = typeof thumbLength === 'number'
          ? thumbLength
          : trackLen * internalThumbRatio;
        const availableLen = trackLen - thumbPx;

        if (availableLen > 0) {
          const posDelta = mouseDelta / availableLen;
          updatePosition(dragStartRef.current.startPos + posDelta);
        }
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };

    // Track click to jump
    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const track = trackRef.current;
      if (!track) return;

      const trackRect = track.getBoundingClientRect();
      const clickPos = isHorizontal ? e.clientX - trackRect.left : e.clientY - trackRect.top;
      const trackLen = isHorizontal ? trackRect.width : trackRect.height;

      const thumbPx = typeof thumbLength === 'number'
        ? thumbLength
        : trackLen * internalThumbRatio;
      const availableLen = trackLen - thumbPx;

      if (availableLen > 0) {
        const targetPos = (clickPos - thumbPx / 2) / availableLen;
        updatePosition(targetPos);
      }
    };

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      const step = 0.05;
      if ((isHorizontal && e.key === 'ArrowRight') || (!isHorizontal && e.key === 'ArrowDown')) {
        e.preventDefault();
        updatePosition(effectivePosition + step);
      } else if ((isHorizontal && e.key === 'ArrowLeft') || (!isHorizontal && e.key === 'ArrowUp')) {
        e.preventDefault();
        updatePosition(effectivePosition - step);
      } else if (e.key === 'Home') {
        e.preventDefault();
        updatePosition(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        updatePosition(1);
      } else if (e.key === 'PageDown') {
        e.preventDefault();
        updatePosition(effectivePosition + step * 4);
      } else if (e.key === 'PageUp') {
        e.preventDefault();
        updatePosition(effectivePosition - step * 4);
      }
    };

    // Compute padding/translation for thumb placement:
    // "To set the thumb, use padding on the root: padding start is the scroll position, padding end is the rest."
    const thumbDimensionStyle = thumbLength
      ? typeof thumbLength === 'number'
        ? `${thumbLength}px`
        : thumbLength
      : `${(internalThumbRatio * 100).toFixed(1)}%`;

    const thumbOffsetPercent = (effectivePosition * (1 - internalThumbRatio) * 100).toFixed(2);

    const thumbStyle: React.CSSProperties = isHorizontal
      ? {
          width: thumbDimensionStyle,
          left: `${thumbOffsetPercent}%`,
        }
      : {
          height: thumbDimensionStyle,
          top: `${thumbOffsetPercent}%`,
        };

    const classNames = [
      'fmdqui-scrollbar',
      `fmdqui-scrollbar--${orientation}`,
      `fmdqui-scrollbar--size-${size}`,
      `fmdqui-scrollbar--state-${effectiveState}`,
      `fmdqui-scrollbar--theme-${theme}`,
      hasTrack ? 'fmdqui-scrollbar--has-track' : 'fmdqui-scrollbar--no-track',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classNames}
        style={style}
        role="scrollbar"
        aria-orientation={orientation}
        aria-valuenow={Math.round(effectivePosition * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <div
          ref={trackRef}
          className="fmdqui-scrollbar__track"
          onClick={handleTrackClick}
        >
          <div
            className="fmdqui-scrollbar__thumb"
            style={thumbStyle}
            onMouseDown={handleThumbMouseDown}
          />
        </div>
      </div>
    );
  }
);

Scrollbar.displayName = 'Scrollbar';
