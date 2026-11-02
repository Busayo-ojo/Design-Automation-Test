import React, { useState, useMemo, forwardRef } from 'react';
import './Table.css';
import { Checkbox, Radio, Switch } from '../../elements/FormControl';
import { Avatar, type AvatarSize } from '../../elements/Avatar';
import { Badge, type BadgeColor, type BadgeType } from '../../elements/Badge';
import { Chip } from '../../elements/Chip';
import { Pagination } from '../Pagination';

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

const DotsVerticalIcon = () => (
  <Icon name="dots-v" variant="linear" size={16} />
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
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const checkboxRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      if (checkboxRef.current && indeterminate !== undefined) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const showSortIcon = sortable || trailingIcon;

    const classes = [
      'fmdqui-table-header-cell',
      `fmdqui-table-header-cell--align-${align}`,
      state === 'hover' ? 'fmdqui-table-header-cell--state-hover' : '',
      state === 'selected' ? 'fmdqui-table-header-cell--state-selected' : '',
      !hasSeparator ? 'fmdqui-table-header-cell--no-separator' : '',
      className,
    ].filter(Boolean).join(' ');

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

          {sortable ? (
            <button
              type="button"
              className="fmdqui-table-header-cell__sort-btn"
              onClick={onSort}
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
        return (
          <button
            type="button"
            className="fmdqui-table-cell__more-menu-btn"
            onClick={onMenuClick}
            aria-label={menuAriaLabel}
          >
            <DotsVerticalIcon />
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

export const TextStackCell: React.FC<TableCellProps> = (props) => (
  <TableCell variant="text-stack" {...props} />
);

export const AvatarCell: React.FC<TableCellProps> = (props) => (
  <TableCell variant="avatar-text" {...props} />
);

export const AvatarGroupCell: React.FC<TableCellProps> = (props) => (
  <TableCell variant="avatar-group" {...props} />
);

export const ControlCell: React.FC<TableCellProps> = (props) => (
  <TableCell variant="control" {...props} />
);

export const BadgeCell: React.FC<TableCellProps> = (props) => (
  <TableCell variant="badge" {...props} />
);

export const ChipCell: React.FC<TableCellProps> = (props) => (
  <TableCell variant="chip" {...props} />
);

export const ProgressCell: React.FC<TableCellProps> = (props) => (
  <TableCell variant="progress" {...props} />
);

export const ActionCell: React.FC<TableCellProps> = (props) => (
  <TableCell variant="actions" {...props} />
);

export const MoreMenuCell: React.FC<TableCellProps> = (props) => (
  <TableCell variant="more-menu" {...props} />
);

export const IconsCell: React.FC<TableCellProps> = (props) => (
  <TableCell variant="icons" {...props} />
);

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
  ({ content, state, selected, ...props }, ref) => {
    let resolvedVariant = props.variant;
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
          break;
      }
    }
    const isSelected = selected ?? state === 'selected';
    return (
      <TableCell
        ref={ref}
        variant={resolvedVariant}
        selected={isSelected}
        {...props}
      />
    );
  }
);
ContentCell.displayName = 'ContentCell';

// ─── Composed Data Table Implementation ───────────────────────────────────────

export interface ColumnDef<T> {
  header: React.ReactNode;
  accessorKey?: keyof T;
  id?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
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
  variant = 'default',
  density = 'default',
  emptyMessage,
  emptyTitle = 'No results found',
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

  // Helper for row ID
  const resolveRowId = (row: T, index: number): string => {
    if (getRowId) return getRowId(row, index);
    if ('id' in row && row.id) return String(row.id);
    return String(index);
  };

  // Sorted and Paginated Data
  const sortedData = useMemo(() => {
    if (!data || !sortKey || sortDir === 'none') return data ?? [];
    return [...data].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortKey];
      const bVal = (b as Record<string, unknown>)[sortKey];
      if (aVal === bVal) return 0;
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;
      const compare = (aVal as number | string) < (bVal as number | string) ? -1 : 1;
      return sortDir === 'asc' ? compare : -compare;
    });
  }, [data, sortKey, sortDir]);

  const totalItems = controlledTotalItems ?? (data?.length ?? 0);
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

  return (
    <TableContainer>
      <div className="fmdqui-table-scroll-wrapper">
        <TableElement variant={variant} density={density} className={className} {...props}>
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
                return (
                  <TableHeaderCell
                    key={columnKey}
                    align={col.align}
                    sortable={col.sortable}
                    sortDirection={isColumnSorted ? sortDir : 'none'}
                    onSort={col.sortable ? () => handleSort(columnKey) : undefined}
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
                      const value = col.accessorKey
                        ? (row as Record<string, unknown>)[col.accessorKey as string]
                        : undefined;
                      return (
                        <TableCell
                          key={col.id || (col.accessorKey as string) || colIndex}
                          align={col.align}
                        >
                          {col.cell
                            ? col.cell({ row, getValue: () => value, index: rowIndex })
                            : (value as React.ReactNode)}
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

      {pagination && totalPages > 1 && (
        <div className="fmdqui-table-footer">
          <Pagination
            currentPage={activePage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            type="both"
            orientation="full width"
          />
        </div>
      )}
    </TableContainer>
  );
}
