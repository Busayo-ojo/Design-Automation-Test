import React, { forwardRef, useCallback, useMemo, useState, type ReactNode } from 'react';
import { Icon } from '../../foundations/icons';
import { Button } from '../../elements/Button';
import { Chip } from '../../elements/Chip';
import {
  WEEKDAYS,
  MONTH_NAMES,
  DEFAULT_MONTHS,
  DEFAULT_YEARS,
  buildMonthCells,
  formatMonthYear,
  type DateSelectorCellState,
  type DateSelectorCellPosition,
  type DateSelectorType,
  type DateCellSpec,
} from './dateUtils';
import './Calendar.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Calendar & Date Selectors — built 1:1 from the Figma page
   "✤ Calendar & Date Selectors ⚜️" (file Hq7luvf787VJlCj1d3YJYw)

   Layered exactly as Figma organises it:

     ELEMENTS   (frame "Calender & Date Selectors" 6334:23891)
       DateSelectorCell    ← Date            COMPONENT_SET 6335:28092 (10 variants)
       DateSelectorHeader  ← Month & Year    COMPONENT_SET 6335:28189 (1 variant)

     NESTED
       DateGrid            ← "Dates" frame (7 columns × up to 6 rows)
       MonthYearPanel      ← Month / Year chip sections

     FULL       (frame "Calender & Date Selectors" 6360:4035)
       DateSelector / Calendar ← Calendar    COMPONENT_SET 6335:28236 (3 variants)

   Reuse (rules/FIGMA_STORYBOOK_RULES.md §0): the CTAs are the existing Button
   element, the month/year pills are the existing Chip element, and every icon
   comes from foundations/icons. None of their markup is re-implemented.
   ═══════════════════════════════════════════════════════════════════════════ */

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(' ');

const slug = (s: string) => s.replace(/[^a-z0-9]+/g, '-');

/* ═══════════════════════════════════════════════════════════════════════════
   ELEMENT — DateSelectorCell
   Figma: Date (COMPONENT_SET 6335:28092) · 38×38 (72×38 for Last Day) · r10

   Text is DM Sans 12px / 145% / -4%, Regular in `default` + `disabled` and
   SemiBold in both selected states.

   State  →  default         1px neutral-100 border, no fill, neutral-black text
             disabled        --color-date-cell-disabled fill, neutral-300 text
             single selected primary-50 fill + 1.5px primary-400 ring
             multi-selected  primary-50 fill; the ring appears only on the
                             `start` and `end` positions, not the mid ones.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface DateSelectorCellProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Figma `State` variant */
  state?: DateSelectorCellState;
  /** Figma `Position` variant — drives the range ring and the Last Day width */
  position?: DateSelectorCellPosition;
  /** Figma `Day` TEXT property. Figma default: "4" */
  day?: ReactNode;
  /** Figma `Show Today` BOOLEAN — a 4px primary-400 dot under the number */
  showToday?: boolean;
  /** Figma `Show Status` BOOLEAN — a 10px bold success check-circle */
  showStatus?: boolean;
}

export const DateSelectorCell = forwardRef<HTMLButtonElement, DateSelectorCellProps>(
  (
    {
      state = 'default',
      position = 'start',
      day = '4',
      showToday = false,
      showStatus = false,
      className,
      disabled,
      ...rest
    },
    ref
  ) => (
    <button
      ref={ref}
      type="button"
      disabled={disabled ?? state === 'disabled'}
      aria-pressed={
        state === 'single selected' || state === 'multi-selected' ? true : undefined
      }
      className={cx(
        'fmdqui-dateselectors-cell',
        `fmdqui-dateselectors-cell--${slug(state)}`,
        `fmdqui-dateselectors-cell--pos-${slug(position)}`,
        className
      )}
      {...rest}
    >
      <span className="fmdqui-dateselectors-cell__day">{day}</span>
      {showToday && <span className="fmdqui-dateselectors-cell__today" aria-hidden="true" />}
      {showStatus && (
        <span className="fmdqui-dateselectors-cell__status" aria-hidden="true">
          <Icon name="check-circle" variant="bold" size={10} />
        </span>
      )}
    </button>
  )
);

