import React from 'react';
import { Icon } from '../../foundations/icons';
import './Breadcrumbs.css';

export type BreadcrumbState = 'default' | 'hover' | 'active' | 'disabled';

export interface BreadcrumbItemProps {
  /** Text or content displayed in the breadcrumb item. Matches Figma property `Label`. */
  label: React.ReactNode;
  /** Optional link destination. If provided, renders an `<a>` element. */
  href?: string;
  /** Interaction state. Matches Figma property `State`. */
  state?: BreadcrumbState;
  /** Whether to render leading icon. Matches Figma property `has icon`. */
  hasIcon?: boolean;
  /** Custom icon name from foundation icons or custom ReactNode. Matches Figma property `Icon`. Default: "heart". */
  icon?: string | React.ReactNode;
  /** Custom separator node. Default: "/". */
  separator?: React.ReactNode;
  /** Whether to render the separator. Default: true. */
  showSeparator?: boolean;
  /** Whether to render individual standalone top and bottom 1px dividers. Default: false. */
  hasBorders?: boolean;
  /** Click callback. */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /** Optional custom element type (e.g. Next.js Link or React Router Link). */
  as?: React.ElementType;
  /** Custom CSS class. */
  className?: string;
}

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  label,
  href,
  state = 'default',
  hasIcon = false,
  icon = 'heart',
  separator = '/',
  showSeparator = true,
  hasBorders = false,
  onClick,
  as: Component,
  className = '',
}) => {
  const isActive = state === 'active';
  const isDisabled = state === 'disabled';

  const renderIcon = () => {
    if (!hasIcon) return null;
    if (typeof icon === 'string') {
      return (
        <span className="fmdqui-breadcrumb-item__icon" aria-hidden="true">
          <Icon name={icon} size={20} variant="linear" />
        </span>
      );
    }
    return (
      <span className="fmdqui-breadcrumb-item__icon" aria-hidden="true">
        {icon}
      </span>
    );
  };

  const itemClasses = [
    'fmdqui-breadcrumb-item',
    `fmdqui-breadcrumb-item--state-${state}`,
    hasBorders ? 'fmdqui-breadcrumb-item--standalone-bordered' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Determine tag to render
  const Tag = Component || (href && !isDisabled ? 'a' : onClick && !isDisabled ? 'button' : 'span');

  return (
    <div className={itemClasses}>
      {showSeparator && (
        <span className="fmdqui-breadcrumb-item__separator" aria-hidden="true">
          {separator}
        </span>
      )}
      <Tag
        href={href}
        onClick={isDisabled ? undefined : onClick}
        className="fmdqui-breadcrumb-item__content"
        aria-current={isActive ? 'page' : undefined}
        aria-disabled={isDisabled ? 'true' : undefined}
        tabIndex={isDisabled ? -1 : undefined}
      >
        {renderIcon()}
        <span className="fmdqui-breadcrumb-item__label">{label}</span>
      </Tag>
    </div>
  );
};

