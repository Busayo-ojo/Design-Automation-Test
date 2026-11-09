import React, { forwardRef, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from '../../foundations/icons';
import { Avatar } from '../../elements/Avatar';
import { Toggle } from '../../elements/FormControl';
import { Input } from '../../elements/Input';
import './Dropdowns.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Dropdowns — built 1:1 from Figma page "✤ Dropdowns" (file Hq7luvf787VJlCj1d3YJYw)

   Layered exactly as Figma organises it:

     ELEMENTS (Figma "Base components" / "Selectors Base components")
       CommandShortcut         ← Command shortcut              2327:77216
       DropdownMenuItemHeader  ← Dropdown / menu item headers   2159:85848
       DropdownMenuItem        ← Dropdown / menu item           2159:51455
       SelectorMenuItem        ← .Selector menu / menu item     2459:70670

     NESTED COMPONENTS
       DropdownMenuSection     ← Dropdown / menu items section  2159:81118
       DropdownMenuList        ← Dropdown / menu items          (popover)
       SelectorMenuList        ← .Selector menu / menu list

     FULL COMPONENTS
       DropdownsMenu           ← Dropdown / Menu                2190:54213
       DropdownsSelector       ← Dropdown / Selectors           2959:115795

   Reuse (per rules/FIGMA_STORYBOOK_RULES.md §0): every nested Figma instance
   maps to an existing React component — Icon (foundations/icons), Avatar,
   Toggle (FormControl), Input. Nothing here re-implements their markup.
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── Shared variant unions (mirror Figma variant names, lower-cased) ───────

/** Figma `Dropdown / menu item` → `type` */
export type DropdownMenuItemType = 'default' | 'avatar' | 'icon';
/** Figma `Dropdown / menu item` → `state` */
export type DropdownMenuItemState = 'default' | 'hover' | 'focused' | 'selected' | 'disabled';
/** Figma `Command shortcut` → `Type` */
export type CommandShortcutType = 'mac os' | 'windows os';
/** Figma `.Selector menu / menu item` → `type` */
export type SelectorMenuItemType = 'default' | 'selected';
/** Figma `.Selector menu / menu item` → `style` */
export type SelectorMenuItemStyle = 'default' | 'avatar' | 'icon' | 'status';
/** Figma `.Selector menu / menu item` → `state` */
export type SelectorMenuItemState = 'default' | 'hover' | 'focused' | 'disabled';
/** Figma `Dropdown / Menu` → `type` */
export type DropdownsMenuType = 'default' | 'avatar' | 'icon-only';
/** Figma `Dropdown / Menu` → `state` */
export type DropdownsMenuState = 'default' | 'hover' | 'active' | 'disabled';
/** Figma `Dropdown / Selectors` → `type` */
export type DropdownsSelectorType = 'default' | 'icon leading' | 'avatar leading' | 'status';
/** Figma `Dropdown / Selectors` → `state` */
export type DropdownsSelectorState = 'default' | 'hover' | 'active' | 'filled' | 'disabled';

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(' ');

/**
 * Open/close state for the two full components.
 *
 * Pass `extended` to control it (every variant story does this, so the Figma
 * matrix stays exact). Omit it and the component manages its own state, so the
 * trigger opens and closes on click the way it does in a real app.
 */
function useDisclosure(
  extended: boolean | undefined,
  defaultExtended: boolean,
  disabled: boolean
) {
  const isControlled = extended !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultExtended);
  const open = isControlled ? extended : internalOpen;
  const rootRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => {
    if (disabled) return;
    if (!isControlled) setInternalOpen((o) => !o);
  }, [disabled, isControlled]);

  const close = useCallback(() => {
    if (!isControlled) setInternalOpen(false);
  }, [isControlled]);

  // Dismiss on outside click and on Escape — only while uncontrolled and open.
  useEffect(() => {
    if (isControlled || !open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setInternalOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setInternalOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isControlled, open]);

  return { open, toggle, close, rootRef, isControlled };
}

/* ═══════════════════════════════════════════════════════════════════════════
   ELEMENT — CommandShortcut
   Figma: Command shortcut (COMPONENT_SET 2327:77216), 29×20
   Key frame: fill neutral-50, stroke neutral-100, r4, pad 0/4, text neutral-600
   ═══════════════════════════════════════════════════════════════════════════ */