DateSelectorCell.displayName = 'DateSelectorCell';

/* ═══════════════════════════════════════════════════════════════════════════
   ELEMENT — DateSelectorHeader
   Figma: Month & Year (COMPONENT_SET 6335:28189) · 270×71 · VERTICAL gap 8

   Header row  — SPACE_BETWEEN
     left   label DM Sans SemiBold 16px neutral-black + chevron (16px, primary-400)
     right  chevron-left / chevron-right (20px, primary-400), gap 6
   Weekday row — 7 × 40×40, DM Sans SemiBold 12px neutral-black, SPACE_BETWEEN

   The chevron beside the label is `chevron-down` when collapsed and
   `chevron-up` when the month & year picker is open — two different icons in
   Figma, not a rotation.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface DateSelectorHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label text. Figma default: "July 2026" */
  monthYear?: ReactNode;
  /** Chevron direction — `true` renders chevron-up (picker open) */
  expanded?: boolean;
  /** Show the label + nav row. Hidden in the "Date Picker + Last Day" variant. */
  showHeader?: boolean;
  /** Show the weekday row. Hidden in the "Month & Year Picker" variant. */
  showWeekdays?: boolean;
  /** Weekday labels, Monday-first as in Figma */
  weekdays?: readonly string[];
  onPrev?: () => void;
  onNext?: () => void;
  /** Fired by the label / chevron — toggles the month & year picker */
  onToggle?: () => void;
}

export const DateSelectorHeader: React.FC<DateSelectorHeaderProps> = ({
  monthYear = 'July 2026',
  expanded = false,
  showHeader = true,
  showWeekdays = true,
  weekdays = WEEKDAYS,
  onPrev,
  onNext,
  onToggle,
  className,
  ...rest
}) => (
  <div className={cx('fmdqui-dateselectors-header', className)} {...rest}>
    {showHeader && (
      <div className="fmdqui-dateselectors-header__bar">
        <button
          type="button"
          className="fmdqui-dateselectors-header__label"
          onClick={onToggle}
          aria-expanded={expanded}
        >
          <span>{monthYear}</span>
          <Icon name={expanded ? 'chevron-up' : 'chevron-down'} variant="linear" size={16} />
        </button>
        <div className="fmdqui-dateselectors-header__nav">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous month"
            className="fmdqui-dateselectors-header__nav-btn"
          >
            <Icon name="chevron-left" variant="linear" size={20} />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next month"
            className="fmdqui-dateselectors-header__nav-btn"
          >
            <Icon name="chevron-right" variant="linear" size={20} />
          </button>
        </div>
      </div>
    )}

    {showWeekdays && (
      <div className="fmdqui-dateselectors-header__weekdays" role="row">
        {weekdays.map((d) => (
          <span key={d} className="fmdqui-dateselectors-header__weekday" role="columnheader">
            {d}
          </span>
        ))}
      </div>
    )}
  </div>
);

DateSelectorHeader.displayName = 'DateSelectorHeader';

/* ═══════════════════════════════════════════════════════════════════════════
   NESTED — DateGrid
   Figma: "Dates" frame — 7 columns laid out SPACE_BETWEEN with an 8px row gap.
   The Date Picker variant uses a 4px column gap; the Last Day variant uses 0.
   ═══════════════════════════════════════════════════════════════════════════ */

export type DateGridCell = DateCellSpec &
  Omit<DateSelectorCellProps, 'day' | 'state' | 'position' | 'showToday' | 'showStatus'>;

export interface DateGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cells?: DateGridCell[];
  /** Figma column gap — 4 on Date Picker, 0 on Date Picker + Last Day */
  columnGap?: number;
  children?: ReactNode;
}

