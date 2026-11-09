import React, { useState } from 'react';
import { Icon } from '../../foundations/icons';
import { Divider } from '../../elements/Divider';
import './Pagination.css';

// ─── Types & Definitions (1:1 with Figma 347:10062) ──────────────────────────

export type PageNumberSize = 'small' | 'large';
export type PageNumberShape = 'square' | 'round';
export type PageNumberState = 'inactive' | 'hover' | 'active v1' | 'active v2';

export type NavControlType = 'single buttons' | 'grouped buttons' | 'button' | 'selector';
export type NavControlStyle = 'outlined' | 'filled-brand' | 'filled-dark' | 'ghost';
export type NavControlPosition = 'left' | 'right';

export type PaginationVariation = '1' | '2' | '3' | '4' | '5';
export type PaginationOrientation = 'full width' | 'centre aligned' | 'right aligned' | 'left aligned';
export type PaginationButtonType = 'single buttons' | 'group button' | 'selectors' | 'default buttons' | 'no buttons';

// Legacy compatibility
export type PaginationType = 'numbers' | 'indicator' | 'both';

// ─── 1. Base Element: PageNumber (Figma 2608:66376) ──────────────────────────

export interface PageNumberProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  page: number;
  state?: PageNumberState;
  size?: PageNumberSize;
  shape?: PageNumberShape;
  isSelected?: boolean;
}

export const PageNumber: React.FC<PageNumberProps> = ({
  page,
  state = 'inactive',
  size = 'large',
  shape = 'square',
  isSelected = false,
  className = '',
  ...props
}) => {
  const resolvedState = isSelected ? (state === 'active v2' ? 'active-v2' : 'active-v1') : state.replace(' ', '-');

  return (
    <button
      type="button"
      className={`fmdqui-page-number fmdqui-page-number--${size} fmdqui-page-number--${shape} fmdqui-page-number--${resolvedState} ${className}`}
      aria-current={isSelected ? 'page' : undefined}
      aria-label={`Go to page ${page}`}
      {...props}
    >
      {page}
    </button>
  );
};

// ─── 2. Base Element: TruncatedPages (Figma 2775:76546) ───────────────────────

export interface TruncatedPagesProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: PageNumberSize;
  state?: 'inactive' | 'hover';
}

export const TruncatedPages: React.FC<TruncatedPagesProps> = ({
  size = 'large',
  state = 'inactive',
  className = '',
  ...props
}) => {
  return (
    <span
      className={`fmdqui-truncated-pages fmdqui-truncated-pages--${size} fmdqui-truncated-pages--${state} ${className}`}
      aria-hidden="true"
      {...props}
    >
      …
    </span>
  );
};

// ─── 3. Base Element: PageIndicator (Figma 2609:67848) ────────────────────────

export interface PageIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  customText?: string;
}

export const PageIndicator: React.FC<PageIndicatorProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  customText,
  className = '',
  ...props
}) => {
  const text = customText
    ? customText
    : totalItems && pageSize
    ? `Showing ${(currentPage - 1) * pageSize + 1}–${Math.min(currentPage * pageSize, totalItems)} of ${totalItems}`
    : `Page ${currentPage} of ${totalPages}`;

  return (
    <span className={`fmdqui-page-indicator ${className}`} {...props}>
      {text}
    </span>
  );
};

// ─── 4. Base Element: NavigationControls (Figma 2607:66246) ───────────────────