export interface CommandShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Figma `Type` variant — the modifier glyph shown before the key */
  type?: CommandShortcutType;
  /** Key character(s) after the modifier glyph. Figma default: "C" */
  keyLabel?: string;
}

/** Modifier glyph per OS — Figma renders "⌘C" for Mac OS, "^C" for windows OS. */
const MODIFIER: Record<CommandShortcutType, string> = {
  'mac os': '⌘',
  'windows os': '^',
};

export const CommandShortcut: React.FC<CommandShortcutProps> = ({
  type = 'mac os',
  keyLabel = 'C',
  className,
  ...rest
}) => (
  <span className={cx('fmdqui-dropdowns-shortcut', className)} {...rest}>
    <span className="fmdqui-dropdowns-shortcut__key">
      {MODIFIER[type]}
      {keyLabel}
    </span>
  </span>
);

CommandShortcut.displayName = 'CommandShortcut';

/* ═══════════════════════════════════════════════════════════════════════════
   ELEMENT — DropdownMenuItemHeader
   Figma: Dropdown / menu item headers (COMPONENT_SET 2159:85848), 240×56
   borders=true → 1px neutral-100 stroke. Title DM Sans SemiBold 14 neutral-900,
   subtitle DM Sans Regular 14 neutral-500. pad 8/16, gap 4.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface DropdownMenuItemHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma `borders` variant — draws the 1px neutral-100 outline */
  borders?: boolean;
  /** Figma `has supporting texts` boolean property */
  hasSupportingTexts?: boolean;
  /** Figma text layer 1. Default mirrors the Figma content. */
  title?: ReactNode;
  /** Figma text layer 2 (shown when `hasSupportingTexts`) */
  subtitle?: ReactNode;
}

export const DropdownMenuItemHeader: React.FC<DropdownMenuItemHeaderProps> = ({
  borders = true,
  hasSupportingTexts = true,
  title = 'Menu Title',
  subtitle = 'This is a subheading for the title',
  className,
  ...rest
}) => (
  <div
    className={cx(
      'fmdqui-dropdowns-header',
      borders && 'fmdqui-dropdowns-header--borders',
      className
    )}
    {...rest}
  >
    <div className="fmdqui-dropdowns-header__heading">
      <span className="fmdqui-dropdowns-header__title">{title}</span>
      {hasSupportingTexts && (
        <span className="fmdqui-dropdowns-header__subtitle">{subtitle}</span>
      )}
    </div>
  </div>
);

DropdownMenuItemHeader.displayName = 'DropdownMenuItemHeader';

/* ═══════════════════════════════════════════════════════════════════════════
   ELEMENT — DropdownMenuItem
   Figma: Dropdown / menu item (COMPONENT_SET 2159:51455), 240×36
   type: default | avatar | icon    state: default | hover | focused | selected | disabled
   pad 8/16, gap 4. Left Content gap 12. Text DM Sans Regular 14 / 145% / -4%.
   Row fill — default: none · hover: neutral-50 · focused: neutral-100
              selected: neutral-50 · disabled: neutral-100
   Text — neutral-900, except disabled → neutral-400.
   Toggle (Checkcircle) appears only in `selected` + `disabled`:
     selected → secondary-400 · disabled → neutral-300
   ═══════════════════════════════════════════════════════════════════════════ */

export interface DropdownMenuItemProps
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'type'> {
  /** Figma `type` variant */
  type?: DropdownMenuItemType;
  /** Figma `state` variant. Forces the visual state; real interaction also works via CSS. */
  state?: DropdownMenuItemState;
  /** Figma `menu text` TEXT property */
  menuText?: ReactNode;
  /** Figma `has command menu` BOOLEAN property */
  hasCommandMenu?: boolean;
  /** Figma `has checkbox` BOOLEAN property — the Checkcircle toggle */
  hasCheckbox?: boolean;
  /** Figma `icon` INSTANCE_SWAP. Name from the foundations icon set. Figma default: hashtag */
  iconName?: string;
  /** Escape hatch for a fully custom leading node (overrides `iconName`) */
  icon?: ReactNode;
  /** Avatar image for `type="avatar"` */
  avatarUrl?: string;
  /** Figma `Command shortcut` → `Type` */
  shortcutType?: CommandShortcutType;
  /** Key character inside the command shortcut */
  shortcutKey?: string;
}

