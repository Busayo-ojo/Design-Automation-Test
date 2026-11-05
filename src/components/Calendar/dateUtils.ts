/* ═══════════════════════════════════════════════════════════════════════════
   Date Selectors — variant unions, Figma defaults and calendar maths.

   Kept separate from DateSelectors.tsx so that file only exports components
   (react-refresh/only-export-components).
   ═══════════════════════════════════════════════════════════════════════════ */

/** Figma `Date` (6335:28092) → `State` variant */
export type DateSelectorCellState =
  | 'default'
  | 'single selected'
  | 'multi-selected'
  | 'disabled';

/** Figma `Date` (6335:28092) → `Position` variant */
export type DateSelectorCellPosition =
  | 'start'
  | 'middle'
  | 'end'
  | 'start-mid'
  | 'end-mid'
  | 'last day';

/** Figma `Calendar` (6335:28236) → `Type` variant */
export type DateSelectorType =
  | 'date picker'
  | 'date picker + last day'
  | 'month & year picker';

/** Data shape for one cell in the grid. */
export interface DateCellSpec {
  key?: string;
  day?: string;
  state?: DateSelectorCellState;
  position?: DateSelectorCellPosition;
  showToday?: boolean;
  showStatus?: boolean;
}

/** Figma's weekday row is Monday-first. */
export const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as const;

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

/** Figma shows four months and five years at a time in the picker. */
export const DEFAULT_MONTHS = ['January', 'February', 'March', 'April'];
export const DEFAULT_YEARS = ['2016', '2017', '2018', '2019', '2020'];

export const formatMonthYear = (year: number, monthIndex: number) =>
  `${MONTH_NAMES[monthIndex]} ${year}`;

/** Monday-first weekday index (0 = Monday) for the 1st of the month. */
function leadingBlanks(year: number, monthIndex: number) {
  return (new Date(year, monthIndex, 1).getDay() + 6) % 7;
}

function daysInMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

export interface BuildMonthOptions {
  year: number;
  monthIndex: number;
  /** Day-of-month to mark `single selected` */
  selected?: number;
  /** Inclusive range to mark `multi-selected` */
  range?: { from: number; to: number };
  /** Day-of-month to flag with the `Show Today` dot */
  today?: number;
  /** Days flagged with the `Show Status` check-circle */
  statusDays?: number[];
}

/**
 * Produces the cells for one month the way Figma lays the grid out: leading and
 * trailing days from the adjacent months are present but `disabled`, and the
 * grid is padded to complete the final week.
 *
 * Range positions follow the Figma set: only the two endpoints get the
 * primary-400 ring (`start` / `end`); the days just inside them are
 * `start-mid` / `end-mid`, and everything between is `middle`.
 */
export function buildMonthCells(opts: BuildMonthOptions): DateCellSpec[] {
  const { year, monthIndex, selected, range, today, statusDays = [] } = opts;
  const lead = leadingBlanks(year, monthIndex);
  const total = daysInMonth(year, monthIndex);
  const prevTotal = daysInMonth(year, monthIndex - 1);
  const cells: DateCellSpec[] = [];

  for (let i = 0; i < lead; i++) {
    cells.push({
      key: `lead-${i}`,
      day: String(prevTotal - lead + 1 + i),
      state: 'disabled',
      position: 'start',
    });
  }

  for (let d = 1; d <= total; d++) {
    let state: DateSelectorCellState = 'default';
    let position: DateSelectorCellPosition = 'start';

    if (range && d >= range.from && d <= range.to) {
      state = 'multi-selected';
      if (d === range.from) position = 'start';
      else if (d === range.to) position = 'end';
      else if (d === range.from + 1) position = 'start-mid';
      else if (d === range.to - 1) position = 'end-mid';
      else position = 'middle';
    } else if (selected === d) {
      state = 'single selected';
    }

    cells.push({
      key: `d-${d}`,
      day: String(d),
      state,
      position,
      showToday: today === d,
      showStatus: statusDays.includes(d),
    });
  }

  const remainder = (7 - (cells.length % 7)) % 7;
  for (let i = 1; i <= remainder; i++) {
    cells.push({ key: `trail-${i}`, day: String(i), state: 'disabled', position: 'start' });
  }

  return cells;
}
