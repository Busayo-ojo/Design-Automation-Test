import React, { createContext, useContext, useState, forwardRef } from 'react';
import type { ReactNode } from 'react';
import './Sidebar.css';
import { Icon } from '../../foundations/icons';
import { Badge } from '../../elements/Badge';
import { Avatar, type AvatarStatus } from '../../elements/Avatar';
import { Input } from '../../elements/Input';
import { Logo, FmdqLogo } from '../../elements/Logo';
import type { LogoProps } from '../../elements/Logo';

// ─── Types & Context ──────────────────────────────────────────────────────────

export type SidebarVariant = '1' | '2';
export type SidebarTheme = 'light' | 'blue' | 'dark-blue' | 'dark-grey';
export type SidebarState = 'default' | 'collapsed';
export type MenuItemType = 'default' | 'multi-layered' | 'icon-only';
export type MenuItemState = 'default' | 'hover' | 'selected';

interface SidebarContextType {
  activeId?: string;
  setActiveId: (id: string) => void;
  theme: SidebarTheme;
  collapsed: boolean;
  variant: SidebarVariant;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    return {
      activeId: undefined,
      setActiveId: () => {},
      theme: 'light' as SidebarTheme,
      collapsed: false,
      variant: '1' as SidebarVariant,
    };
  }
  return context;
};

// Re-export Logo and FmdqLogo for backwards-compatibility
export { Logo, FmdqLogo };
export type { LogoProps };

// ─── 1. Sub-Menu Item Atom (Figma 2437:57101) ────────────────────────────────

export type SubMenuItemState = 'default' | 'selected';
export type SubMenuItemTheme =
  | 'light'
  | 'secondary blue'
  | 'dark blue'
  | 'dark'
  | 'blue'
  | 'dark-blue'
  | 'dark-grey';

export interface SidebarSubMenuItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'label'> {
  id?: string;
  label: ReactNode;
  state?: SubMenuItemState;
  selected?: boolean;
  theme?: SubMenuItemTheme;
  badge?: ReactNode;
  onSelect?: () => void;
}

export const SidebarSubMenuItem = forwardRef<HTMLAnchorElement, SidebarSubMenuItemProps>(
  (
    {
      id,
      label,
      state: propState,
      selected: propSelected,
      theme: propTheme,
      badge,
      onSelect,
      className = '',
      onClick,
      href,
      ...props
    },
    ref
  ) => {
    const context = useSidebar();
    const isSelected =
      propState === 'selected' ||
      (propState === undefined && (propSelected ?? (id && context.activeId === id)));
    const effectiveState: SubMenuItemState = isSelected ? 'selected' : 'default';

    const rawTheme = propTheme ?? context.theme;
    const normalizedTheme =
      rawTheme === 'secondary blue' || rawTheme === 'blue'
        ? 'secondary-blue'
        : rawTheme === 'dark blue' || rawTheme === 'dark-blue'
        ? 'dark-blue'
        : rawTheme === 'dark' || rawTheme === 'dark-grey'
        ? 'dark'
        : 'light';

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (id) context.setActiveId(id);
      onSelect?.();
      onClick?.(e);
    };

    const classNames = [
      'fmdqui-sidebar-sub-item',
      `fmdqui-sidebar-sub-item--theme-${normalizedTheme}`,
      rawTheme === 'blue' || rawTheme === 'secondary blue' ? 'fmdqui-sidebar-sub-item--theme-blue' : '',
      rawTheme === 'dark' || rawTheme === 'dark-grey' ? 'fmdqui-sidebar-sub-item--theme-dark-grey' : '',
      `fmdqui-sidebar-sub-item--state-${effectiveState}`,
      isSelected ? 'fmdqui-sidebar-sub-item--selected' : '',
      className,
    ].filter(Boolean).join(' ');

    return (
      <a
        ref={ref}
        href={href || '#'}
        className={classNames}
        onClick={handleClick}
        aria-current={isSelected ? 'page' : undefined}
        {...props}
      >
        <span className="fmdqui-sidebar-sub-item__content">
          <span className="fmdqui-sidebar-sub-item__label">{label}</span>
        </span>
        {badge && <span className="fmdqui-sidebar-sub-item__badge">{badge}</span>}
      </a>
    );
  }
);
SidebarSubMenuItem.displayName = 'SidebarSubMenuItem';