export const DateGrid: React.FC<DateGridProps> = ({
  cells,
  columnGap = 4,
  children,
  className,
  style,
  ...rest
}) => (
  <div
    role="grid"
    className={cx('fmdqui-dateselectors-grid', className)}
    style={{ columnGap: `${columnGap}px`, ...style }}
    {...rest}
  >
    {children ??
      cells?.map((cell, i) => {
        const { key, ...cellProps } = cell;
        return <DateSelectorCell key={key ?? i} {...cellProps} />;
      })}
  </div>
);

DateGrid.displayName = 'DateGrid';

/* ═══════════════════════════════════════════════════════════════════════════
   NESTED — MonthYearPanel
   Figma: the Month and Year sections inside Type=Month & Year Picker.
   Each section is a SPACE_BETWEEN header (Bold 12px label + 16px nav chevrons)
   above a row of Chips with an 8px gap. The two sections are 32px apart.
   Chips are the existing element: Type=Input, state default / focused.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface MonthYearSectionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Section label — Figma uses "Month" and "Year" */
  label: string;
  /** Option labels rendered as Chips */
  options: string[];
  /** Currently selected option — renders the Chip in `focused` state */
  selected?: string;
  onSelect?: (value: string) => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export const MonthYearSection: React.FC<MonthYearSectionProps> = ({
  label,
  options,
  selected,
  onSelect,
  onPrev,
  onNext,
  className,
  ...rest
}) => (
  <div className={cx('fmdqui-dateselectors-section', className)} {...rest}>
    <div className="fmdqui-dateselectors-section__bar">
      <span className="fmdqui-dateselectors-section__label">{label}</span>
      <div className="fmdqui-dateselectors-section__nav">
        <button
          type="button"
          onClick={onPrev}
          aria-label={`Previous ${label.toLowerCase()}`}
          className="fmdqui-dateselectors-header__nav-btn"
        >
          <Icon name="chevron-left" variant="linear" size={16} />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label={`Next ${label.toLowerCase()}`}
          className="fmdqui-dateselectors-header__nav-btn"
        >
          <Icon name="chevron-right" variant="linear" size={16} />
        </button>
      </div>
    </div>
    <div className="fmdqui-dateselectors-section__chips">
      {options.map((opt) => (
        <Chip
          key={opt}
          label={opt}
          type="Input"
          state={opt === selected ? 'focused' : 'default'}
          hasCloseButton={opt === selected}
          onClick={() => onSelect?.(opt)}
        />
      ))}
    </div>
  </div>
);

MonthYearSection.displayName = 'MonthYearSection';

export interface MonthYearPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  months?: string[];
  years?: string[];
  selectedMonth?: string;
  selectedYear?: string;
  onSelectMonth?: (m: string) => void;
  onSelectYear?: (y: string) => void;
  onPrevMonths?: () => void;
  onNextMonths?: () => void;
  onPrevYears?: () => void;
  onNextYears?: () => void;
}

export const MonthYearPanel: React.FC<MonthYearPanelProps> = ({
  months = DEFAULT_MONTHS,
  years = DEFAULT_YEARS,
  selectedMonth = 'March',
  selectedYear = '2019',
  onSelectMonth,
  onSelectYear,
  onPrevMonths,
  onNextMonths,
  onPrevYears,
  onNextYears,
  className,
  ...rest
}) => (
  <div className={cx('fmdqui-dateselectors-panel', className)} {...rest}>
    <MonthYearSection
      label="Month"
      options={months}
      selected={selectedMonth}
      onSelect={onSelectMonth}
      onPrev={onPrevMonths}
      onNext={onNextMonths}
    />
    <MonthYearSection
      label="Year"
      options={years}
      selected={selectedYear}
      onSelect={onSelectYear}
      onPrev={onPrevYears}
      onNext={onNextYears}
    />
  </div>
);

MonthYearPanel.displayName = 'MonthYearPanel';