export const DropdownMenuItem = forwardRef<HTMLLIElement, DropdownMenuItemProps>(
  (
    {
      type = 'default',
      state = 'default',
      menuText = 'Account settings',
      hasCommandMenu = true,
      hasCheckbox = true,
      iconName = 'hashtag',
      icon,
      avatarUrl,
      shortcutType = 'mac os',
      shortcutKey = 'C',
      className,
      ...rest
    },
    ref
  ) => {
    const isDisabled = state === 'disabled';
    // Figma shows the Checkcircle only in `selected` and `disabled` variants.
    const showToggle = hasCheckbox && (state === 'selected' || state === 'disabled');
    // Figma hides the command shortcut on `selected` (the toggle takes that slot).
    const showShortcut = hasCommandMenu && state !== 'selected';

    const label = <span className="fmdqui-dropdowns-item__text">{menuText}</span>;

    return (
      <li
        ref={ref}
        role="menuitem"
        aria-disabled={isDisabled || undefined}
        aria-checked={state === 'selected' || undefined}
        className={cx(
          'fmdqui-dropdowns-item',
          `fmdqui-dropdowns-item--${type}`,
          `fmdqui-dropdowns-item--${state}`,
          className
        )}
        {...rest}
      >
        {type === 'default' ? (
          label
        ) : (
          <span className="fmdqui-dropdowns-item__left">
            {type === 'avatar' ? (
              <Avatar
                type="Image"
                size="xs"
                statusIcon={isDisabled ? 'offline' : 'None'}
                imageUrl={avatarUrl}
                className="fmdqui-dropdowns-item__avatar"
              />
            ) : (
              <span className="fmdqui-dropdowns-item__icon">
                {icon ?? <Icon name={iconName} variant="linear" size={20} />}
              </span>
            )}
            {label}
          </span>
        )}

        {showShortcut && (
          <CommandShortcut type={shortcutType} keyLabel={shortcutKey} />
        )}

        {showToggle && (
          <span className="fmdqui-dropdowns-item__toggle">
            <Toggle type="Checkcircle" active readOnly tabIndex={-1} />
          </span>
        )}
      </li>
    );
  }
);

DropdownMenuItem.displayName = 'DropdownMenuItem';

/* ═══════════════════════════════════════════════════════════════════════════
   ELEMENT — SelectorMenuItem
   Figma: .Selector menu / menu item (COMPONENT_SET 2459:70670), 375×36
   type: default | selected   style: default | avatar | icon | status
   state: default | hover | focused | disabled
   pad 8/16, gap 4. Primary text neutral-900, supporting text neutral-500.
   NOTE (verified in Figma): `focused` switches the primary text to DM Sans
   Medium — every other state is Regular. Unlike DropdownMenuItem, the
   selector keeps neutral-900 text in `disabled` (it does not grey out).
   ═══════════════════════════════════════════════════════════════════════════ */

export interface SelectorMenuItemProps
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'type' | 'style'> {
  /** Figma `type` variant — `selected` reveals the Checkcircle toggle */
  type?: SelectorMenuItemType;
  /** Figma `style` variant — the leading adornment */
  style?: SelectorMenuItemStyle;
  /** Figma `state` variant */
  state?: SelectorMenuItemState;
  /** Figma `menu text` TEXT property */
  menuText?: ReactNode;
  /** Figma `has supporting text` BOOLEAN property */
  hasSupportingText?: boolean;
  /** Supporting text. Figma default: "@account" */
  supportingText?: ReactNode;
  /** Figma `has checkbox` BOOLEAN property */
  hasCheckbox?: boolean;
  /** Figma `icon` INSTANCE_SWAP for `style="icon"`. Figma default: heart */
  iconName?: string;
  /** Escape hatch for a custom leading node (overrides `iconName`) */
  icon?: ReactNode;
  /** Avatar image for `style="avatar"` */
  avatarUrl?: string;
}

