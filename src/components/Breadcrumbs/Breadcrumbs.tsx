import React from 'react';
import { BreadcrumbItem } from './BreadcrumbItem';
import type { BreadcrumbItemProps } from './BreadcrumbItem';
import './Breadcrumbs.css';

export interface BreadcrumbsProps {
  /** Array of breadcrumb item configurations. */
  items?: BreadcrumbItemProps[];
  /** Whether the trail is bounded by top and bottom 1px dividers (#E4E7EC). Matches Figma `has borders`. Default: true. */
  hasBorders?: boolean;
  /** Global separator node across all items. Default: "/". */
  separator?: React.ReactNode;
  /** Whether items display leading icons. Default: false. */
  hasIcon?: boolean;
  /** Custom icon applied to all items if not specified on item. Default: "heart". */
  icon?: string | React.ReactNode;
  /** Accessible label for the breadcrumb navigation. Default: "Breadcrumb". */
  ariaLabel?: string;
  /** Declarative child nodes (e.g. `<BreadcrumbItem />`). */
  children?: React.ReactNode;
  /** Custom CSS class. */
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  hasBorders = true,
  separator = '/',
  hasIcon,
  icon,
  ariaLabel = 'Breadcrumb',
  children,
  className = '',
}) => {
  const containerClasses = [
    'fmdqui-breadcrumbs',
    hasBorders ? 'fmdqui-breadcrumbs--bordered' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav aria-label={ariaLabel} className={containerClasses}>
      <ol className="fmdqui-breadcrumbs__list">
        {items &&
          items.map((item, index) => {
            const itemHasIcon = item.hasIcon !== undefined ? item.hasIcon : hasIcon;
            const itemIcon = item.icon !== undefined ? item.icon : icon;
            const itemSep = item.separator !== undefined ? item.separator : separator;
            // First item in a trail has separator if specified or follows Figma Demo preview
            const showSep = item.showSeparator !== undefined ? item.showSeparator : true;

            return (
              <li key={index} className="fmdqui-breadcrumbs__item">
                <BreadcrumbItem
                  {...item}
                  hasIcon={itemHasIcon}
                  icon={itemIcon}
                  separator={itemSep}
                  showSeparator={showSep}
                  hasBorders={false} // Outer container provides borders when hasBorders is true
                />
              </li>
            );
          })}
        {children &&
          React.Children.map(children, (child, index) => {
            if (!React.isValidElement(child)) return child;
            return <li className="fmdqui-breadcrumbs__item" key={index}>{child}</li>;
          })}
      </ol>
    </nav>
  );
};

