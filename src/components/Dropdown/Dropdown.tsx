import React, { useState, useRef, useEffect, forwardRef } from 'react';
import type { ReactNode } from 'react';
import './Dropdown.css';
import { Button } from '../../elements/Button';
import { Avatar } from '../../elements/Avatar';
import { Divider } from '../../elements/Divider';
import { Icon } from '../../foundations/icons';

// ─── Types matching Figma "Dropdown / Menu" (2190:52619) & (2159:51455) ──────

export type DropdownTriggerType = 'default' | 'avatar' | 'icon-only';
export type DropdownState = 'default' | 'hover' | 'active' | 'disabled';
export type DropdownItemType = 'default' | 'icon' | 'avatar';
export type DropdownItemState = 'default' | 'hover' | 'focused' | 'selected' | 'disabled';

export interface DropdownItemDef {
  id?: string | number;
  label: ReactNode;
  type?: DropdownItemType;
  state?: DropdownItemState;
  icon?: ReactNode;
  avatarUrl?: string;
  shortcut?: string;
  hasCheckbox?: boolean;
  selected?: boolean;
  disabled?: boolean;
  destructive?: boolean;
  onClick?: () => void;
}

export interface DropdownSectionDef {
  header?: {
    title: ReactNode;
    subtitle?: ReactNode;
    borders?: boolean;
  };
  items: DropdownItemDef[];
  hasDivider?: boolean;
}

// ─── 1. Dropdown Header (Figma 2159:85848) ───────────────────────────────────

export interface DropdownHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  subtitle?: ReactNode;
  borders?: boolean;
}

export const DropdownHeader: React.FC<DropdownHeaderProps> = ({
  title,
  subtitle,
  borders = true,
  className = '',
  ...props
}) => (
  <div
    className={`fmdqui-dropdown-header ${borders ? 'fmdqui-dropdown-header--borders' : ''} ${className}`}
    {...props}
  >
    <div className="fmdqui-dropdown-header__heading">
      <span className="fmdqui-dropdown-header__title fmdq-text fmdq-text--size-sm fmdq-text--weight-semibold">
        {title}
      </span>
      {subtitle && (
        <span className="fmdqui-dropdown-header__subtitle fmdq-text fmdq-text--size-xs">
          {subtitle}
        </span>
      )}
    </div>
  </div>
);
DropdownHeader.displayName = 'DropdownHeader';

// ─── 2. Dropdown Menu Item (Figma 2159:51455) ─────────────────────────────────

export interface DropdownItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'onClick'> {
  type?: DropdownItemType;
  state?: DropdownItemState;
  label: ReactNode;
  icon?: ReactNode;
  avatarUrl?: string;
  shortcut?: string;
  hasCheckbox?: boolean;
  selected?: boolean;
  disabled?: boolean;
  destructive?: boolean;
  onClick?: () => void;
}

export const DropdownItem = forwardRef<HTMLLIElement, DropdownItemProps>(
  (
    {
      type = 'default',
      state = 'default',
      label,
      icon,
      avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=40&h=40&q=80',
      shortcut,
      hasCheckbox = false,
      selected = false,
      disabled = false,
      destructive = false,
      className = '',
      onClick,
      ...props
    },
    ref
  ) => {
    const isSelected = selected || state === 'selected';
    const isDisabled = disabled || state === 'disabled';

    const classNames = [
      'fmdqui-dropdown-item',
      `fmdqui-dropdown-item--type-${type}`,
      `fmdqui-dropdown-item--state-${state}`,
      isSelected ? 'fmdqui-dropdown-item--selected' : '',
      isDisabled ? 'fmdqui-dropdown-item--disabled' : '',
      destructive ? 'fmdqui-dropdown-item--destructive' : '',
      className,
    ].filter(Boolean).join(' ');

    const handleClick = (e: React.MouseEvent) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }
      onClick?.();
    };

    return (
      <li
        ref={ref}
        className={classNames}
        role="menuitem"
        aria-selected={isSelected}
        aria-disabled={isDisabled}
        onClick={handleClick}
        tabIndex={isDisabled ? -1 : 0}
        {...props}
      >
        <div className="fmdqui-dropdown-item__left">
          {type === 'icon' && (
            <span className="fmdqui-dropdown-item__icon" aria-hidden="true">
              {icon ?? <Icon name="settings-2" variant="linear" size={16} />}
            </span>
          )}

          {type === 'avatar' && (
            <span className="fmdqui-dropdown-item__avatar" aria-hidden="true">
              <Avatar size="xs" type="Image" imageUrl={avatarUrl} />
            </span>
          )}

          <span className="fmdqui-dropdown-item__label fmdq-text fmdq-text--size-sm">
            {label}
          </span>
        </div>

        <div className="fmdqui-dropdown-item__right">
          {shortcut && (
            <span className="fmdqui-dropdown-item__shortcut" aria-label={`Shortcut: ${shortcut}`}>
              {shortcut}
            </span>
          )}

          {(hasCheckbox || isSelected) && (
            <span className="fmdqui-dropdown-item__toggle" aria-hidden="true">
              <Icon name="check" variant="linear" size={14} />
            </span>
          )}
        </div>
      </li>
    );
  }
);
DropdownItem.displayName = 'DropdownItem';