export const SelectorMenuItem = forwardRef<HTMLLIElement, SelectorMenuItemProps>(
  (
    {
      type = 'default',
      style = 'default',
      state = 'default',
      menuText = 'Account settings',
      hasSupportingText = true,
      supportingText = '@account',
      hasCheckbox = true,
      iconName = 'heart',
      icon,
      avatarUrl,
      className,
      ...rest
    },
    ref
  ) => {
    const isSelected = type === 'selected';
    const isDisabled = state === 'disabled';
    const showToggle = isSelected && hasCheckbox;

    const texts = (
      <span className="fmdqui-dropdowns-selitem__texts">
        <span className="fmdqui-dropdowns-selitem__text">{menuText}</span>
        {hasSupportingText && (
          <span className="fmdqui-dropdowns-selitem__supporting">{supportingText}</span>
        )}
      </span>
    );

    return (
      <li
        ref={ref}
        role="option"
        aria-selected={isSelected}
        aria-disabled={isDisabled || undefined}
        className={cx(
          'fmdqui-dropdowns-selitem',
          `fmdqui-dropdowns-selitem--${style}`,
          `fmdqui-dropdowns-selitem--${state}`,
          isSelected && 'fmdqui-dropdowns-selitem--selected',
          className
        )}
        {...rest}
      >
        {style === 'default' ? (
          texts
        ) : (
          <span className="fmdqui-dropdowns-selitem__left">
            {style === 'avatar' && (
              <Avatar
                type="Image"
                size="xs"
                statusIcon={isDisabled ? 'offline' : 'None'}
                imageUrl={avatarUrl}
                className="fmdqui-dropdowns-selitem__avatar"
              />
            )}
            {style === 'icon' && (
              <span className="fmdqui-dropdowns-selitem__icon">
                {icon ?? <Icon name={iconName} variant="linear" size={20} />}
              </span>
            )}
            {/* Figma `style=status` uses the Avatar online indicator at 8px,
                success-600 fill — a bare dot, not a full Avatar instance. */}
            {style === 'status' && <span className="fmdqui-dropdowns-selitem__status" />}
            {texts}
          </span>
        )}

        {showToggle && (
          <span className="fmdqui-dropdowns-selitem__toggle">
            <Toggle type="Checkcircle" active readOnly tabIndex={-1} />
          </span>
        )}
      </li>
    );
  }
);

SelectorMenuItem.displayName = 'SelectorMenuItem';

/* ═══════════════════════════════════════════════════════════════════════════
   NESTED — DropdownMenuSection
   Figma: Dropdown / menu items section (COMPONENT 2159:81118), 240 wide
   VERTICAL, pad 4/0, gap 0 — a header followed by menu items.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface DropdownMenuSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Render the section header. Figma instances it with `borders=false`. */
  hasHeader?: boolean;
  /** Props forwarded to the nested DropdownMenuItemHeader */
  header?: DropdownMenuItemHeaderProps;
  /** Menu items in this section */
  items?: DropdownMenuItemProps[];
  /** Children take precedence over `items` for declarative composition */
  children?: ReactNode;
}

export const DropdownMenuSection: React.FC<DropdownMenuSectionProps> = ({
  hasHeader = true,
  header,
  items,
  children,
  className,
  ...rest
}) => (
  <div className={cx('fmdqui-dropdowns-section', className)} {...rest}>
    {hasHeader && <DropdownMenuItemHeader borders={false} {...header} />}
    <ul className="fmdqui-dropdowns-section__list" role="none">
      {children ??
        items?.map((item, i) => (
          <DropdownMenuItem key={item.id ?? i} {...item} />
        ))}
    </ul>
  </div>
);

DropdownMenuSection.displayName = 'DropdownMenuSection';

/* ═══════════════════════════════════════════════════════════════════════════
   NESTED — DropdownMenuList  (the popover)
   Figma: Dropdown / menu items — fill white, r8, gap 8, pad 0,
   3-layer shadow → --shadow-dropdown-menu.
   Sections are separated by 1px neutral-100 dividers.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface DropdownMenuListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Sections rendered in order, separated by 1px dividers (as in Figma) */
  sections?: DropdownMenuSectionProps[];
  /** Figma collapsed width is 240; the extended variant is 267 */
  width?: number | string;
  children?: ReactNode;
}