// ─── 2. Menu Item Cell (Figma 2437:56486) ────────────────────────────────────

export interface SidebarMenuItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'id' | 'onSelect'> {
  id: string;
  label?: ReactNode;
  icon?: ReactNode;
  type?: MenuItemType;
  state?: MenuItemState;
  theme?: SidebarTheme;
  selected?: boolean;
  hasCounter?: boolean;
  counter?: ReactNode;
  badge?: ReactNode;
  shortcut?: ReactNode;
  href?: string;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onToggleExpand?: (expanded: boolean) => void;
  onSelect?: (id: string) => void;
  subItems?: ReactNode;
  children?: ReactNode;
}

export const SidebarMenuItem = forwardRef<HTMLElement, SidebarMenuItemProps>(
  (
    {
      id,
      label,
      icon,
      type: propType,
      state: propState,
      theme: propTheme,
      selected: propSelected,
      hasCounter = true,
      counter,
      badge,
      shortcut,
      href,
      defaultExpanded = false,
      expanded: controlledExpanded,
      onToggleExpand,
      onSelect,
      subItems,
      children,
      className = '',
      onClick,
      ...props
    },
    ref
  ) => {
    const context = useSidebar();
    const effectiveTheme = propTheme ?? context.theme;
    const isCollapsed = context.collapsed;
    const effectiveType: MenuItemType = isCollapsed
      ? 'icon-only'
      : propType ?? (subItems || children ? 'multi-layered' : 'default');

    const isSelected = propSelected ?? context.activeId === id;
    const effectiveState = propState ?? (isSelected ? 'selected' : 'default');

    const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded);
    const isExpanded = controlledExpanded !== undefined ? controlledExpanded : uncontrolledExpanded;

    const handleToggleExpand = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const next = !isExpanded;
      setUncontrolledExpanded(next);
      onToggleExpand?.(next);
    };

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      if (effectiveType === 'multi-layered' && !href) {
        handleToggleExpand(e);
      }
      context.setActiveId(id);
      onSelect?.(id);
      onClick?.(e);
    };

    const badgeContent = counter ?? badge;
    const showCounter =
      hasCounter && badgeContent !== undefined && badgeContent !== null && !isCollapsed;

    const classNames = [
      'fmdqui-sidebar-menu-item',
      `fmdqui-sidebar-menu-item--type-${effectiveType}`,
      `fmdqui-sidebar-menu-item--state-${effectiveState}`,
      `fmdqui-sidebar-menu-item--theme-${effectiveTheme.replace(' ', '-')}`,
      isSelected ? 'fmdqui-sidebar-menu-item--selected' : '',
      isExpanded ? 'fmdqui-sidebar-menu-item--expanded' : '',
      className,
    ].filter(Boolean).join(' ');

    const isIconOnly = effectiveType === 'icon-only' || isCollapsed;

    const defaultIcon = <Icon name="hashtag" variant="linear" size={20} />;

    const content = (
      <>
        <span className="fmdqui-sidebar-menu-item__left">
          <span className="fmdqui-sidebar-menu-item__icon" aria-hidden="true">
            {icon ?? defaultIcon}
          </span>
          {!isIconOnly && (
            <span className="fmdqui-sidebar-menu-item__label fmdq-text fmdq-text--size-sm">
              {label}
            </span>
          )}
        </span>

        {!isIconOnly && (
          <span className="fmdqui-sidebar-menu-item__right">
            {showCounter && (
              <span className="fmdqui-sidebar-menu-item__counter">
                {typeof badgeContent === 'number' || typeof badgeContent === 'string' ? (
                  <Badge size="sm" type="accent" color="neutral">
                    {badgeContent}
                  </Badge>
                ) : (
                  badgeContent
                )}
              </span>
            )}

            {shortcut && (
              <span className="fmdqui-sidebar-menu-item__shortcut">{shortcut}</span>
            )}

            {effectiveType === 'multi-layered' && (
              <span
                className={`fmdqui-sidebar-menu-item__arrow ${
                  isExpanded ? 'fmdqui-sidebar-menu-item__arrow--open' : ''
                }`}
                onClick={handleToggleExpand}
                aria-label={isExpanded ? 'Collapse sub-menu' : 'Expand sub-menu'}
              >
                <Icon name="chevron-down" variant="linear" size={14} />
              </span>
            )}
          </span>
        )}
      </>
    );

    const subContent = (subItems || children) && isExpanded && !isIconOnly && (
      <div className="fmdqui-sidebar-menu-item__sub-menu" role="group">
        {subItems || children}
      </div>
    );

    if (href) {
      return (
        <div className="fmdqui-sidebar-menu-item-wrapper">
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={classNames}
            onClick={handleClick}
            aria-current={isSelected ? 'page' : undefined}
            title={isCollapsed && typeof label === 'string' ? label : undefined}
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {content}
          </a>
          {subContent}
        </div>
      );
    }

    return (
      <div className="fmdqui-sidebar-menu-item-wrapper">
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          className={classNames}
          onClick={handleClick}
          aria-expanded={effectiveType === 'multi-layered' ? isExpanded : undefined}
          title={isCollapsed && typeof label === 'string' ? label : undefined}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {content}
        </button>
        {subContent}
      </div>
    );
  }
);
SidebarMenuItem.displayName = 'SidebarMenuItem';

