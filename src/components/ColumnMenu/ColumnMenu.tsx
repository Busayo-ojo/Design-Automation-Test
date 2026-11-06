import React, { useState } from 'react';
import { DropdownMenuItem } from '../Dropdowns';
import { Input } from '../../elements/Input';
import { Checkbox } from '../../elements/FormControl';
import './ColumnMenu.css';

// ─── Types & Definitions (1:1 with Figma 11185:1015636) ──────────────────────

export type ColumnMenuFilterType = 'text' | 'range' | 'date' | 'options';

export interface ColumnMenuOption {
  id: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
}

export interface ColumnMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Filter type matching Figma variant: 'text' | 'range' | 'date' | 'options' */
  filter?: ColumnMenuFilterType;

  /** Title above the filter controls (default: 'Filter') */
  filterTitle?: string;

  /** Current active sort direction ('asc' | 'desc' | 'none') */
  sortDirection?: 'asc' | 'desc' | 'none';

  /** Callback fired when 'Sort ascending' is clicked */
  onSortAscending?: () => void;

  /** Callback fired when 'Sort descending' is clicked */
  onSortDescending?: () => void;

  // ── Text Filter Props ──
  textValue?: string;
  textPlaceholder?: string;
  onTextChange?: (value: string) => void;

  // ── Range Filter Props ──
  minPlaceholder?: string;
  maxPlaceholder?: string;
  minValue?: string | number;
  maxValue?: string | number;
  onMinChange?: (value: string) => void;
  onMaxChange?: (value: string) => void;

  // ── Date Filter Props ──
  startDatePlaceholder?: string;
  endDatePlaceholder?: string;
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (value: string) => void;
  onEndDateChange?: (value: string) => void;

  // ── Options Filter Props ──
  options?: ColumnMenuOption[];
  selectedOptions?: string[];
  onOptionToggle?: (id: string, checked: boolean) => void;

  // ── Action Buttons ──
  clearLabel?: string;
  applyLabel?: string;
  onClear?: () => void;
  onApply?: () => void;
}

