import './NavMenu.css';
/**
 * @deprecated Replaced by `Sidebar` component (matching Figma Sidebar component set).
 * Will be removed in the next release.
 */
export {
  Sidebar as NavMenu,
  SidebarSection as NavGroup,
  SidebarMenuItem as NavItem,
} from '../Sidebar';

export type {
  SidebarProps as NavMenuProps,
  SidebarSectionProps as NavGroupProps,
  SidebarMenuItemProps as NavItemProps,
} from '../Sidebar';