// ─── 3. Sidebar Section Row (Figma 3167:122883) ──────────────────────────────

export interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  hasTitle?: boolean;
  hasDivider?: boolean;
  collapsed?: boolean;
  theme?: SidebarTheme;
  children: ReactNode;
}

export const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  hasTitle = true,
  hasDivider = false,
  collapsed: propCollapsed,
  theme: propTheme,
  children,
  className = '',
  ...props
}) => {
  const context = useSidebar();
  const isCollapsed = propCollapsed ?? context.collapsed;
  const effectiveTheme = propTheme ?? context.theme;

  const classNames = [
    'fmdqui-sidebar-section',
    `fmdqui-sidebar-section--theme-${effectiveTheme.replace(' ', '-')}`,
    isCollapsed ? 'fmdqui-sidebar-section--collapsed' : 'fmdqui-sidebar-section--default',
    hasDivider ? 'fmdqui-sidebar-section--has-divider' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      {hasTitle && title && !isCollapsed && (
        <div className="fmdqui-sidebar-section__title-row">
          <span className="fmdqui-sidebar-section__title fmdq-text fmdq-text--size-sm fmdq-text--weight-medium">
            {title}
          </span>
        </div>
      )}

      {hasTitle && isCollapsed && (
        <div className="fmdqui-sidebar-section__collapsed-divider" aria-hidden="true">
          <span className="fmdqui-sidebar-section__dot" />
        </div>
      )}

      <div className="fmdqui-sidebar-section__content">{children}</div>

      {hasDivider && <div className="fmdqui-sidebar-section__divider" />}
    </div>
  );
};
SidebarSection.displayName = 'SidebarSection';

// ─── 4. User Profile & Account Flyout (Figma 2438:59860 & 10322:286059) ─────

export interface SidebarProfileProps {
  name?: string;
  email?: string;
  avatarSrc?: string;
  theme?: SidebarTheme;
  collapsed?: boolean;
  variant?: SidebarVariant;
  onSignOut?: () => void;
  onProfileClick?: () => void;
}

