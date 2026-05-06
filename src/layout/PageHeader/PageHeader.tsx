import React from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import './PageHeader.css';
import { Heading, Text } from '../../components/Typography';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  breadcrumbs, 
  actions, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`qasah-page-header ${className}`} {...props}>
      <div className="qasah-page-header__left">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="qasah-page-header__breadcrumbs">
            <ol>
              {breadcrumbs.map((crumb, index) => (
                <li key={index}>
                  {crumb.href || crumb.onClick ? (
                    <a 
                      href={crumb.href || '#'} 
                      onClick={(e) => {
                        if (crumb.onClick) {
                          e.preventDefault();
                          crumb.onClick();
                        }
                      }}
                      className="qasah-page-header__breadcrumb-link"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="qasah-page-header__breadcrumb-current" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <span className="qasah-page-header__breadcrumb-separator">/</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Heading level={2} className="qasah-page-header__title">{title}</Heading>
        {description && (
          <Text color="secondary" className="qasah-page-header__description">
            {description}
          </Text>
        )}
      </div>
      {actions && (
        <div className="qasah-page-header__actions">
          {actions}
        </div>
      )}
    </div>
  );
};