/* ═══════════════════════════════════════════════════════════════════════════
   FULL — DateSelector
   Figma: Calendar (COMPONENT_SET 6335:28236) · 300 wide · VERTICAL gap 32

   Type=Date Picker              header + weekdays + 7×6 grid (col gap 4) + CTAs
   Type=Date Picker + Last Day   weekdays only (header hidden), col gap 0, a
                                 double-width "Last Day" cell, and no CTAs
   Type=Month & Year Picker      header only (weekdays hidden) + Month/Year
                                 chip sections + CTAs

   `Show CTA(s)` is a Figma BOOLEAN; the CTAs are the existing Button element
   (text "Cancel" and primary "Done", both size="lg", 142px each).
   ═══════════════════════════════════════════════════════════════════════════ */

export interface DateSelectorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Figma `Type` variant */
  type?: DateSelectorType;
  /** Figma `Show CTA(s)` BOOLEAN property */
  showCtas?: boolean;
  /** Year shown in the grid. Figma's reference month is July 2026. */
  year?: number;
  /** 0-based month index */
  monthIndex?: number;
  /** Day-of-month rendered `single selected` */
  selected?: number;
  /** Inclusive day range rendered `multi-selected` */
  range?: { from: number; to: number };
  /** Day flagged with the `Show Today` dot */
  today?: number;
  /** Days flagged with the `Show Status` check-circle */
  statusDays?: number[];
  /** Label for the double-width final cell. Figma: "Last Day" */
  lastDayLabel?: string;
  /** Override the header label; defaults to the month and year */
  monthYearLabel?: ReactNode;
  months?: string[];
  years?: string[];
  selectedMonth?: string;
  selectedYear?: string;
  cancelLabel?: string;
  doneLabel?: string;
  onCancel?: () => void;
  onDone?: () => void;
  /** Fired with the day-of-month when a date cell is clicked */
  onSelectDate?: (day: number) => void;
  onPrev?: () => void;
  onNext?: () => void;
  /** Fired by the header label / chevron — switches to the month & year picker */
  onToggleView?: () => void;
  onSelectMonth?: (month: string) => void;
  onSelectYear?: (year: string) => void;
  onPrevMonths?: () => void;
  onNextMonths?: () => void;
  onPrevYears?: () => void;
  onNextYears?: () => void;
}

export const DateSelector = forwardRef<HTMLDivElement, DateSelectorProps>(
  (
    {
      type = 'date picker',
      showCtas,
      year = 2026,
      monthIndex = 6, // July — Figma's reference month
      selected,
      range,
      today,
      statusDays,
      lastDayLabel = 'Last Day',
      monthYearLabel,
      months,
      years,
      selectedMonth,
      selectedYear,
      cancelLabel = 'Cancel',
      doneLabel = 'Done',
      onCancel,
      onDone,
      onSelectDate,
      onPrev,
      onNext,
      onToggleView,
      onSelectMonth,
      onSelectYear,
      onPrevMonths,
      onNextMonths,
      onPrevYears,
      onNextYears,
      className,
      ...rest
    },
    ref
  ) => {
    const isLastDay = type === 'date picker + last day';
    const isMonthYear = type === 'month & year picker';
    // Figma's Last Day variant has no button frame at all.
    const ctas = showCtas ?? !isLastDay;

    const cells = useMemo(
      () => buildMonthCells({ year, monthIndex, selected, range, today, statusDays }),
      [year, monthIndex, selected, range, today, statusDays]
    );

    // The Last Day variant replaces the final real day with a double-width cell.
    const gridCells: DateGridCell[] = useMemo(() => {
      if (!isLastDay) return cells;
      const out = cells.filter((c) => !String(c.key).startsWith('trail-'));
      const lastIdx = out.map((c) => String(c.key).startsWith('d-')).lastIndexOf(true);
      if (lastIdx >= 0) {
        out[lastIdx] = { ...out[lastIdx], day: lastDayLabel, position: 'last day' };
      }
      return out;
    }, [cells, isLastDay, lastDayLabel]);

    return (
      <div
        ref={ref}
        className={cx(
          'fmdqui-dateselectors',
          `fmdqui-dateselectors--${slug(type)}`,
          className
        )}
        {...rest}
      >
        <div className="fmdqui-dateselectors__body">
          <DateSelectorHeader
            monthYear={monthYearLabel ?? formatMonthYear(year, monthIndex)}
            expanded={isMonthYear}
            showHeader={!isLastDay}
            showWeekdays={!isMonthYear}
            onPrev={onPrev}
            onNext={onNext}
            onToggle={onToggleView}
          />

          {isMonthYear ? (
            <MonthYearPanel
              months={months}
              years={years}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              onSelectMonth={onSelectMonth}
              onSelectYear={onSelectYear}
              onPrevMonths={onPrevMonths}
              onNextMonths={onNextMonths}
              onPrevYears={onPrevYears}
              onNextYears={onNextYears}
            />
          ) : (
            <DateGrid
              columnGap={isLastDay ? 0 : 4}
              cells={gridCells.map((c) => ({
                ...c,
                onClick: () => {
                  const n = Number(String(c.key).replace('d-', ''));
                  if (!Number.isNaN(n)) onSelectDate?.(n);
                },
              }))}
            />
          )}
        </div>

        {ctas && (
          <div className="fmdqui-dateselectors__ctas">
            <Button variant="text" size="lg" onClick={onCancel}>
              {cancelLabel}
            </Button>
            <Button variant="primary" size="lg" onClick={onDone}>
              {doneLabel}
            </Button>
          </div>
        )}
      </div>
    );
  }
);