export const ColumnMenu: React.FC<ColumnMenuProps> = ({
  filter = 'text',
  filterTitle = 'Filter',
  sortDirection = 'none',
  onSortAscending,
  onSortDescending,

  // Text
  textValue,
  textPlaceholder = 'Search...',
  onTextChange,

  // Range
  minPlaceholder = 'Min',
  maxPlaceholder = 'Max',
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,

  // Date
  startDatePlaceholder = 'From',
  endDatePlaceholder = 'To',
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,

  // Options
  options = [
    { id: '1', label: 'Option' },
    { id: '2', label: 'Option' },
    { id: '3', label: 'Option' },
  ],
  selectedOptions,
  onOptionToggle,

  // Actions
  clearLabel = 'Clear',
  applyLabel = 'Apply',
  onClear,
  onApply,

  className = '',
  children,
  ...props
}) => {
  // Local state fallbacks for uncontrolled usage
  const [internalText, setInternalText] = useState('');
  const [internalMin, setInternalMin] = useState('');
  const [internalMax, setInternalMax] = useState('');
  const [internalStart, setInternalStart] = useState('');
  const [internalEnd, setInternalEnd] = useState('');
  const [internalSelected, setInternalSelected] = useState<string[]>([]);

  const resolvedText = textValue ?? internalText;
  const resolvedMin = minValue !== undefined ? String(minValue) : internalMin;
  const resolvedMax = maxValue !== undefined ? String(maxValue) : internalMax;
  const resolvedStart = startDate ?? internalStart;
  const resolvedEnd = endDate ?? internalEnd;
  const resolvedSelected = selectedOptions ?? internalSelected;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = e.target.value;
    setInternalText(val);
    onTextChange?.(val);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = e.target.value;
    setInternalMin(val);
    onMinChange?.(val);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = e.target.value;
    setInternalMax(val);
    onMaxChange?.(val);
  };

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = e.target.value;
    setInternalStart(val);
    onStartDateChange?.(val);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = e.target.value;
    setInternalEnd(val);
    onEndDateChange?.(val);
  };

  const handleToggleOption = (id: string) => {
    const isChecked = resolvedSelected.includes(id);
    const next = isChecked ? resolvedSelected.filter((item) => item !== id) : [...resolvedSelected, id];
    setInternalSelected(next);
    onOptionToggle?.(id, !isChecked);
  };

  const handleClear = () => {
    setInternalText('');
    setInternalMin('');
    setInternalMax('');
    setInternalStart('');
    setInternalEnd('');
    setInternalSelected([]);
    onClear?.();
  };

  return (
    <div
      className={`fmdqui-column-menu fmdqui-column-menu--filter-${filter} ${className}`}
      role="menu"
      aria-label="Column menu"
      {...props}
    >
      {/* ── 1. Sort Section (Figma: Sort) ── */}
      <ul className="fmdqui-column-menu__sort" role="group" aria-label="Sort options">
        <DropdownMenuItem
          type="icon"
          iconName="arrow-up"
          menuText="Sort ascending"
          hasCommandMenu={false}
          hasCheckbox={false}
          state={sortDirection === 'asc' ? 'selected' : 'default'}
          onClick={onSortAscending}
        />
        <DropdownMenuItem
          type="icon"
          iconName="arrow-down"
          menuText="Sort descending"
          hasCommandMenu={false}
          hasCheckbox={false}
          state={sortDirection === 'desc' ? 'selected' : 'default'}
          onClick={onSortDescending}
        />
      </ul>

      {/* ── Divider ── */}
      <div className="fmdqui-column-menu__divider" role="separator" />

      {/* ── 2. Filter Section (Figma: Filter) ── */}
      <div className="fmdqui-column-menu__filter">
        {filterTitle && <div className="fmdqui-column-menu__filter-title">{filterTitle}</div>}

        {children ? (
          children
        ) : filter === 'text' ? (
          <div className="fmdqui-column-menu__filter-text">
            <Input
              size="sm"
              placeholder={textPlaceholder}
              value={resolvedText}
              onChange={handleTextChange}
              hasLabel={false}
              hasHelperText={false}
              aria-label={filterTitle}
            />
          </div>
        ) : filter === 'range' ? (
          <div className="fmdqui-column-menu__filter-range">
            <Input
              size="sm"
              placeholder={minPlaceholder}
              value={resolvedMin}
              onChange={handleMinChange}
              hasLabel={false}
              hasHelperText={false}
              aria-label={`${filterTitle} minimum`}
            />
            <Input
              size="sm"
              placeholder={maxPlaceholder}
              value={resolvedMax}
              onChange={handleMaxChange}
              hasLabel={false}
              hasHelperText={false}
              aria-label={`${filterTitle} maximum`}
            />
          </div>
        ) : filter === 'date' ? (
          <div className="fmdqui-column-menu__filter-date">
            <Input
              size="sm"
              placeholder={startDatePlaceholder}
              value={resolvedStart}
              onChange={handleStartChange}
              hasLabel={false}
              hasHelperText={false}
              aria-label={`${filterTitle} start date`}
            />
            <Input
              size="sm"
              placeholder={endDatePlaceholder}
              value={resolvedEnd}
              onChange={handleEndChange}
              hasLabel={false}
              hasHelperText={false}
              aria-label={`${filterTitle} end date`}
            />
          </div>
        ) : (
          <div className="fmdqui-column-menu__filter-options">
            {options.map((opt) => {
              const checked = opt.checked ?? resolvedSelected.includes(opt.id);
              return (
                <label key={opt.id} className="fmdqui-column-menu__option">
                  <Checkbox
                    checked={checked}
                    disabled={opt.disabled}
                    onChange={() => handleToggleOption(opt.id)}
                  />
                  <span className="fmdqui-column-menu__option-label">{opt.label}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Divider ── */}
      <div className="fmdqui-column-menu__divider" role="separator" />

      {/* ── 3. Actions Section (Figma: Actions) ── */}
      <div className="fmdqui-column-menu__actions">
        <button
          type="button"
          className="fmdqui-column-menu__action-btn fmdqui-column-menu__action-btn--clear"
          onClick={handleClear}
        >
          {clearLabel}
        </button>
        <button
          type="button"
          className="fmdqui-column-menu__action-btn fmdqui-column-menu__action-btn--apply"
          onClick={onApply}
        >
          {applyLabel}
        </button>
      </div>
    </div>
  );
};

