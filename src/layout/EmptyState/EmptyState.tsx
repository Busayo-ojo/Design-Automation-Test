import React from 'react';
import { EMPTY_STATE_ILLUSTRATIONS } from './illustrations';
import './EmptyState.css';

export type EmptyStateType =
  | 'search-results'
  | 'notifications'
  | 'tasks'
  | 'templates'
  | 'dashboard'
  | 'file-manager'
  | 'calendar'
  | 'forms'
  | 'inbox'
  | 'invoice'
  | 'team'
  | 'shopping-cart'
  | 'media'
  | 'subscriptions'
  | 'survey'
  | 'favorites'
  | 'contacts'
  | 'inventory'
  | 'chat'
  | 'data'
  | 'custom';

export interface EmptyStateProps {
  /**
   * Empty state illustration type matching Figma "Empty State" component set (5249:482).
   * Supports: 'search-results', 'notifications', 'tasks', 'templates', 'dashboard',
   * 'file-manager', 'calendar', 'forms', 'inbox', 'invoice', 'team', 'shopping-cart',
   * 'media', 'subscriptions', 'survey', 'favorites', 'contacts', 'inventory', 'chat'.
   */
  type?: EmptyStateType;
  /**
   * Whether to render the full color illustration (true) or greyscale monotone (false).
   * Matches Figma "Color" variant (default: true).
   */
  color?: boolean;
  /** Primary heading title */
  title: React.ReactNode;
  /** Supporting explanatory description */
  description?: React.ReactNode;
  /** Custom illustration node override */
  illustration?: React.ReactNode;
  /** Primary action button or CTA */
  action?: React.ReactNode;
  /** Secondary action button */
  secondaryAction?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom inline style */
  style?: React.CSSProperties;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'search-results',
  color = true,
  title,
  description,
  illustration,
  action,
  secondaryAction,
  className = '',
  style,
}) => {
  const renderIllustration = () => {
    if (illustration) {
      return illustration;
    }

    const pair = EMPTY_STATE_ILLUSTRATIONS[type] ?? EMPTY_STATE_ILLUSTRATIONS['search-results'];
    const src = color ? pair.color : pair.mono;
    const altText = typeof title === 'string' ? title : `${type} empty state illustration`;

    return (
      <img
        src={src}
        alt={altText}
        className="fmdqui-empty-state__image"
        width={150}
        height={150}
        loading="lazy"
      />
    );
  };

  return (
    <div className={`fmdqui-empty-state ${className}`.trim()} style={style}>
      <div className="fmdqui-empty-state__illustration">
        {renderIllustration()}
      </div>

      <div className="fmdqui-empty-state__content">
        <h3 className="fmdqui-empty-state__title">{title}</h3>
        {description && (
          <p className="fmdqui-empty-state__description">{description}</p>
        )}
      </div>

      {(action || secondaryAction) && (
        <div className="fmdqui-empty-state__actions">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
};
EmptyState.displayName = 'EmptyState';