export const SidebarProfile: React.FC<SidebarProfileProps> = ({
  name = 'David Eno',
  email = 'david.e@fmdq.ui',
  avatarSrc,
  theme: propTheme,
  collapsed: propCollapsed,
  variant: propVariant,
  onSignOut,
  onProfileClick,
}) => {
  const context = useSidebar();
  const effectiveTheme = propTheme ?? context.theme;
  const isCollapsed = propCollapsed ?? context.collapsed;
  const effectiveVariant = propVariant ?? context.variant;

  const classNames = [
    'fmdqui-sidebar-profile',
    `fmdqui-sidebar-profile--theme-${effectiveTheme.replace(' ', '-')}`,
    `fmdqui-sidebar-profile--variant-${effectiveVariant}`,
    isCollapsed ? 'fmdqui-sidebar-profile--collapsed' : '',
  ].filter(Boolean).join(' ');

  const nameInitials = name
    ? name
        .split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'DE';

  return (
    <div className={classNames}>
      <button
        type="button"
        className="fmdqui-sidebar-profile__button"
        onClick={onProfileClick}
        title={isCollapsed ? `${name} (${email})` : undefined}
      >
        <Avatar
          size="md"
          type={avatarSrc ? 'Image' : 'Initials'}
          imageUrl={avatarSrc}
          initials={nameInitials}
          statusIcon="online"
        />
        {!isCollapsed && (
          <div className="fmdqui-sidebar-profile__info">
            <span className="fmdqui-sidebar-profile__name fmdq-text fmdq-text--size-sm fmdq-text--weight-semibold">
              {name}
            </span>
            <span className="fmdqui-sidebar-profile__email fmdq-text fmdq-text--size-xs">
              {email}
            </span>
          </div>
        )}
      </button>

      {!isCollapsed && effectiveVariant === '1' && (
        <button
          type="button"
          className="fmdqui-sidebar-profile__signout-btn"
          onClick={onSignOut}
          aria-label="Log out"
          title="Log out"
        >
          <Icon name="sign-out" variant="linear" size={20} />
        </button>
      )}

      {!isCollapsed && effectiveVariant === '2' && (
        <span
          className="fmdqui-sidebar-profile__action-icon"
          aria-hidden="true"
          onClick={onProfileClick}
        >
          <Icon name="chevron-v" variant="linear" size={20} />
        </span>
      )}
    </div>
  );
};
SidebarProfile.displayName = 'SidebarProfile';

export interface SidebarAccountMenuItem {
  key: string;
  label?: string;
  icon?: string;
  iconVariant?: 'linear' | 'bold';
  type?: 'item' | 'divider';
  destructive?: boolean;
}

export interface SidebarAccountMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    name: string;
    email: string;
    avatarSrc?: string;
    status?: AvatarStatus;
  };
  items?: SidebarAccountMenuItem[];
  showHeader?: boolean;
  hasBackdrop?: boolean;
  lastSignedInText?: string;
  onItemClick?: (key: string) => void;
  className?: string;
}

const DEFAULT_ACCOUNT_MENU_ITEMS: SidebarAccountMenuItem[] = [
  { key: 'settings', label: 'Account settings', icon: 'user-circle', iconVariant: 'bold' },
  { key: 'security', label: 'Security', icon: 'shield-tick', iconVariant: 'bold' },
  { key: 'notifications', label: 'Notification preferences', icon: 'bell', iconVariant: 'bold' },
  { key: 'divider-1', type: 'divider' },
  { key: 'guide', label: 'Submission guide', icon: 'book', iconVariant: 'bold' },
  { key: 'support', label: 'Contact support', icon: 'mail', iconVariant: 'bold' },
  { key: 'divider-2', type: 'divider' },
  { key: 'logout', label: 'Log out', icon: 'sign-out', iconVariant: 'bold', destructive: true },
];