DateSelector.displayName = 'DateSelector';


/* ═══════════════════════════════════════════════════════════════════════════
   Interactive wrapper — the behaviour layer.

   The components above stay presentational so every Figma variant can be
   rendered exactly. This adds real selection on top:

     · single or range date selection
     · month navigation via the header chevrons
     · the month & year picker, opened from the header label, with its own
       paging chevrons (Figma shows 4 months and 5 years at a time)
   ═══════════════════════════════════════════════════════════════════════════ */

export type DateSelectionMode = 'single' | 'range';

export interface DateRange {
  from: number;
  to: number;
}

export interface InteractiveDateSelectorProps
  extends Omit<
    DateSelectorProps,
    | 'year' | 'monthIndex' | 'selected' | 'range' | 'onSelectDate' | 'onChange'
    | 'onPrev' | 'onNext' | 'onToggleView' | 'onSelectMonth' | 'onSelectYear'
    | 'onPrevMonths' | 'onNextMonths' | 'onPrevYears' | 'onNextYears'
    | 'months' | 'years' | 'selectedMonth' | 'selectedYear' | 'monthYearLabel'
  > {
  /** `single` picks one date; `range` picks a start then an end */
  selectionMode?: DateSelectionMode;
  defaultYear?: number;
  defaultMonthIndex?: number;
  defaultSelected?: number;
  defaultRange?: DateRange;
  /** Fired when a single date is picked */
  onChange?: (value: { year: number; monthIndex: number; day: number }) => void;
  /** Fired when both ends of a range are set */
  onRangeChange?: (value: { year: number; monthIndex: number } & DateRange) => void;
}

/** Figma pages the month list four at a time and the year list five at a time. */
const MONTH_PAGE_SIZE = 4;
const YEAR_PAGE_SIZE = 5;

