import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import './NavMenu.css';

interface NavMenuContextType {
  activeId?: string;
  setActiveId: (id: string) => void;
}

const NavMenuContext = createContext<NavMenuContextType | undefined>(undefined);

export interface NavMenuProps {
  className?: string;
  children: ReactNode;
  activeId?: string;
  onActiveChange?: (id: string) => void;
}

export const NavMenu: React.FC<NavMenuProps> = ({ className = '', children, activeId: propActiveId, onActiveChange }) => {
  const [internalActiveId, setInternalActiveId] = useState<string | undefined>(propActiveId);
  const activeId = propActiveId !== undefined ? propActiveId : internalActiveId;
  
  const handleSetActiveId = (id: string) => {
    setInternalActiveId(id);
    onActiveChange?.(id);
  };
  
  return (
    <NavMenuContext.Provider value={{ activeId, setActiveId: handleSetActiveId }}>
      <nav className={`fmdqui-nav-menu ${className}`}>
        {children}
      </nav>
    </NavMenuContext.Provider>
  );
};

export interface NavGroupProps {
  title: string;
  className?: string;
  children: ReactNode;
  defaultExpanded?: boolean;
}

export const NavGroup: React.FC<NavGroupProps> = ({ title, className = '', children, defaultExpanded = true }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  return (
    <div className={`fmdqui-nav-group ${className}`}>
      <button 
        className="fmdqui-nav-group-header" 
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className="fmdqui-nav-group-title">{title}</span>
        <svg 
          className={`fmdqui-nav-group-icon ${isExpanded ? 'fmdqui-nav-group-icon--expanded' : ''}`} 
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      {isExpanded && (
        <div className="fmdqui-nav-group-content">
          {children}
        </div>
      )}
    </div>
  );
};

export interface NavItemProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'id'> {
  id: string;
  icon?: ReactNode;
}

export const NavItem: React.FC<NavItemProps> = ({ id, icon, className = '', children, href, onClick, ...props }) => {
  const context = useContext(NavMenuContext);
  if (!context) throw new Error('NavItem must be used within NavMenu');
  
  const isActive = context.activeId === id;
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    context.setActiveId(id);
    onClick?.(e);
  };
  
  const classes = [
    'fmdqui-nav-item',
    isActive ? 'fmdqui-nav-item--active' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <a href={href} className={classes} onClick={handleClick} {...props}>
      {icon && <span className="fmdqui-nav-item-icon">{icon}</span>}
      <span className="fmdqui-nav-item-label">{children}</span>
    </a>
  );
};