export const SidebarAccountMenu: React.FC<SidebarAccountMenuProps> = ({
  isOpen,
  onClose,
  user = {
    name: 'Marvin Marvin Ogah',
    email: 'MSG Admin',
    status: 'online',
  },
  items = DEFAULT_ACCOUNT_MENU_ITEMS,
  showHeader = false,
  hasBackdrop = true,
  lastSignedInText = 'Last signed in 26 Oct 2026, 08:12 · Lagos',
  onItemClick,
  className = '',
}) => {
  if (!isOpen) return null;

  return (
    <>
      {hasBackdrop && (
        <div className="fmdqui-sidebar-account-menu__backdrop" onClick={onClose} />
      )}
      <div
        className={`fmdqui-sidebar-account-menu ${className}`.trim()}
        role="dialog"
        aria-modal="true"
      >
        {showHeader && (
          <>
            <div className="fmdqui-sidebar-account-menu__header">
              <Avatar
                size="sm"
                type={user.avatarSrc ? 'Image' : 'Initials'}
                imageUrl={user.avatarSrc}
                initials={user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                statusIcon={user.status}
              />
              <div className="fmdqui-sidebar-account-menu__user-info">
                <span className="fmdqui-sidebar-account-menu__name fmdq-text fmdq-text--size-sm fmdq-text--weight-semibold">
                  {user.name}
                </span>
                <span className="fmdqui-sidebar-account-menu__email fmdq-text fmdq-text--size-xs">
                  {user.email}
                </span>
              </div>
            </div>
            <div className="fmdqui-sidebar-account-menu__divider" />
          </>
        )}

        <div className="fmdqui-sidebar-account-menu__items" role="menu">
          {items.map(item => {
            if (item.type === 'divider') {
              return (
                <div
                  key={item.key}
                  className="fmdqui-sidebar-account-menu__divider"
                  role="separator"
                />
              );
            }

            return (
              <button
                key={item.key}
                type="button"
                className={`fmdqui-sidebar-account-menu__item ${
                  item.destructive ? 'fmdqui-sidebar-account-menu__item--destructive' : ''
                }`.trim()}
                onClick={() => {
                  onItemClick?.(item.key);
                  onClose();
                }}
                role="menuitem"
              >
                <span className="fmdqui-sidebar-account-menu__item-left">
                  {item.icon && (
                    <Icon
                      name={item.icon}
                      variant={item.iconVariant ?? 'bold'}
                      size="20px"
                      color={
                        item.destructive
                          ? 'var(--color-error-600, #BA110B)'
                          : 'var(--color-primary-700, #1D326D)'
                      }
                    />
                  )}
                  <span className="fmdqui-sidebar-account-menu__item-label">
                    {item.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {lastSignedInText && (
          <div className="fmdqui-sidebar-account-menu__footer">
            <span className="fmdqui-sidebar-account-menu__footer-text">
              {lastSignedInText}
            </span>
          </div>
        )}
      </div>
    </>
  );
};
SidebarAccountMenu.displayName = 'SidebarAccountMenu';

// ─── 5. Full Sidebar Column Composite (Figma 3167:145002) ───────────────────

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SidebarVariant;
  theme?: SidebarTheme;
  state?: SidebarState;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  activeId?: string;
  onActiveChange?: (id: string) => void;
  hasSearch?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logo?: ReactNode;
  profile?: ReactNode;
  isAccountMenuOpen?: boolean;
  defaultAccountMenuOpen?: boolean;
  onAccountMenuToggle?: (open: boolean) => void;
  user?: {
    name: string;
    email: string;
    avatarSrc?: string;
    onSignOut?: () => void;
  };
  footerSection?: ReactNode;
  children: ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  variant = '1',
  theme = 'light',
  state = 'default',
  collapsed: propCollapsed,
  onToggleCollapse,
  activeId: propActiveId,
  onActiveChange,
  hasSearch = true,
  searchPlaceholder = 'Search',
  searchValue,
  onSearchChange,
  logo,
  profile,
  isAccountMenuOpen: propIsAccountMenuOpen,
  defaultAccountMenuOpen = false,
  onAccountMenuToggle,
  user = {
    name: 'David Eno',
    email: 'david.e@fmdq.ui',
  },
  footerSection,
  children,
  className = '',
  ...props
}) => {
  const isCollapsed = propCollapsed !== undefined ? propCollapsed : state === 'collapsed';
  const [internalActiveId, setInternalActiveId] = useState<string | undefined>(propActiveId);
  const activeId = propActiveId !== undefined ? propActiveId : internalActiveId;
  const [internalAccountMenuOpen, setInternalAccountMenuOpen] = useState(defaultAccountMenuOpen);
  const isAccountMenuOpen = propIsAccountMenuOpen !== undefined ? propIsAccountMenuOpen : internalAccountMenuOpen;

  const toggleAccountMenu = (open?: boolean) => {
    const next = open !== undefined ? open : !isAccountMenuOpen;
    setInternalAccountMenuOpen(next);
    onAccountMenuToggle?.(next);
  };

  const handleSetActiveId = (id: string) => {
    setInternalActiveId(id);
    onActiveChange?.(id);
  };

  const classNames = [
    'fmdqui-sidebar',
    `fmdqui-sidebar--variant-${variant}`,
    `fmdqui-sidebar--theme-${theme.replace(' ', '-')}`,
    isCollapsed ? 'fmdqui-sidebar--collapsed' : 'fmdqui-sidebar--default',
    className,
  ].filter(Boolean).join(' ');

  // Official exportable Logo component
  const resolvedLogo = logo ?? <Logo theme={theme} />;

  const defaultProfile = (
    <SidebarProfile
      name={user.name}
      email={user.email}
      avatarSrc={user.avatarSrc}
      theme={theme}
      collapsed={isCollapsed}
      variant={variant}
      onSignOut={user.onSignOut}
      onProfileClick={() => toggleAccountMenu()}
    />
  );

  const resolvedProfile = profile ?? defaultProfile;

  const handleAsideClick = (e: React.MouseEvent<HTMLElement>) => {
    props.onClick?.(e);
    if (isCollapsed && onToggleCollapse) {
      onToggleCollapse();
    }
  };

  return (
    <SidebarContext.Provider
      value={{
        activeId,
        setActiveId: handleSetActiveId,
        theme,
        collapsed: isCollapsed,
        variant,
      }}
    >
      <aside className={classNames} onClick={handleAsideClick} {...props}>
        {/* ── Top Section ── */}
        <div className="fmdqui-sidebar__top-section">
          {variant === '1' ? (
            isCollapsed ? (
              <div className="fmdqui-sidebar__toggle-wrap">
                <button
                  type="button"
                  className="fmdqui-sidebar__menu-collapsed-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleCollapse?.();
                  }}
                  aria-label="Expand sidebar"
                  title="Expand sidebar"
                >
                  <Icon
                    name="chevron-right"
                    variant="linear"
                    size={24}
                    color="var(--color-secondary-500, #CC9933)"
                  />
                </button>
              </div>
            ) : (
              <div className="fmdqui-sidebar__logo-container">{resolvedLogo}</div>
            )
          ) : (
            <div className="fmdqui-sidebar__profile-container">
              {resolvedProfile}
              <SidebarAccountMenu
                isOpen={isAccountMenuOpen}
                onClose={() => toggleAccountMenu(false)}
                onItemClick={key => {
                  if (key === 'logout') user.onSignOut?.();
                }}
              />
            </div>
          )}

          {/* Search bar (Variant 1: under logo; Variant 2: under profile) */}
          {hasSearch && !isCollapsed && (
            <div className="fmdqui-sidebar__search-wrap">
              <Input
                size="sm"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={onSearchChange}
                leadingIcon={<Icon name="search" variant="linear" size={16} />}
                hasLabel={false}
                hasHelperText={false}
                hasRightIcon={false}
                hasLeftIcon={true}
                className="fmdqui-sidebar__search-input"
              />
            </div>
          )}

          {hasSearch && isCollapsed && (
            <button
              type="button"
              className="fmdqui-sidebar__search-collapsed-btn"
              onClick={(e) => {
                e.stopPropagation();
                onToggleCollapse?.();
              }}
              aria-label="Search"
              title="Search"
            >
              <Icon name="search" variant="linear" size={20} />
            </button>
          )}

          {/* Body Section (Menu Sections) */}
          <div className="fmdqui-sidebar__body-section">{children}</div>
        </div>

        {/* ── Bottom Section ── */}
        <div className="fmdqui-sidebar__bottom-section">
          {footerSection && (
            <div className="fmdqui-sidebar__footer-section">{footerSection}</div>
          )}

          {variant === '1' ? (
            <div className="fmdqui-sidebar__profile-container">
              {resolvedProfile}
              <SidebarAccountMenu
                isOpen={isAccountMenuOpen}
                onClose={() => toggleAccountMenu(false)}
                onItemClick={key => {
                  if (key === 'logout') user.onSignOut?.();
                }}
              />
            </div>
          ) : isCollapsed ? (
            <div className="fmdqui-sidebar__toggle-wrap">
              <button
                type="button"
                className="fmdqui-sidebar__menu-collapsed-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCollapse?.();
                }}
                aria-label="Expand sidebar"
                title="Expand sidebar"
              >
                <Icon
                  name="chevron-right"
                  variant="linear"
                  size={24}
                  color="var(--color-secondary-500, #CC9933)"
                />
              </button>
            </div>
          ) : (
            <div className="fmdqui-sidebar__logo-container">{resolvedLogo}</div>
          )}
        </div>
      </aside>
    </SidebarContext.Provider>
  );
};
Sidebar.displayName = 'Sidebar';
