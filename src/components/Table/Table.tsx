import React, { useState, useMemo, forwardRef, useEffect } from 'react';
import './Table.css';
import { Checkbox, Radio, Switch } from '../../elements/FormControl';
import { Avatar, type AvatarSize } from '../../elements/Avatar';
import { Badge, type BadgeColor, type BadgeType } from '../../elements/Badge';
import { Chip } from '../../elements/Chip';
import { Pagination, type PaginationProps } from '../Pagination';
import { ColumnMenu, type ColumnMenuFilterType, type ColumnMenuOption } from '../ColumnMenu';

import { Icon } from '../../foundations/icons';
import { ProgressBar, type ProgressBarColor } from '../ProgressBar';

const ChevronUpIcon = () => (
  <Icon name="chevron-up" variant="linear" size={12} />
);

const ChevronDownIcon = () => (
  <Icon name="chevron-down" variant="linear" size={12} />
);

const ChevronsUpDownIcon = () => (
  <Icon name="chevron-v" variant="linear" size={12} />
);

const DotsVerticalIcon = ({ variant = 'bold' }: { variant?: 'linear' | 'bold' }) => (
  <Icon name="dots-v" variant={variant} size={16} />
);

const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <Icon name="star" variant={filled ? 'bold' : 'linear'} size={14} />
);

// ─── Base Structural Components ───────────────────────────────────────────────

export const TableContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={`fmdqui-table-container ${className}`} {...props}>
    {children}
  </div>
);

export interface TableElementProps extends React.TableHTMLAttributes<HTMLTableElement> {
  variant?: 'default' | 'striped';
  density?: 'default' | 'compact';
}

export const TableElement: React.FC<TableElementProps> = ({
  variant = 'default',
  density = 'default',
  className = '',
  children,
  ...props
}) => {
  const classes = [
    'fmdqui-table',
    variant === 'striped' ? 'fmdqui-table--striped' : '',
    density === 'compact' ? 'fmdqui-table--compact' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <table className={classes} {...props}>
      {children}
    </table>
  );
};

export const TableHead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <thead className={`fmdqui-table-head ${className}`} {...props}>
    {children}
  </thead>
);

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <tbody className={`fmdqui-table-body ${className}`} {...props}>
    {children}
  </tbody>
);

// ─── TableRow Component ───────────────────────────────────────────────────────

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
  hoverable?: boolean;
  animate?: boolean;
  disabled?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    {
      selected = false,
      hoverable = true,
      animate = false,
      disabled = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      'fmdqui-table-row',
      selected ? 'fmdqui-table-row--selected' : '',
      hoverable ? 'fmdqui-table-row--hoverable' : '',
      animate ? 'fmdqui-table-row--animate' : '',
      disabled ? 'fmdqui-table-row--disabled' : '',
      props.onClick ? 'fmdqui-table-row--clickable' : '',
      className,
    ].filter(Boolean).join(' ');

    return (
      <tr ref={ref} className={classes} aria-selected={selected} {...props}>
        {children}
      </tr>
    );
  }
);
TableRow.displayName = 'TableRow';

// ─── TableHeaderCell Component ────────────────────────────────────────────────

export type TableSortDirection = 'asc' | 'desc' | 'none' | null;
export type TableHeaderState = 'default' | 'hover' | 'selected';

export interface TableHeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  state?: TableHeaderState;
  checkbox?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  onCheckboxChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasLabel?: boolean;
  trailingIcon?: boolean;
  sortable?: boolean;
  sortDirection?: TableSortDirection;
  onSort?: () => void;
  align?: 'left' | 'center' | 'right';
  hasSeparator?: boolean;
  /** Whether this header cell has an associated ColumnMenu popover */
  hasColumnMenu?: boolean;
  /** Controlled open state for the column menu */
  isMenuOpen?: boolean;
  /** Callback when the menu should open/close */
  onMenuToggle?: () => void;
  /** Column menu content to render inside the popover */
  columnMenu?: React.ReactNode;
}