export interface NavigationControlsProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: NavControlType;
  styleVariant?: NavControlStyle;
  position?: NavControlPosition;
  disabledPrev?: boolean;
  disabledNext?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  onSelectPage?: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
  prevLabel?: string;
  nextLabel?: string;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  type = 'single buttons',
  styleVariant = 'outlined',
  position = 'left',
  disabledPrev = false,
  disabledNext = false,
  onPrev,
  onNext,
  onSelectPage,
  currentPage = 1,
  totalPages = 10,
  prevLabel = 'Previous',
  nextLabel = 'Next',
  className = '',
  ...props
}) => {
  const [selectorInput, setSelectorInput] = useState('');

  // 4a. Single Buttons (36x36px icon square button)
  if (type === 'single buttons') {
    const isLeft = position === 'left';
    const isDisabled = isLeft ? disabledPrev : disabledNext;
    const onClick = isLeft ? onPrev : onNext;
    const iconName = isLeft ? 'chevron-left' : 'chevron-right';
    const ariaLabel = isLeft ? 'Previous page' : 'Next page';

    return (
      <button
        type="button"
        disabled={isDisabled}
        onClick={onClick}
        aria-label={ariaLabel}
        className={`fmdqui-nav-ctrl fmdqui-nav-ctrl--single fmdqui-nav-ctrl--${styleVariant} ${className}`}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        <Icon name={iconName} variant="linear" size={16} />
      </button>
    );
  }

  // 4b. Grouped Buttons (72x36px linked button pair)
  if (type === 'grouped buttons') {
    return (
      <div
        className={`fmdqui-nav-ctrl fmdqui-nav-ctrl--grouped fmdqui-nav-ctrl--${styleVariant} ${className}`}
        {...props}
      >
        <button
          type="button"
          disabled={disabledPrev}
          onClick={onPrev}
          aria-label="Previous page"
          className="fmdqui-nav-ctrl__group-btn fmdqui-nav-ctrl__group-btn--prev"
        >
          <Icon name="chevron-left" variant="linear" size={16} />
        </button>
        <div className="fmdqui-nav-ctrl__divider" />
        <button
          type="button"
          disabled={disabledNext}
          onClick={onNext}
          aria-label="Next page"
          className="fmdqui-nav-ctrl__group-btn fmdqui-nav-ctrl__group-btn--next"
        >
          <Icon name="chevron-right" variant="linear" size={16} />
        </button>
      </div>
    );
  }

  // 4c. Default Text Button (Previous 106px / Next 110px)
  if (type === 'button') {
    const isLeft = position === 'left';
    const isDisabled = isLeft ? disabledPrev : disabledNext;
    const onClick = isLeft ? onPrev : onNext;
    const label = isLeft ? prevLabel : nextLabel;

    return (
      <button
        type="button"
        disabled={isDisabled}
        onClick={onClick}
        className={`fmdqui-nav-ctrl fmdqui-nav-ctrl--button fmdqui-nav-ctrl--${styleVariant} fmdqui-nav-ctrl--${position} ${className}`}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {isLeft && <Icon name="arrow-left" variant="linear" size={16} />}
        <span>{label}</span>
        {!isLeft && <Icon name="arrow-right" variant="linear" size={16} />}
      </button>
    );
  }

  // 4d. Selector ("Go to page" + Input)
  if (type === 'selector') {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const p = parseInt(selectorInput, 10);
        if (!isNaN(p) && p >= 1 && p <= totalPages && onSelectPage) {
          onSelectPage(p);
          setSelectorInput('');
        }
      }
    };

    return (
      <div className={`fmdqui-nav-ctrl fmdqui-nav-ctrl--selector ${className}`} {...props}>
        <span className="fmdqui-nav-ctrl__selector-text">Go to page</span>
        <div className="fmdqui-nav-ctrl__selector-input-wrapper">
          <input
            type="number"
            min={1}
            max={totalPages}
            placeholder={String(currentPage)}
            value={selectorInput}
            onChange={(e) => setSelectorInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="fmdqui-nav-ctrl__selector-input"
            aria-label="Page number input"
          />
        </div>
      </div>
    );
  }

  return null;
};

// ─── 5. Composite: PaginationList (Figma 2767:76342) ──────────────────────────

export interface PaginationListProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  size?: PageNumberSize;
  shape?: PageNumberShape;
  activeVariant?: 'active v1' | 'active v2';
  arrowStyle?: 'no arrows' | 'outlined' | 'filled-dark' | 'filled-brand' | 'ghost';
  hasButtons?: boolean;
  hasHiddenMore?: boolean;
}