export const InteractiveDateSelector: React.FC<InteractiveDateSelectorProps> = ({
  selectionMode = 'single',
  defaultYear = 2026,
  defaultMonthIndex = 6,
  defaultSelected,
  defaultRange,
  onChange,
  onRangeChange,
  type = 'date picker',
  ...rest
}) => {
  const [year, setYear] = useState(defaultYear);
  const [monthIndex, setMonthIndex] = useState(defaultMonthIndex);
  const [selected, setSelected] = useState<number | undefined>(defaultSelected);
  const [range, setRange] = useState<DateRange | undefined>(defaultRange);
  /** First click of a range, before the second end is chosen. */
  const [pendingFrom, setPendingFrom] = useState<number | undefined>();
  /** Which face is showing — the grid or the month & year picker. */
  const [picking, setPicking] = useState(type === 'month & year picker');
  const [monthPage, setMonthPage] = useState(0);
  const [yearPage, setYearPage] = useState(0);

  const stepMonth = useCallback((delta: number) => {
    setMonthIndex((m) => {
      const next = m + delta;
      if (next < 0) { setYear((y) => y - 1); return 11; }
      if (next > 11) { setYear((y) => y + 1); return 0; }
      return next;
    });
    // Selections belong to the month they were made in.
    setSelected(undefined);
    setRange(undefined);
    setPendingFrom(undefined);
  }, []);

  const handleSelectDate = useCallback(
    (day: number) => {
      if (selectionMode === 'single') {
        setSelected(day);
        onChange?.({ year, monthIndex, day });
        return;
      }
      // Range: first click arms the start, second closes it, third restarts.
      if (pendingFrom === undefined) {
        setPendingFrom(day);
        setRange(undefined);
        setSelected(day);
        return;
      }
      const from = Math.min(pendingFrom, day);
      const to = Math.max(pendingFrom, day);
      setRange({ from, to });
      setPendingFrom(undefined);
      setSelected(undefined);
      onRangeChange?.({ year, monthIndex, from, to });
    },
    [selectionMode, pendingFrom, year, monthIndex, onChange, onRangeChange]
  );

  // Four months and five years per page, as Figma shows them.
  const months = useMemo(
    () => MONTH_NAMES.slice(monthPage * MONTH_PAGE_SIZE, monthPage * MONTH_PAGE_SIZE + MONTH_PAGE_SIZE),
    [monthPage]
  );
  const yearStart = year - 2 + yearPage * YEAR_PAGE_SIZE;
  const years = useMemo(
    () => Array.from({ length: YEAR_PAGE_SIZE }, (_, i) => String(yearStart + i)),
    [yearStart]
  );

  // Closing the picker returns to a date grid. If the component was configured
  // to *open* on the picker, fall back to the plain date picker rather than
  // back onto itself.
  const closedType: DateSelectorType =
    type === 'month & year picker' ? 'date picker' : type;

  return (
    <DateSelector
      {...rest}
      type={picking ? 'month & year picker' : closedType}
      year={year}
      monthIndex={monthIndex}
      selected={selected}
      range={range}
      monthYearLabel={formatMonthYear(year, monthIndex)}
      months={months}
      years={years}
      selectedMonth={MONTH_NAMES[monthIndex]}
      selectedYear={String(year)}
      onPrev={() => stepMonth(-1)}
      onNext={() => stepMonth(1)}
      onSelectDate={handleSelectDate}
      onToggleView={() => setPicking((p) => !p)}
      onSelectMonth={(m) => {
        const i = MONTH_NAMES.indexOf(m as (typeof MONTH_NAMES)[number]);
        if (i >= 0) setMonthIndex(i);
      }}
      onSelectYear={(y) => {
        const n = Number(y);
        if (!Number.isNaN(n)) setYear(n);
      }}
      onPrevMonths={() => setMonthPage((p) => (p === 0 ? 2 : p - 1))}
      onNextMonths={() => setMonthPage((p) => (p === 2 ? 0 : p + 1))}
      onPrevYears={() => setYearPage((p) => p - 1)}
      onNextYears={() => setYearPage((p) => p + 1)}
      onDone={() => setPicking(false)}
      onCancel={() => {
        setSelected(undefined);
        setRange(undefined);
        setPendingFrom(undefined);
        setPicking(false);
      }}
    />
  );
};

InteractiveDateSelector.displayName = 'InteractiveDateSelector';

// ─── Primary Aliases ──────────────────────────────────────────────────────────
export const Calendar = DateSelector;
export type CalendarProps = DateSelectorProps;
export const InteractiveCalendar = InteractiveDateSelector;
export type InteractiveCalendarProps = InteractiveDateSelectorProps;
export const CalendarCell = DateSelectorCell;
export type CalendarCellProps = DateSelectorCellProps;
export const CalendarHeader = DateSelectorHeader;
export type CalendarHeaderProps = DateSelectorHeaderProps;