export const DropdownMenuList = forwardRef<HTMLDivElement, DropdownMenuListProps>(
  ({ sections, width, children, className, style, ...rest }, ref) => (
    <div
      ref={ref}
      role="menu"
      className={cx('fmdqui-dropdowns-menulist', className)}
      style={width !== undefined ? { width, ...style } : style}
      {...rest}
    >
      {children ??
        sections?.map((section, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div className="fmdqui-dropdowns-menulist__divider" role="separator" />}
            <DropdownMenuSection {...section} />
          </React.Fragment>
        ))}
    </div>
  )
);

DropdownMenuList.displayName = 'DropdownMenuList';

/* ═══════════════════════════════════════════════════════════════════════════
   NESTED — SelectorMenuList
   Figma: .Selector menu / menu list — fill white, stroke neutral-200, r8,
   pad 4/0, gap 0, shadow = --shadow-normal-xsm (exact token match).
   ═══════════════════════════════════════════════════════════════════════════ */

export interface SelectorMenuListProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Options rendered as SelectorMenuItem rows */
  items?: SelectorMenuItemProps[];
  children?: ReactNode;
}

export const SelectorMenuList = forwardRef<HTMLUListElement, SelectorMenuListProps>(
  ({ items, children, className, ...rest }, ref) => (
    <ul
      ref={ref}
      role="listbox"
      className={cx('fmdqui-dropdowns-sellist', className)}
      {...rest}
    >
      {children ??
        items?.map((item, i) => <SelectorMenuItem key={i} {...item} />)}
    </ul>
  )
);

SelectorMenuList.displayName = 'SelectorMenuList';

/* ═══════════════════════════════════════════════════════════════════════════
   FULL — DropdownsMenu
   Figma: Dropdown / Menu (COMPONENT_SET 2190:54213) — 12 variants
   type: default | avatar | icon-only   state: default | hover | active | disabled
   extended: no | yes  (Figma pairs extended=yes with state=active)

   Trigger specs:
     default button  111×36, white, r6, pad 8/12, gap 8 · label DM Sans SemiBold 14 neutral-700
     icon button     28×28, white, r6, pad 4
     avatar          32×32 Avatar(Image, sm)
   Stroke by state: default neutral-300 · hover secondary-100 · active secondary-300
                    disabled neutral-300 on neutral-100 fill
   ═══════════════════════════════════════════════════════════════════════════ */

export interface DropdownsMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'type'> {
  /** Figma `type` variant */
  type?: DropdownsMenuType;
  /** Figma `state` variant */
  state?: DropdownsMenuState;
  /**
   * Figma `extended` variant — reveals the menu popover. Pass it to control the
   * menu; omit it and the trigger opens and closes on click by itself.
   */
  extended?: boolean;
  /** Initial open state when `extended` is not supplied (uncontrolled) */
  defaultExtended?: boolean;
  /** Trigger label for `type="default"`. Figma default: "Label" */
  label?: ReactNode;
  /**
   * Leading icon inside the default trigger (Figma INSTANCE_SWAP, default
   * `icon / plus-circle`). For `type="icon-only"` this is the single icon,
   * which Figma sets to `icon / dots-h`.
   */
  iconName?: string;
  /** Trailing icon on the default trigger. Figma: `icon / chevron-down`. */
  trailingIconName?: string;
  /** Avatar image for `type="avatar"` */
  avatarUrl?: string;
  /** Sections for the popover */
  sections?: DropdownMenuSectionProps[];
  /** Popover content override */
  children?: ReactNode;
  /** Fired when the trigger is activated (no-op when disabled) */
  onTriggerClick?: () => void;
}