// ─── 3. Dropdown Menu Items Section (Figma 2159:81118) ───────────────────────

export interface DropdownSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: ReactNode;
  hasDivider?: boolean;
  children: ReactNode;
}

export const DropdownSection: React.FC<DropdownSectionProps> = ({
  header,
  hasDivider = false,
  children,
  className = '',
  ...props
}) => (
  <div className={`fmdqui-dropdown-section ${className}`} {...props}>
    {header}
    <ul className="fmdqui-dropdown-section__items" role="menu">
      {children}
    </ul>
    {hasDivider && (
      <div className="fmdqui-dropdown-section__divider">
        <Divider type="default" />
      </div>
    )}
  </div>
);
DropdownSection.displayName = 'DropdownSection';

// ─── 4. Dropdown Menu Popover (Figma 2159:81323) ─────────────────────────────

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  align?: 'left' | 'right';
  children: ReactNode;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isOpen,
  align = 'left',
  children,
  className = '',
  ...props
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fmdqui-dropdown-menu fmdqui-dropdown-menu--align-${align} ${className}`}
      role="menu"
      {...props}
    >
      {children}
    </div>
  );
};
DropdownMenu.displayName = 'DropdownMenu';

// ─── 5. Full Dropdown Composite (Figma 2190:52619 "Dropdown / Menu") ─────────

export interface DropdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Trigger element type: 'default' (Button), 'avatar' (32px Avatar), 'icon-only' (28px button) */
  type?: DropdownTriggerType;
  /** Visual state matching Figma: 'default', 'hover', 'active', 'disabled' */
  state?: DropdownState;
  /** Extended / open menu state */
  extended?: boolean;
  /** Controlled open state */
  isOpen?: boolean;
  /** Default open state */
  defaultIsOpen?: boolean;
  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Button label for 'default' trigger */
  label?: string;
  /** Avatar image URL for 'avatar' trigger */
  avatarUrl?: string;
  /** Icon name for 'icon-only' trigger (default: "more-vertical") */
  iconName?: string;
  /** Custom trigger element override */
  trigger?: ReactNode;
  /** Popover menu alignment ('left' | 'right') */
  align?: 'left' | 'right';
  /** Structured data-driven sections and items */
  sections?: DropdownSectionDef[];
  /** Flat list of items (convenience) */
  items?: DropdownItemDef[];
  /** Declarative compound subcomponents */
  children?: ReactNode;
}

/**
 * @deprecated Replaced by `Dropdowns` component (matching Figma Dropdowns component set).
 * Will be removed in the next release.
 */
export const Dropdown: React.FC<DropdownProps> = ({
  type = 'default',
  state: stateProp,
  extended,
  isOpen: controlledIsOpen,
  defaultIsOpen = false,
  onOpenChange,
  disabled = false,
  label = 'Options',
  avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80',
  iconName = 'more-vertical',
  trigger,
  align = 'left',
  sections,
  items,
  children,
  className = '',
  style,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlledOpen = controlledIsOpen !== undefined || extended !== undefined;
  const effectiveControlledOpen = controlledIsOpen !== undefined ? controlledIsOpen : extended;
  const [internalIsOpen, setInternalIsOpen] = useState(defaultIsOpen);
  const isOpen = isControlledOpen ? Boolean(effectiveControlledOpen) : internalIsOpen;

  const isDisabled = disabled || stateProp === 'disabled';
  const isActive = stateProp === 'active' || isOpen;
  const isHover = stateProp === 'hover';

  const derivedState: DropdownState = isDisabled
    ? 'disabled'
    : isActive
    ? 'active'
    : isHover
    ? 'hover'
    : 'default';

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (!isControlledOpen) {
          setInternalIsOpen(false);
        }
        onOpenChange?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isControlledOpen, onOpenChange]);

  const handleToggle = () => {
    if (isDisabled) return;
    const next = !isOpen;
    if (!isControlledOpen) {
      setInternalIsOpen(next);
    }
    onOpenChange?.(next);
  };

  const renderTrigger = () => {
    if (trigger) {
      return (
        <div
          className={`fmdqui-dropdown__custom-trigger ${isDisabled ? 'is-disabled' : ''}`}
          onClick={handleToggle}
        >
          {trigger}
        </div>
      );
    }

    if (type === 'avatar') {
      return (
        <button
          type="button"
          className={`fmdqui-dropdown__avatar-btn ${isOpen ? 'is-open' : ''} ${isDisabled ? 'is-disabled' : ''}`}
          onClick={handleToggle}
          disabled={isDisabled}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-label="User menu"
        >
          <Avatar size="sm" type="Image" imageUrl={avatarUrl} />
        </button>
      );
    }

    if (type === 'icon-only') {
      return (
        <button
          type="button"
          className={`fmdqui-dropdown__icon-btn ${isOpen ? 'is-open' : ''} ${isDisabled ? 'is-disabled' : ''}`}
          onClick={handleToggle}
          disabled={isDisabled}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-label="More options"
        >
          <Icon name={iconName} variant="linear" size={18} />
        </button>
      );
    }

    // Default trigger: Button with chevron
    return (
      <Button
        size="sm"
        variant="secondary"
        buttonType="outlined"
        disabled={isDisabled}
        onClick={handleToggle}
        className={`fmdqui-dropdown__btn-trigger ${isOpen ? 'is-open' : ''}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <span className="fmdqui-dropdown__btn-content">
          <span>{label}</span>
          <Icon
            name="chevron-down"
            variant="linear"
            size={16}
            className={`fmdqui-dropdown__chevron ${isOpen ? 'is-open' : ''}`}
          />
        </span>
      </Button>
    );
  };

  const containerClasses = [
    'fmdqui-dropdown',
    `fmdqui-dropdown--type-${type}`,
    `fmdqui-dropdown--state-${derivedState}`,
    isOpen ? 'fmdqui-dropdown--open' : '',
    isDisabled ? 'fmdqui-dropdown--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} ref={containerRef} style={style} {...props}>
      <div className="fmdqui-dropdown__trigger-wrapper">{renderTrigger()}</div>

      <DropdownMenu isOpen={isOpen} align={align}>
        {children ? (
          children
        ) : sections ? (
          sections.map((sec, secIdx) => (
            <DropdownSection
              key={secIdx}
              header={
                sec.header ? (
                  <DropdownHeader
                    title={sec.header.title}
                    subtitle={sec.header.subtitle}
                    borders={sec.header.borders}
                  />
                ) : undefined
              }
              hasDivider={sec.hasDivider ?? secIdx < sections.length - 1}
            >
              {sec.items.map((item, itemIdx) => (
                <DropdownItem
                  key={item.id ?? itemIdx}
                  type={item.type}
                  state={item.state}
                  label={item.label}
                  icon={item.icon}
                  avatarUrl={item.avatarUrl}
                  shortcut={item.shortcut}
                  hasCheckbox={item.hasCheckbox}
                  selected={item.selected}
                  disabled={item.disabled}
                  destructive={item.destructive}
                  onClick={() => {
                    item.onClick?.();
                    if (!isControlledOpen) setInternalIsOpen(false);
                  }}
                />
              ))}
            </DropdownSection>
          ))
        ) : items ? (
          <DropdownSection>
            {items.map((item, itemIdx) => (
              <DropdownItem
                key={item.id ?? itemIdx}
                type={item.type}
                state={item.state}
                label={item.label}
                icon={item.icon}
                avatarUrl={item.avatarUrl}
                shortcut={item.shortcut}
                hasCheckbox={item.hasCheckbox}
                selected={item.selected}
                disabled={item.disabled}
                destructive={item.destructive}
                onClick={() => {
                  item.onClick?.();
                  if (!isControlledOpen) setInternalIsOpen(false);
                }}
              />
            ))}
          </DropdownSection>
        ) : null}
      </DropdownMenu>
    </div>
  );
};
Dropdown.displayName = 'Dropdown';