export const PaginationList: React.FC<PaginationListProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  size = 'large',
  shape = 'square',
  activeVariant = 'active v1',
  arrowStyle = 'no arrows',
  hasButtons = true,
  hasHiddenMore = true,
  className = '',
  ...props
}) => {
  // Page number generation logic with intelligent truncation
  const getPageNumbers = (): (number | string)[] => {
    if (!hasHiddenMore || totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const pages = getPageNumbers();
  const showArrows = hasButtons && arrowStyle !== 'no arrows';
  const navStyleVariant = (arrowStyle === 'no arrows' ? 'outlined' : arrowStyle) as NavControlStyle;

  return (
    <div className={`fmdqui-pagination-list fmdqui-pagination-list--${size} ${className}`} {...props}>
      {/* Optional Leading Arrow */}
      {showArrows && (
        <NavigationControls
          type="single buttons"
          styleVariant={navStyleVariant}
          position="left"
          disabledPrev={currentPage <= 1}
          onPrev={() => onPageChange(currentPage - 1)}
        />
      )}

      {/* Page Numbers */}
      <div className="fmdqui-pagination-list__items">
        {pages.map((p, idx) =>
          p === '...' ? (
            <TruncatedPages key={`ellipsis-${idx}`} size={size} />
          ) : (
            <PageNumber
              key={`page-${p}`}
              page={Number(p)}
              size={size}
              shape={shape}
              state={Number(p) === currentPage ? activeVariant : 'inactive'}
              isSelected={Number(p) === currentPage}
              onClick={() => onPageChange(Number(p))}
            />
          )
        )}
      </div>

      {/* Optional Trailing Arrow */}
      {showArrows && (
        <NavigationControls
          type="single buttons"
          styleVariant={navStyleVariant}
          position="right"
          disabledNext={currentPage >= totalPages}
          onNext={() => onPageChange(currentPage + 1)}
        />
      )}
    </div>
  );
};

// ─── 6. Full Composite: Pagination (Figma 2767:76362) ──────────────────────────

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Current active page (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Total items count for entries indicator */
  totalItems?: number;
  /** Items displayed per page */
  pageSize?: number;
  /** Callback fired when page is changed */
  onPageChange: (page: number) => void;
  /** Variation matching Figma: 1 (Indicator center), 2 (Numbers center), 3 (Left aligned), 4 (Right aligned), 5 (Center aligned) */
  variation?: PaginationVariation;
  /** Orientation alignment matching Figma: 'full width' | 'centre aligned' | 'right aligned' | 'left aligned' */
  orientation?: PaginationOrientation;
  /** Navigation button presentation type matching Figma: 'single buttons' | 'group button' | 'selectors' | 'default buttons' | 'no buttons' */
  buttonType?: PaginationButtonType;
  /** Page number button shape: 'square' (radius 6px) | 'round' (circle) */
  shape?: PageNumberShape;
  /** Page number size: 'small' (24px) | 'large' (36px) */
  size?: PageNumberSize;
  /** Active page button style variant: 'active v1' (blue tint) | 'active v2' (blue border) */
  activeVariant?: 'active v1' | 'active v2';
  /** Arrow style for pagination controls: 'outlined' | 'filled-brand' | 'filled-dark' | 'ghost' */
  controlStyle?: NavControlStyle;
  /** Whether to render top divider line matching Figma property "has top divider" (default: true) */
  hasTopDivider?: boolean;
  /** Whether to render a 1px Grey/200 left stroke matching Figma property "has left stroke" (e.g. for table footer containment, default: false) */
  hasLeftStroke?: boolean;
  /** Whether to render a 1px Grey/200 right stroke matching Figma property "has right stroke" (e.g. for table footer containment, default: false) */
  hasRightStroke?: boolean;
  /** Whether to render a 1px Grey/200 bottom stroke matching Figma property "has bottom stroke" (e.g. for table footer containment, default: false) */
  hasBottomStroke?: boolean;
  /** @deprecated Use `hasTopDivider` instead. Whether to render top divider line matching Figma layer "Dividers" */
  showDivider?: boolean;
  /** Previous button text label */
  prevLabel?: string;
  /** Next button text label */
  nextLabel?: string;

  // Legacy compatibility props
  type?: PaginationType;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  variation = '2',
  orientation = 'full width',
  buttonType = 'single buttons',
  shape = 'square',
  size = 'large',
  activeVariant = 'active v1',
  controlStyle = 'outlined',
  hasTopDivider,
  showDivider,
  hasLeftStroke = false,
  hasRightStroke = false,
  hasBottomStroke = false,
  prevLabel = 'Previous',
  nextLabel = 'Next',
  type,
  className = '',
  style,
  ...props
}) => {
  const safeCurrent = Math.max(1, Math.min(currentPage, Math.max(1, totalPages)));
  const isFirst = safeCurrent <= 1;
  const isLast = safeCurrent >= totalPages;

  // Figma property "has top divider" defaults to true; fallback to legacy showDivider if provided
  const resolvedHasTopDivider = hasTopDivider ?? showDivider ?? true;

  // Map legacy type prop if provided
  let effectiveVariation = variation;
  if (type === 'indicator') effectiveVariation = '1';

  const handlePrev = () => {
    if (!isFirst) onPageChange(safeCurrent - 1);
  };

  const handleNext = () => {
    if (!isLast) onPageChange(safeCurrent + 1);
  };

  const paginationClasses = [
    'fmdqui-pagination',
    `fmdqui-pagination--var-${effectiveVariation}`,
    `fmdqui-pagination--${orientation.replace(' ', '-')}`,
    resolvedHasTopDivider ? 'fmdqui-pagination--has-top-divider' : '',
    hasLeftStroke ? 'fmdqui-pagination--has-left-stroke' : '',
    hasRightStroke ? 'fmdqui-pagination--has-right-stroke' : '',
    hasBottomStroke ? 'fmdqui-pagination--has-bottom-stroke' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav
      className={paginationClasses}
      style={style}
      aria-label="Pagination Navigation"
      {...props}
    >
      {/* ── Optional Top Divider (Figma 2609:66656 / has top divider) ── */}
      {resolvedHasTopDivider && <Divider type="default" className="fmdqui-pagination__divider" />}

      {/* ── Main Pagination Content Container ── */}
      <div className="fmdqui-pagination__body">
        {/* ── VARIATION 1: Indicator Center (Figma 2767:76361) ── */}
        {effectiveVariation === '1' && (
          <>
            <NavigationControls
              type={buttonType === 'default buttons' ? 'button' : 'single buttons'}
              styleVariant={controlStyle}
              position="left"
              disabledPrev={isFirst}
              onPrev={handlePrev}
              prevLabel={prevLabel}
            />
            <PageIndicator
              currentPage={safeCurrent}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={pageSize}
            />
            <NavigationControls
              type={buttonType === 'default buttons' ? 'button' : 'single buttons'}
              styleVariant={controlStyle}
              position="right"
              disabledNext={isLast}
              onNext={handleNext}
              nextLabel={nextLabel}
            />
          </>
        )}

        {/* ── VARIATION 2: Numbers Center (Figma 2767:76348) ── */}
        {effectiveVariation === '2' && (
          <>
            {buttonType !== 'no buttons' && (
              <NavigationControls
                type={buttonType === 'default buttons' ? 'button' : buttonType === 'group button' ? 'grouped buttons' : 'single buttons'}
                styleVariant={controlStyle}
                position="left"
                disabledPrev={isFirst}
                disabledNext={isLast}
                onPrev={handlePrev}
                onNext={handleNext}
                prevLabel={prevLabel}
              />
            )}

            <div className="fmdqui-pagination__center-wrap">
              <PaginationList
                currentPage={safeCurrent}
                totalPages={totalPages}
                onPageChange={onPageChange}
                size={size}
                shape={shape}
                activeVariant={activeVariant}
                arrowStyle="no arrows"
              />
            </div>

            {buttonType === 'single buttons' && (
              <NavigationControls
                type="single buttons"
                styleVariant={controlStyle}
                position="right"
                disabledNext={isLast}
                onNext={handleNext}
                nextLabel={nextLabel}
              />
            )}

            {buttonType === 'default buttons' && (
              <NavigationControls
                type="button"
                styleVariant={controlStyle}
                position="right"
                disabledNext={isLast}
                onNext={handleNext}
                nextLabel={nextLabel}
              />
            )}

            {buttonType === 'selectors' && (
              <NavigationControls
                type="selector"
                currentPage={safeCurrent}
                totalPages={totalPages}
                onSelectPage={onPageChange}
              />
            )}
          </>
        )}

        {/* ── VARIATION 3, 4, 5: Aligned Clusters (Figma 2767:76357, 2767:76345, 2767:76343) ── */}
        {(effectiveVariation === '3' || effectiveVariation === '4' || effectiveVariation === '5') && (
          <div className="fmdqui-pagination__cluster">
            {/* Cluster item 1: Indicator */}
            <PageIndicator
              currentPage={safeCurrent}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={pageSize}
            />

            {/* Cluster item 2: Pagination List */}
            <PaginationList
              currentPage={safeCurrent}
              totalPages={totalPages}
              onPageChange={onPageChange}
              size={size}
              shape={shape}
              activeVariant={activeVariant}
              arrowStyle="no arrows"
            />

            {/* Cluster item 3: Navigation Controls */}
            {buttonType === 'group button' && (
              <NavigationControls
                type="grouped buttons"
                styleVariant={controlStyle}
                disabledPrev={isFirst}
                disabledNext={isLast}
                onPrev={handlePrev}
                onNext={handleNext}
              />
            )}

            {buttonType === 'single buttons' && (
              <div className="fmdqui-pagination__button-pair">
                <NavigationControls
                  type="single buttons"
                  styleVariant={controlStyle}
                  position="left"
                  disabledPrev={isFirst}
                  onPrev={handlePrev}
                />
                <NavigationControls
                  type="single buttons"
                  styleVariant={controlStyle}
                  position="right"
                  disabledNext={isLast}
                  onNext={handleNext}
                />
              </div>
            )}

            {buttonType === 'default buttons' && (
              <div className="fmdqui-pagination__button-pair">
                <NavigationControls
                  type="button"
                  styleVariant={controlStyle}
                  position="left"
                  disabledPrev={isFirst}
                  onPrev={handlePrev}
                  prevLabel={prevLabel}
                />
                <NavigationControls
                  type="button"
                  styleVariant={controlStyle}
                  position="right"
                  disabledNext={isLast}
                  onNext={handleNext}
                  nextLabel={nextLabel}
                />
              </div>
            )}

            {buttonType === 'selectors' && (
              <NavigationControls
                type="selector"
                currentPage={safeCurrent}
                totalPages={totalPages}
                onSelectPage={onPageChange}
              />
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