export const DropdownsMenu = forwardRef<HTMLDivElement, DropdownsMenuProps>(
  (
    {
      type = 'default',
      state = 'default',
      extended,
      defaultExtended = false,
      label = 'Label',
      iconName,
      trailingIconName = 'chevron-down',
      avatarUrl,
      sections,
      children,
      onTriggerClick,
      className,
      ...rest
    },
    ref
  ) => {
    const isDisabled = state === 'disabled';
    const { open, toggle, rootRef } = useDisclosure(extended, defaultExtended, isDisabled);
    const handleTrigger = () => {
      toggle();
      onTriggerClick?.();
    };
    // Figma: collapsed popover is 240 wide, the extended variant is 267.
    const menuWidth = open ? 267 : 240;
    // Figma: default trigger leads with `icon / plus-circle`; the icon-only
    // trigger uses `icon / dots-h`.
    const resolvedIcon = iconName ?? (type === 'icon-only' ? 'dots-h' : 'plus-circle');

    const trigger = (() => {
      if (type === 'avatar') {
        return (
          <button
            type="button"
            className="fmdqui-dropdowns-menu__avatar-trigger"
            disabled={isDisabled}
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={handleTrigger}
          >
            <Avatar type="Image" size="sm" imageUrl={avatarUrl} />
          </button>
        );
      }
      if (type === 'icon-only') {
        return (
          <button
            type="button"
            className="fmdqui-dropdowns-menu__icon-trigger"
            disabled={isDisabled}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label={typeof label === 'string' ? label : 'Open menu'}
            onClick={handleTrigger}
          >
            <Icon name={resolvedIcon} variant="linear" size={20} />
          </button>
        );
      }
      return (
        <button
          type="button"
          className="fmdqui-dropdowns-menu__trigger"
          disabled={isDisabled}
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={handleTrigger}
        >
          {/* Figma: Container [leading icon, Label] then a trailing chevron */}
          <span className="fmdqui-dropdowns-menu__trigger-container">
            <Icon name={resolvedIcon} variant="linear" size={20} />
            <span className="fmdqui-dropdowns-menu__trigger-label">{label}</span>
          </span>
          <Icon name={trailingIconName} variant="linear" size={20} />
        </button>
      );
    })();

    return (
      <div
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cx(
          'fmdqui-dropdowns-menu',
          `fmdqui-dropdowns-menu--${type}`,
          `fmdqui-dropdowns-menu--${state}`,
          open && 'fmdqui-dropdowns-menu--extended',
          open && 'fmdqui-dropdowns-menu--open',
          className
        )}
        {...rest}
      >
        {trigger}
        {open && (
          <DropdownMenuList width={menuWidth} sections={sections}>
            {children}
          </DropdownMenuList>
        )}
      </div>
    );
  }
);

DropdownsMenu.displayName = 'DropdownsMenu';

/* ═══════════════════════════════════════════════════════════════════════════
   FULL — DropdownsSelector
   Figma: Dropdown / Selectors (COMPONENT_SET 2959:115795) — 20 variants
   type: default | icon leading | avatar leading | status
   state: default | hover | active | filled | disabled
   extended: false | true

   Per the Figma documentation frame (2959:115710): "Selectors … combine the
   functionality of input fields and dropdowns." So the field is the existing
   <Input size="lg"> element — label, frame, helper text, focus ring and all —
   with the leading adornment and trailing chevron swapped in from the
   foundations icon set. Nothing about the input is re-implemented here.

   Input --lg already matches Figma's Input Frame: h56, r12, 1px neutral-300,
   gap 12, label DM Sans Medium 14 neutral-900, helper Regular 14.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface DropdownsSelectorProps {
  /** Figma `type` variant — the leading adornment */
  type?: DropdownsSelectorType;
  /** Figma `state` variant */
  state?: DropdownsSelectorState;
  /**
   * Figma `extended` variant — reveals the selector menu. Pass it to control the
   * menu; omit it and the field opens, selects and closes on click by itself.
   */
  extended?: boolean;
  /** Initial open state when `extended` is not supplied (uncontrolled) */
  defaultExtended?: boolean;
  /** Figma `has label` BOOLEAN property */
  hasLabel?: boolean;
  /** Field label. Figma default: "Label" */
  label?: string;
  /** Figma `has helper texts` BOOLEAN property (Figma default: false) */
  hasHelperTexts?: boolean;
  /** Helper text. Figma default: "Helper text" */
  helperText?: string;
  /** Placeholder. Figma default: "Placeholder" */
  placeholder?: string;
  /** Selected value — shown instead of the placeholder in `state="filled"` */
  value?: string;
  /** Figma `leading-icon` INSTANCE_SWAP for `type="icon leading"` */
  iconName?: string;
  /** Avatar image for `type="avatar leading"` */
  avatarUrl?: string;
  /** Options rendered in the extended menu */
  items?: SelectorMenuItemProps[];
  /** Trailing icon name. Figma uses the linear chevron. */
  trailingIconName?: string;
  className?: string;
  onTriggerClick?: () => void;
  /** Fired with the chosen row's text when an option is selected */
  onSelect?: (menuText: string, index: number) => void;
}