export const TableHeaderCell = forwardRef<HTMLTableHeaderCellElement, TableHeaderCellProps>(
  (
    {
      state = 'default',
      checkbox = false,
      checked = false,
      indeterminate,
      onCheckboxChange,
      hasLabel = true,
      trailingIcon = false,
      sortable = false,
      sortDirection = 'none',
      onSort,
      align = 'left',
      hasSeparator = true,
      hasColumnMenu = false,
      isMenuOpen,
      onMenuToggle,
      columnMenu,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const checkboxRef = React.useRef<HTMLInputElement>(null);
    const [internalMenuOpen, setInternalMenuOpen] = React.useState(false);
    const isMenuVisible = isMenuOpen ?? internalMenuOpen;

    React.useEffect(() => {
      if (checkboxRef.current && indeterminate !== undefined) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const showSortIcon = sortable || trailingIcon || hasColumnMenu;

    const classes = [
      'fmdqui-table-header-cell',
      `fmdqui-table-header-cell--align-${align}`,
      state === 'hover' ? 'fmdqui-table-header-cell--state-hover' : '',
      state === 'selected' || isMenuVisible ? 'fmdqui-table-header-cell--state-selected' : '',
      !hasSeparator ? 'fmdqui-table-header-cell--no-separator' : '',
      hasColumnMenu ? 'fmdqui-table-header-cell--has-menu' : '',
      className,
    ].filter(Boolean).join(' ');

    const handleTriggerClick = (e: React.MouseEvent) => {
      if (hasColumnMenu) {
        e.stopPropagation();
        if (onMenuToggle) {
          onMenuToggle();
        } else {
          setInternalMenuOpen((prev) => !prev);
        }
      } else if (onSort) {
        onSort();
      }
    };

    const renderSortIcon = () => {
      if (sortDirection === 'asc') {
        return (
          <span className="fmdqui-table-header-cell__sort-icon fmdqui-table-header-cell__sort-icon--active">
            <ChevronUpIcon />
          </span>
        );
      }
      if (sortDirection === 'desc') {
        return (
          <span className="fmdqui-table-header-cell__sort-icon fmdqui-table-header-cell__sort-icon--active">
            <ChevronDownIcon />
          </span>
        );
      }
      return (
        <span className="fmdqui-table-header-cell__sort-icon">
          <ChevronsUpDownIcon />
        </span>
      );
    };

    return (
      <th ref={ref} className={classes} {...props}>
        <div className="fmdqui-table-header-cell__content">
          {checkbox && (
            <span className="fmdqui-table-header-cell__checkbox-wrap">
              <Checkbox
                ref={checkboxRef}
                checked={checked}
                onChange={onCheckboxChange}
                aria-label="Select all rows"
              />
            </span>
          )}

          {sortable || hasColumnMenu ? (
            <button
              type="button"
              className="fmdqui-table-header-cell__sort-btn"
              onClick={handleTriggerClick}
              aria-expanded={isMenuVisible}
              aria-haspopup={hasColumnMenu ? 'dialog' : undefined}
            >
              {hasLabel && children && <span>{children}</span>}
              {showSortIcon && renderSortIcon()}
            </button>
          ) : (
            <>
              {hasLabel && children && <span>{children}</span>}
              {showSortIcon && renderSortIcon()}
            </>
          )}
        </div>

        {/* Infused ColumnMenu Popover */}
        {isMenuVisible && columnMenu && (
          <div
            className="fmdqui-table-header-cell__menu-popover"
            onClick={(e) => e.stopPropagation()}
          >
            {columnMenu}
          </div>
        )}
      </th>
    );
  }
);
TableHeaderCell.displayName = 'TableHeaderCell';

// Alias for backwards compatibility
export const TableHeader = TableHeaderCell;

// ─── TableCell Component (Granular with all Figma variants) ───────────────────

export type TableCellVariant =
  | 'text'
  | 'text-stack'
  | 'avatar-text'
  | 'avatar-group'
  | 'control'
  | 'badge'
  | 'chip'
  | 'progress'
  | 'actions'
  | 'more-menu'
  | 'rating'
  | 'icons'
  | 'custom';

export interface AvatarGroupItem {
  src?: string;
  initials?: string;
  name?: string;
}

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableDataCellElement> {
  variant?: TableCellVariant;
  align?: 'left' | 'center' | 'right';
  selected?: boolean;
  hasSeparator?: boolean;

  // Variant: 'text'
  text?: React.ReactNode;
  textWeight?: 'regular' | 'medium' | 'semibold';
  muted?: boolean;

  // Variant: 'text-stack' & 'avatar-text'
  primaryText?: React.ReactNode;
  secondaryText?: React.ReactNode;

  // Variant: 'avatar-text'
  avatar?: React.ReactNode;
  avatarSrc?: string;
  avatarInitials?: string;
  avatarSize?: AvatarSize;

  // Variant: 'avatar-group'
  avatars?: AvatarGroupItem[];
  maxAvatars?: number;

  // Variant: 'control'
  controlType?: 'checkbox' | 'radio' | 'switch';
  controlChecked?: boolean;
  onControlChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  controlDisabled?: boolean;
  controlAriaLabel?: string;

  // Variant: 'badge'
  badgeColor?: BadgeColor;
  badgeType?: BadgeType;
  badgeText?: React.ReactNode;

  // Variant: 'chip'
  chipLabel?: string;
  onChipClose?: (e: React.MouseEvent) => void;

  // Variant: 'progress'
  progress?: number | string;
  progressLabel?: React.ReactNode;
  progressColor?: 'primary' | 'success' | 'warning' | 'error';
  showPercentage?: boolean;

  // Variant: 'actions'
  actions?: React.ReactNode;

  // Variant: 'more-menu'
  onMenuClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  menuAriaLabel?: string;
  /** Whether the more menu trigger button has a background and border (matching Figma Misc icon "has background", default: false) */
  menuHasBackground?: boolean;
  /** Icon variant for the three-dots button ('bold' per Figma spec, or 'linear') */
  menuIconVariant?: 'linear' | 'bold';

  // Variant: 'rating'
  rating?: number;
  maxRating?: number;
}

export const TableCell = forwardRef<HTMLTableDataCellElement, TableCellProps>(
  (
    {
      variant = 'custom',
      align = 'left',
      selected = false,
      hasSeparator = true,
      text,
      textWeight = 'regular',
      muted = false,
      primaryText,
      secondaryText,
      avatar,
      avatarSrc,
      avatarInitials,
      avatarSize = 'sm',
      avatars = [],
      maxAvatars = 4,
      controlType = 'checkbox',
      controlChecked = false,
      onControlChange,
      controlDisabled = false,
      controlAriaLabel,
      badgeColor = 'blue',
      badgeType = 'filled',
      badgeText,
      chipLabel,
      onChipClose,
      progress = 0,
      progressLabel,
      progressColor = 'primary',
      showPercentage = true,
      actions,
      onMenuClick,
      menuAriaLabel = 'Row actions',
      menuHasBackground = false,
      menuIconVariant = 'bold',
      rating = 0,
      maxRating = 5,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      'fmdqui-table-cell',
      `fmdqui-table-cell--align-${align}`,
      selected ? 'fmdqui-table-cell--selected' : '',
      !hasSeparator ? 'fmdqui-table-cell--no-separator' : '',
      className,
    ].filter(Boolean).join(' ');

    const renderContent = () => {
      // 1. Plain Text
      if (variant === 'text') {
        const textWeightClass =
          textWeight === 'semibold'
            ? 'fmdqui-table-cell__text--semibold'
            : textWeight === 'medium'
              ? 'fmdqui-table-cell__text--medium'
              : '';
        return (
          <div
            className={`fmdqui-table-cell__text ${textWeightClass} ${muted ? 'fmdqui-table-cell__text--muted' : ''
              }`}
          >
            {text ?? children}
          </div>
        );
      }

      // 2. Text Stack (Heading + Subtitle)
      if (variant === 'text-stack') {
        return (
          <div className="fmdqui-table-cell__text-stack">
            <div className="fmdqui-table-cell__primary-text">{primaryText ?? children}</div>
            {secondaryText && (
              <div className="fmdqui-table-cell__secondary-text">{secondaryText}</div>
            )}
          </div>
        );
      }

      // 3. Avatar + Text
      if (variant === 'avatar-text') {
        const renderedAvatar = avatar || (
          <Avatar
            size={avatarSize}
            type={avatarSrc ? 'Image' : avatarInitials ? 'Initials' : 'Icon'}
            imageUrl={avatarSrc}
            initials={avatarInitials}
          />
        );

        return (
          <div className="fmdqui-table-cell__avatar-text">
            <span className="fmdqui-table-cell__avatar-wrapper">{renderedAvatar}</span>
            <div className="fmdqui-table-cell__text-stack">
              <div className="fmdqui-table-cell__primary-text">{primaryText ?? children}</div>
              {secondaryText && (
                <div className="fmdqui-table-cell__secondary-text">{secondaryText}</div>
              )}
            </div>
          </div>
        );
      }

      // 4. Avatar Group
      if (variant === 'avatar-group') {
        const visibleAvatars = avatars.slice(0, maxAvatars);
        const remainingCount = avatars.length - maxAvatars;

        return (
          <div className="fmdqui-table-cell__avatar-group">
            {visibleAvatars.map((item, idx) => (
              <div key={idx} className="fmdqui-table-cell__avatar-group-item">
                <Avatar
                  size="xs"
                  type={item.src ? 'Image' : item.initials ? 'Initials' : 'Icon'}
                  imageUrl={item.src}
                  initials={item.initials}
                />
              </div>
            ))}
            {remainingCount > 0 && (
              <div className="fmdqui-table-cell__avatar-group-more">
                +{remainingCount}
              </div>
            )}
          </div>
        );
      }

      // 5. Form Control
      if (variant === 'control') {
        return (
          <span className="fmdqui-table-cell__control">
            {controlType === 'radio' ? (
              <Radio
                checked={controlChecked}
                onChange={onControlChange}
                disabled={controlDisabled}
                aria-label={controlAriaLabel || 'Select row'}
              />
            ) : controlType === 'switch' ? (
              <Switch
                checked={controlChecked}
                onChange={onControlChange}
                disabled={controlDisabled}
                aria-label={controlAriaLabel || 'Toggle status'}
              />
            ) : (
              <Checkbox
                checked={controlChecked}
                onChange={onControlChange}
                disabled={controlDisabled}
                aria-label={controlAriaLabel || 'Select row'}
              />
            )}
          </span>
        );
      }

      // 6. Badge
      if (variant === 'badge') {
        return (
          <span className="fmdqui-table-cell__badge-wrap">
            {children ? (
              children
            ) : (
              <Badge color={badgeColor} type={badgeType}>
                {badgeText}
              </Badge>
            )}
          </span>
        );
      }

      // 7. Chip
      if (variant === 'chip') {
        return (
          <span className="fmdqui-table-cell__chip-wrap">
            {children ? (
              children
            ) : (
              <Chip
                label={chipLabel || ''}
                onClose={onChipClose}
                hasCloseButton={!!onChipClose}
              />
            )}
          </span>
        );
      }

      // 8. Progress
      if (variant === 'progress') {
        const numericProgress = typeof progress === 'string' ? parseFloat(progress) : progress;
        const clampedProgress = Math.min(Math.max(numericProgress, 0), 100);
        const mappedColor: ProgressBarColor = progressColor ?? 'primary';

        return (
          <div className="fmdqui-table-cell__progress-wrap">
            <ProgressBar
              progress={clampedProgress}
              size="sm"
              color={mappedColor}
              label={progressLabel}
              hasLabel={!!progressLabel}
              hasPercentages={showPercentage}
              percentagePosition="top"
              hasMetadata={false}
              hasDescription={false}
            />
          </div>
        );
      }

      // 9. Actions
      if (variant === 'actions') {
        return <div className="fmdqui-table-cell__actions">{actions ?? children}</div>;
      }

      // 10. More Menu (Three-dots button)
      if (variant === 'more-menu') {
        const btnClasses = [
          'fmdqui-table-cell__more-menu-btn',
          menuHasBackground ? 'fmdqui-table-cell__more-menu-btn--has-background' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            type="button"
            className={btnClasses}
            onClick={onMenuClick}
            aria-label={menuAriaLabel}
          >
            <DotsVerticalIcon variant={menuIconVariant} />
          </button>
        );
      }

      // 11. Rating
      if (variant === 'rating') {
        return (
          <div className="fmdqui-table-cell__rating" aria-label={`Rating: ${rating} of ${maxRating}`}>
            {Array.from({ length: maxRating }).map((_, i) => (
              <StarIcon key={i} filled={i < rating} />
            ))}
          </div>
        );
      }

      // 12. Icons (Group of action icons matching Figma)
      if (variant === 'icons') {
        return (
          <div className="fmdqui-table-cell__icons">
            {children || (
              <>
                <button type="button" className="fmdqui-table-cell__icon-btn" aria-label="Edit">
                  <Icon name="pencil" variant="linear" size={16} />
                </button>
                <button type="button" className="fmdqui-table-cell__icon-btn" aria-label="Delete">
                  <Icon name="bin" variant="linear" size={16} />
                </button>
                <button type="button" className="fmdqui-table-cell__icon-btn" aria-label="Favorite">
                  <Icon name="heart" variant="linear" size={16} />
                </button>
              </>
            )}
          </div>
        );
      }

      // Default / Custom
      return children;
    };

    return (
      <td ref={ref} className={classes} {...props}>
        {renderContent()}
      </td>
    );
  }
);
TableCell.displayName = 'TableCell';

// ─── Dedicated Named Cell Atoms (For clear JSX syntax) ────────────────────────

export const TextCell: React.FC<TableCellProps> = (props) => (
  <TableCell variant="text" {...props} />
);
TextCell.displayName = 'TableCell';

export const TextStackCell: React.FC<TableCellProps> = (props) => (
  <TableCell variant="text-stack" {...props} />
);
TextStackCell.displayName = 'TableCell';

export const AvatarCell: React.FC<TableCellProps> = (props) => (
  <TableCell variant="avatar-text" {...props} />
);
AvatarCell.displayName = 'TableCell';

export const AvatarGroupCell: React.FC<TableCellProps> = (props) => (
  <TableCell variant="avatar-group" {...props} />
);
AvatarGroupCell.displayName = 'TableCell';

export const ControlCell: React.FC<TableCellProps> = (props) => (
  <TableCell variant="control" {...props} />
);
ControlCell.displayName = 'TableCell';

export const BadgeCell: React.FC<TableCellProps> = (props) => (
  <TableCell variant="badge" {...props} />
);
BadgeCell.displayName = 'TableCell';

export const ChipCell: React.FC<TableCellProps> = (props) => (
  <TableCell variant="chip" {...props} />
);
ChipCell.displayName = 'TableCell';

export const ProgressCell: React.FC<TableCellProps> = (props) => (
  <TableCell variant="progress" {...props} />
);
ProgressCell.displayName = 'TableCell';

export const ActionCell: React.FC<TableCellProps> = (props) => (
  <TableCell variant="actions" {...props} />
);
ActionCell.displayName = 'TableCell';

export const MoreMenuCell: React.FC<TableCellProps> = (props) => (
  <TableCell variant="more-menu" {...props} />
);
MoreMenuCell.displayName = 'TableCell';

export const IconsCell: React.FC<TableCellProps> = (props) => (
  <TableCell variant="icons" {...props} />
);
IconsCell.displayName = 'TableCell';

// ─── LeadingCell Component (Matching Figma `✤ Tables` Leading Cell) ───────────

export type LeadingCellMedia = 'featured-icon' | 'avatar' | 'none';
export type LeadingCellControl = 'radio-button' | 'toggle' | 'checkbox' | 'none';
export type LeadingCellState = 'default' | 'selected';

export interface LeadingCellProps
  extends Omit<React.TdHTMLAttributes<HTMLTableDataCellElement>, 'onChange'> {
  state?: LeadingCellState;
  media?: LeadingCellMedia;
  control?: LeadingCellControl;
  hasControl?: boolean;
  hasLeadingMedia?: boolean;
  hasTexts?: boolean;
  hasLabel?: boolean;
  hasDescription?: boolean;
  hasSeparator?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  iconName?: string;
  avatarInitials?: string;
  avatarSrc?: string;
  controlChecked?: boolean;
  onControlChange?: (checked: boolean) => void;
  controlDisabled?: boolean;
  controlAriaLabel?: string;
  align?: 'left' | 'center' | 'right';
}

export const LeadingCell = forwardRef<HTMLTableDataCellElement, LeadingCellProps>(
  (
    {
      state = 'default',
      media = 'featured-icon',
      control = 'radio-button',
      hasControl = true,
      hasLeadingMedia = true,
      hasTexts = true,
      hasLabel = true,
      hasDescription = true,
      hasSeparator = false,
      label = 'Leading text',
      description = 'Description',
      iconName = 'star',
      avatarInitials,
      avatarSrc,
      controlChecked = false,
      onControlChange,
      controlDisabled = false,
      controlAriaLabel,
      align = 'left',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      'fmdqui-table-cell',
      'fmdqui-table-leading-cell',
      `fmdqui-table-cell--align-${align}`,
      state === 'selected' ? 'fmdqui-table-cell--selected fmdqui-table-leading-cell--state-selected' : '',
      hasSeparator ? 'fmdqui-table-leading-cell--has-separator' : 'fmdqui-table-cell--no-separator',
      className,
    ].filter(Boolean).join(' ');

    const showControl = hasControl && control !== 'none';
    const showMedia = hasLeadingMedia && media !== 'none';
    const showTexts = hasTexts && (hasLabel || hasDescription || children);

    return (
      <td ref={ref} className={classes} {...props}>
        <div className="fmdqui-table-leading-cell__container">
          {showControl && (
            <span className="fmdqui-table-cell__control">
              {control === 'radio-button' && (
                <Radio
                  checked={controlChecked}
                  onChange={(e) => onControlChange?.(e.target.checked)}
                  disabled={controlDisabled}
                  aria-label={controlAriaLabel || 'Select option'}
                />
              )}
              {control === 'toggle' && (
                <Switch
                  checked={controlChecked}
                  onChange={(e) => onControlChange?.(e.target.checked)}
                  disabled={controlDisabled}
                  aria-label={controlAriaLabel || 'Toggle option'}
                />
              )}
              {control === 'checkbox' && (
                <Checkbox
                  checked={controlChecked}
                  onChange={(e) => onControlChange?.(e.target.checked)}
                  disabled={controlDisabled}
                  aria-label={controlAriaLabel || 'Select item'}
                />
              )}
            </span>
          )}

          {showMedia && (
            <span className="fmdqui-table-leading-cell__media-wrap">
              {media === 'avatar' ? (
                <Avatar
                  size="sm"
                  type={avatarSrc ? 'Image' : avatarInitials ? 'Initials' : 'Icon'}
                  imageUrl={avatarSrc}
                  initials={avatarInitials || 'JD'}
                />
              ) : (
                <span className="fmdqui-table-leading-cell__media">
                  <Icon name={iconName} variant="linear" size={16} />
                </span>
              )}
            </span>
          )}

          {showTexts && (
            <div className="fmdqui-table-leading-cell__text">
              {hasLabel && (
                <div className="fmdqui-table-leading-cell__label">
                  {children ?? label}
                </div>
              )}
              {hasDescription && description && (
                <div className="fmdqui-table-leading-cell__description">
                  {description}
                </div>
              )}
            </div>
          )}
        </div>
      </td>
    );
  }
);
LeadingCell.displayName = 'LeadingCell';

// ─── ContentCell Component (Matching Figma `✤ Tables` Content Cell) ───────────

export type ContentType =
  | 'avatar + text'
  | 'icons'
  | 'badge'
  | 'actions'
  | 'avatar group'
  | 'progress bar'
  | 'rating'
  | 'more menu';

export interface ContentCellProps extends TableCellProps {
  content?: ContentType;
  state?: 'default' | 'selected';
}

export const ContentCell = forwardRef<HTMLTableDataCellElement, ContentCellProps>(
  ({ content, state, selected, align, ...props }, ref) => {
    let resolvedVariant = props.variant;
    let resolvedAlign = align;
    if (content) {
      switch (content) {
        case 'avatar + text':
          resolvedVariant = 'avatar-text';
          break;
        case 'icons':
          resolvedVariant = 'icons';
          break;
        case 'badge':
          resolvedVariant = 'badge';
          break;
        case 'actions':
          resolvedVariant = 'actions';
          break;
        case 'avatar group':
          resolvedVariant = 'avatar-group';
          break;
        case 'progress bar':
          resolvedVariant = 'progress';
          break;
        case 'rating':
          resolvedVariant = 'rating';
          break;
        case 'more menu':
          resolvedVariant = 'more-menu';
          if (resolvedAlign === undefined) {
            resolvedAlign = 'right';
          }
          break;
      }
    }
    const isSelected = selected ?? state === 'selected';
    return (
      <TableCell
        ref={ref}
        variant={resolvedVariant}
        align={resolvedAlign}
        selected={isSelected}
        {...props}
      />
    );
  }
);
ContentCell.displayName = 'ContentCell';

// ─── Composed Data Table Implementation ───────────────────────────────────────

function isTableCellElement(element: React.ReactNode): boolean {
  if (!React.isValidElement(element)) return false;
  const type = element.type;
  if (typeof type === 'string') return type === 'td' || type === 'th';
  if (
    type === TableCell ||
    type === LeadingCell ||
    type === ContentCell ||
    type === TextCell ||
    type === TextStackCell ||
    type === AvatarCell ||
    type === AvatarGroupCell ||
    type === ControlCell ||
    type === BadgeCell ||
    type === ChipCell ||
    type === ProgressCell ||
    type === ActionCell ||
    type === MoreMenuCell ||
    type === IconsCell
  ) {
    return true;
  }
  const displayName = typeof type === 'function' ? (type as { displayName?: string }).displayName : undefined;
  return (
    displayName === 'TableCell' ||
    displayName === 'LeadingCell' ||
    displayName === 'ContentCell'
  );
}

export interface ColumnFilterValue {
  text?: string;
  min?: string | number;
  max?: string | number;
  startDate?: string;
  endDate?: string;
  options?: string[];
}

export interface ColumnDef<T> {
  header: React.ReactNode;
  accessorKey?: keyof T;
  id?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  filterType?: ColumnMenuFilterType;
  filterTitle?: string;
  filterOptions?: ColumnMenuOption[];
  hasColumnMenu?: boolean;
  onFilterChange?: (filterValue: unknown) => void;
  cell?: (info: { row: T; getValue: () => unknown; index: number }) => React.ReactNode;
}

export interface TableProps<T = Record<string, unknown>> extends React.TableHTMLAttributes<HTMLTableElement> {
  data?: T[];
  columns?: ColumnDef<T>[];
  pagination?: boolean;
  defaultPageSize?: number;
  pageSize?: number;
  totalItems?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  paginationProps?: Partial<PaginationProps>;
  variant?: 'striped' | 'default';
  density?: 'default' | 'compact';
  emptyMessage?: React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  selectable?: boolean;
  selectedRowKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  getRowId?: (row: T, index: number) => string;
}

export function Table<T extends object = Record<string, unknown>>({
  data,
  columns,
  pagination = false,
  defaultPageSize = 10,
  pageSize: controlledPageSize,
  totalItems: controlledTotalItems,
  currentPage: controlledCurrentPage,
  onPageChange: controlledOnPageChange,
  paginationProps,
  variant = 'default',
  density = 'default',
  emptyMessage,
  emptyTitle = 'No Data Available',
  emptyDescription = 'There is currently no data to display.',
  selectable = false,
  selectedRowKeys = [],
  onSelectionChange,
  getRowId,
  className = '',
  children,
  ...props
}: TableProps<T>) {
  // Internal pagination state (if not controlled externally)
  const [internalPage, setInternalPage] = useState(1);
  const activePage = controlledCurrentPage ?? internalPage;
  const pageSize = controlledPageSize ?? defaultPageSize;

  // Sorting state
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<TableSortDirection>('none');

  // Column Menu & Filtering state
  const [openMenuColumnKey, setOpenMenuColumnKey] = useState<string | null>(null);
  const [columnFilters, setColumnFilters] = useState<Record<string, ColumnFilterValue>>({});

  // Close column menu when clicking outside or pressing Escape
  useEffect(() => {
    if (!openMenuColumnKey) return;
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('.fmdqui-table-header-cell__menu-popover')) {
        return;
      }
      if (target?.closest('.fmdqui-table-header-cell__sort-btn')) {
        return;
      }
      setOpenMenuColumnKey(null);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenuColumnKey(null);
      }
    };

    document.addEventListener('pointerdown', handleDocumentClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handleDocumentClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openMenuColumnKey]);

  // Helper for row ID
  const resolveRowId = (row: T, index: number): string => {
    if (getRowId) return getRowId(row, index);
    if ('id' in row && row.id) return String(row.id);
    return String(index);
  };

  // Filtered data based on column filters
  const filteredData = useMemo(() => {
    if (!data || !columns) return data ?? [];
    const activeFilterEntries = Object.entries(columnFilters).filter(([, filterVal]) => {
      if (!filterVal) return false;
      if (typeof filterVal.text === 'string' && filterVal.text.trim()) return true;
      if (Array.isArray(filterVal.options) && filterVal.options.length > 0) return true;
      if ((filterVal.min !== undefined && filterVal.min !== '') || (filterVal.max !== undefined && filterVal.max !== '')) return true;
      if (filterVal.startDate || filterVal.endDate) return true;
      return false;
    });

    if (activeFilterEntries.length === 0) return data;

    return data.filter((row) => {
      return activeFilterEntries.every(([colKey, filterVal]) => {
        const colDef = columns.find(c => (c.accessorKey as string) === colKey || c.id === colKey);
        const cellVal = colDef?.accessorKey
          ? (row as Record<string, unknown>)[colDef.accessorKey as string]
          : (row as Record<string, unknown>)[colKey];
        const cellString = cellVal !== undefined && cellVal !== null ? String(cellVal).toLowerCase() : '';

        // Text filter
        if (typeof filterVal.text === 'string' && filterVal.text.trim()) {
          const query = filterVal.text.trim().toLowerCase();
          if (!cellString.includes(query)) return false;
        }

        // Options filter
        if (Array.isArray(filterVal.options) && filterVal.options.length > 0) {
          const matched = filterVal.options.some((optId: string) => {
            const opt = colDef?.filterOptions?.find(o => o.id === optId);
            const optLabel = opt ? opt.label.toLowerCase() : optId.toLowerCase();
            return cellString.includes(optLabel) || cellString.includes(optId.toLowerCase());
          });
          if (!matched) return false;
        }

        // Range filter
        if ((filterVal.min !== undefined && filterVal.min !== '') || (filterVal.max !== undefined && filterVal.max !== '')) {
          const numVal = typeof cellVal === 'number' ? cellVal : parseFloat(String(cellVal).replace(/[^0-9.-]+/g, ''));
          if (!isNaN(numVal)) {
            if (filterVal.min !== undefined && filterVal.min !== '') {
              const min = parseFloat(String(filterVal.min).replace(/[^0-9.-]+/g, ''));
              if (!isNaN(min) && numVal < min) return false;
            }
            if (filterVal.max !== undefined && filterVal.max !== '') {
              const max = parseFloat(String(filterVal.max).replace(/[^0-9.-]+/g, ''));
              if (!isNaN(max) && numVal > max) return false;
            }
          }
        }

        return true;
      });
    });
  }, [data, columns, columnFilters]);

  // Sorted and Paginated Data
  const sortedData = useMemo(() => {
    if (!filteredData || !sortKey || sortDir === 'none') return filteredData ?? [];
    return [...filteredData].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortKey];
      const bVal = (b as Record<string, unknown>)[sortKey];
      if (aVal === bVal) return 0;
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;
      const compare = (aVal as number | string) < (bVal as number | string) ? -1 : 1;
      return sortDir === 'asc' ? compare : -compare;
    });
  }, [filteredData, sortKey, sortDir]);

  const totalItems = controlledTotalItems ?? (filteredData.length);
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  const paginatedData = useMemo(() => {
    if (!pagination || controlledCurrentPage !== undefined) return sortedData;
    const startIdx = (activePage - 1) * pageSize;
    return sortedData.slice(startIdx, startIdx + pageSize);
  }, [sortedData, pagination, controlledCurrentPage, activePage, pageSize]);

  // If using as a manual compound component without data/columns props
  if (!data || !columns) {
    return (
      <TableContainer>
        <div className="fmdqui-table-scroll-wrapper">
          <TableElement variant={variant} density={density} className={className} {...props}>
            {children}
          </TableElement>
        </div>
      </TableContainer>
    );
  }

  // Handle sorting
  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDir === 'asc') setSortDir('desc');
      else if (sortDir === 'desc') {
        setSortDir('none');
        setSortKey(null);
      } else {
        setSortDir('asc');
      }
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (controlledOnPageChange) {
      controlledOnPageChange(newPage);
    } else {
      setInternalPage(newPage);
    }
  };

  // Selection logic
  const allCurrentRowIds = paginatedData.map((row, idx) => resolveRowId(row, idx));
  const isAllSelected =
    allCurrentRowIds.length > 0 &&
    allCurrentRowIds.every((id) => selectedRowKeys.includes(id));
  const isPartiallySelected =
    allCurrentRowIds.some((id) => selectedRowKeys.includes(id)) && !isAllSelected;

  const toggleSelectAll = () => {
    if (!onSelectionChange) return;
    if (isAllSelected) {
      onSelectionChange(selectedRowKeys.filter((id) => !allCurrentRowIds.includes(id)));
    } else {
      const combined = Array.from(new Set([...selectedRowKeys, ...allCurrentRowIds]));
      onSelectionChange(combined);
    }
  };

  const toggleSelectRow = (id: string) => {
    if (!onSelectionChange) return;
    if (selectedRowKeys.includes(id)) {
      onSelectionChange(selectedRowKeys.filter((k) => k !== id));
    } else {
      onSelectionChange([...selectedRowKeys, id]);
    }
  };

  const totalColSpan = columns.length + (selectable ? 1 : 0);
  const hasFooter = pagination && totalPages > 1;

  return (
    <TableContainer className={openMenuColumnKey ? 'fmdqui-table-container--has-open-menu' : ''}>
      <div className="fmdqui-table-scroll-wrapper">
        <TableElement
          variant={variant}
          density={density}
          className={[hasFooter ? 'fmdqui-table--with-footer' : '', className].filter(Boolean).join(' ')}
          {...props}
        >
          <TableHead>
            <TableRow>
              {selectable && (
                <TableHeaderCell
                  checkbox
                  checked={isAllSelected}
                  indeterminate={isPartiallySelected}
                  onCheckboxChange={toggleSelectAll}
                  style={{ width: '48px' }}
                />
              )}
              {columns.map((col, idx) => {
                const columnKey = (col.accessorKey as string) || col.id || String(idx);
                const isColumnSorted = sortKey === columnKey;
                const columnHasMenu = col.hasColumnMenu ?? (col.sortable !== undefined || !!col.filterType);
                const isMenuOpen = openMenuColumnKey === columnKey;

                return (
                  <TableHeaderCell
                    key={columnKey}
                    align={col.align}
                    sortable={col.sortable}
                    sortDirection={isColumnSorted ? sortDir : 'none'}
                    hasColumnMenu={columnHasMenu}
                    isMenuOpen={isMenuOpen}
                    onSort={col.sortable && !columnHasMenu ? () => handleSort(columnKey) : undefined}
                    onMenuToggle={columnHasMenu ? () => {
                      setOpenMenuColumnKey(isMenuOpen ? null : columnKey);
                    } : undefined}
                    columnMenu={columnHasMenu ? (
                      <ColumnMenu
                        filter={col.filterType ?? 'text'}
                        filterTitle={col.filterTitle ?? (typeof col.header === 'string' ? col.header : 'Filter')}
                        sortDirection={isColumnSorted ? (sortDir === 'asc' ? 'asc' : sortDir === 'desc' ? 'desc' : 'none') : 'none'}
                        onSortAscending={() => {
                          setSortKey(columnKey);
                          setSortDir('asc');
                        }}
                        onSortDescending={() => {
                          setSortKey(columnKey);
                          setSortDir('desc');
                        }}
                        textValue={columnFilters[columnKey]?.text ?? ''}
                        onTextChange={(val) => {
                          setColumnFilters(prev => ({ ...prev, [columnKey]: { ...prev[columnKey], text: val } }));
                          col.onFilterChange?.(val);
                        }}
                        minValue={columnFilters[columnKey]?.min ?? ''}
                        maxValue={columnFilters[columnKey]?.max ?? ''}
                        onMinChange={(val) => {
                          setColumnFilters(prev => ({ ...prev, [columnKey]: { ...prev[columnKey], min: val } }));
                          col.onFilterChange?.({ min: val, max: columnFilters[columnKey]?.max });
                        }}
                        onMaxChange={(val) => {
                          setColumnFilters(prev => ({ ...prev, [columnKey]: { ...prev[columnKey], max: val } }));
                          col.onFilterChange?.({ min: columnFilters[columnKey]?.min, max: val });
                        }}
                        startDate={columnFilters[columnKey]?.startDate ?? ''}
                        endDate={columnFilters[columnKey]?.endDate ?? ''}
                        onStartDateChange={(val) => {
                          setColumnFilters(prev => ({ ...prev, [columnKey]: { ...prev[columnKey], startDate: val } }));
                          col.onFilterChange?.({ startDate: val, endDate: columnFilters[columnKey]?.endDate });
                        }}
                        onEndDateChange={(val) => {
                          setColumnFilters(prev => ({ ...prev, [columnKey]: { ...prev[columnKey], endDate: val } }));
                          col.onFilterChange?.({ startDate: columnFilters[columnKey]?.startDate, endDate: val });
                        }}
                        options={col.filterOptions}
                        selectedOptions={columnFilters[columnKey]?.options ?? []}
                        onOptionToggle={(optId, checked) => {
                          const current = columnFilters[columnKey]?.options ?? [];
                          const updated = checked ? [...current, optId] : current.filter((id: string) => id !== optId);
                          setColumnFilters(prev => ({ ...prev, [columnKey]: { ...prev[columnKey], options: updated } }));
                          col.onFilterChange?.(updated);
                        }}
                        onClear={() => {
                          setColumnFilters(prev => {
                            const next = { ...prev };
                            delete next[columnKey];
                            return next;
                          });
                          if (sortKey === columnKey) {
                            setSortKey(null);
                            setSortDir('none');
                          }
                          col.onFilterChange?.(null);
                        }}
                        onApply={() => {
                          setOpenMenuColumnKey(null);
                        }}
                      />
                    ) : undefined}
                  >
                    {col.header}
                  </TableHeaderCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => {
                const rowId = resolveRowId(row, rowIndex);
                const isSelected = selectedRowKeys.includes(rowId);

                return (
                  <TableRow key={rowId} selected={isSelected}>
                    {selectable && (
                      <TableCell
                        variant="control"
                        controlType="checkbox"
                        controlChecked={isSelected}
                        onControlChange={() => toggleSelectRow(rowId)}
                        style={{ width: '48px' }}
                      />
                    )}
                    {columns.map((col, colIndex) => {
                      const colId = col.id || (col.accessorKey as string) || String(colIndex);
                      const value = col.accessorKey
                        ? (row as Record<string, unknown>)[col.accessorKey as string]
                        : undefined;
                      const rendered = col.cell
                        ? col.cell({ row, getValue: () => value, index: rowIndex })
                        : (value as React.ReactNode);

                      // Avoid nested <td> if rendered is already a TableCell atom
                      if (isTableCellElement(rendered)) {
                        const cellElem = rendered as React.ReactElement<{ align?: 'left' | 'center' | 'right' }>;
                        return React.cloneElement(cellElem, {
                          key: colId,
                          align: cellElem.props.align ?? col.align,
                        });
                      }

                      return (
                        <TableCell key={colId} align={col.align}>
                          {rendered}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow hoverable={false}>
                <TableCell colSpan={totalColSpan} className="fmdqui-table-empty">
                  {emptyMessage ?? (
                    <>
                      <div className="fmdqui-table-empty__title">{emptyTitle}</div>
                      <div className="fmdqui-table-empty__desc">{emptyDescription}</div>
                    </>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableElement>
      </div>

      {hasFooter && (
        <div className="fmdqui-table-footer">
          <Pagination
            currentPage={activePage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            variation="2"
            buttonType="single buttons"
            orientation="full width"
            hasTopDivider={false}
            hasLeftStroke={false}
            hasRightStroke={false}
            hasBottomStroke={false}
            {...paginationProps}
          />
        </div>
      )}
    </TableContainer>
  );
}