/** Maps the Figma selector state onto the Input element's own state prop. */
const INPUT_STATE: Record<DropdownsSelectorState, 'default' | 'hover' | 'active' | 'filled'> = {
  default: 'default',
  hover: 'hover',
  active: 'active',
  filled: 'filled',
  disabled: 'default',
};

/**
 * In Figma the extended menu's rows carry the same leading style as the field:
 * `type=status` opens a menu of `style=status` rows, and so on. Items may still
 * override `style` individually.
 */
const ITEM_STYLE_FOR_TYPE: Record<DropdownsSelectorType, SelectorMenuItemStyle> = {
  default: 'default',
  'icon leading': 'icon',
  'avatar leading': 'avatar',
  status: 'status',
};

export const DropdownsSelector: React.FC<DropdownsSelectorProps> = ({
  type = 'default',
  state = 'default',
  extended,
  defaultExtended = false,
  hasLabel = true,
  label = 'Label',
  hasHelperTexts = false,
  helperText = 'Helper text',
  placeholder = 'Placeholder',
  value,
  iconName = 'heart',
  avatarUrl,
  items,
  trailingIconName = 'chevron-down',
  className,
  onTriggerClick,
  onSelect,
}) => {
  const isDisabled = state === 'disabled';
  const { open, toggle, close, rootRef, isControlled } = useDisclosure(
    extended,
    defaultExtended,
    isDisabled
  );

  // Uncontrolled selection: picking a row fills the field, mirroring Figma's
  // `state=filled`. A supplied `value`/`state` always wins.
  const [picked, setPicked] = useState<string | null>(null);
  const resolvedValue = state === 'filled' ? (value ?? 'Input') : (value ?? picked ?? '');
  const resolvedState: DropdownsSelectorState =
    state !== 'default' ? state : picked ? 'filled' : open ? 'active' : 'default';

  // Figma `type` decides the leading adornment; `default` has none.
  const leadingIcon = (() => {
    if (type === 'icon leading') return <Icon name={iconName} variant="linear" size={20} />;
    if (type === 'avatar leading')
      return <Avatar type="Image" size="xs" imageUrl={avatarUrl} />;
    if (type === 'status') return <span className="fmdqui-dropdowns-selector__status" />;
    return null;
  })();

  return (
    <div
      ref={rootRef}
      className={cx(
        'fmdqui-dropdowns-selector',
        `fmdqui-dropdowns-selector--${type.replace(' ', '-')}`,
        `fmdqui-dropdowns-selector--${resolvedState}`,
        open && 'fmdqui-dropdowns-selector--extended',
        open && 'fmdqui-dropdowns-selector--open',
        className
      )}
    >
      <div
        className="fmdqui-dropdowns-selector__field"
        onClick={
          isDisabled
            ? undefined
            : () => {
                toggle();
                onTriggerClick?.();
              }
        }
      >
        <Input
          size="lg"
          state={INPUT_STATE[resolvedState]}
          hasLabel={hasLabel}
          label={label}
          hasHelperText={hasHelperTexts}
          helperText={helperText}
          placeholder={placeholder}
          // Figma `state=filled` shows the chosen value; every other state
          // shows the placeholder.
          value={resolvedValue}
          readOnly
          disabled={isDisabled}
          hasLeftIcon={leadingIcon !== null}
          leadingIcon={leadingIcon ?? undefined}
          hasRightIcon
          trailingIcon={<Icon name={trailingIconName} variant="linear" size={20} />}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
        />
      </div>
      {open && (
        <SelectorMenuList
          items={items?.map((item, i) => ({
            style: ITEM_STYLE_FOR_TYPE[type],
            iconName,
            avatarUrl,
            ...item,
            // Mark the chosen row selected, and close on pick when uncontrolled.
            type:
              item.type ??
              (picked !== null && picked === String(item.menuText ?? '')
                ? 'selected'
                : 'default'),
            onClick: (e: React.MouseEvent<HTMLLIElement>) => {
              const text = String(item.menuText ?? 'Account settings');
              if (!isControlled) {
                setPicked(text);
                close();
              }
              item.onClick?.(e);
              onSelect?.(text, i);
            },
          }))}
        />
      )}
    </div>
  );
};

DropdownsSelector.displayName = 'DropdownsSelector';
