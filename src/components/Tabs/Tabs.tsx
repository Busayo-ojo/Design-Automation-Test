import React, { createContext, useContext, useState } from 'react';
import { Badge } from '../../elements/Badge/Badge';
import './Tabs.css';

export type TabsStyle = 'Line' | 'Pill';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
  style: TabsStyle;
  fullWidth: boolean;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export interface TabsProps {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
  style?: TabsStyle;
  fullWidth?: boolean;
}

export const Tabs: React.FC<TabsProps> = ({ 
  defaultValue, 
  className = '', 
  children,
  style = 'Line',
  fullWidth = false
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, style, fullWidth }}>
      <div className={`qasah-tabs qasah-tabs--${style.toLowerCase()} ${fullWidth ? 'qasah-tabs--full-width' : ''} ${className}`}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => {
  const context = useContext(TabsContext);
  const style = context?.style || 'Line';
  const fullWidth = context?.fullWidth || false;
  
  return (
    <div 
      className={`qasah-tab-list qasah-tab-list--${style.toLowerCase()} ${fullWidth ? 'qasah-tab-list--full-width' : ''} ${className}`} 
      role="tablist" 
      {...props}
    >
      {children}
    </div>
  );
};

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  hasIcon?: boolean;
  icon?: React.ReactNode;
  hasNumberTag?: boolean;
  numberTag?: string | number;
}

export const Tab: React.FC<TabProps> = ({ 
  value, 
  className = '', 
  children, 
  disabled,
  hasIcon = false,
  icon,
  hasNumberTag = false,
  numberTag,
  ...props 
}) => {
  const context = useContext(TabsContext);
  const [isHovered, setIsHovered] = useState(false);
  
  if (!context) throw new Error('Tab must be used within Tabs');
  
  const isActive = context.activeTab === value;
  const { style, fullWidth } = context;
  
  const tabClasses = [
    'qasah-tab',
    `qasah-tab--${style.toLowerCase()}`,
    isActive ? 'qasah-tab--active' : '',
    fullWidth ? 'qasah-tab--full-width' : '',
    className
  ].filter(Boolean).join(' ');

  // Dynamic Badge properties based on state
  // Default: accent/neutral
  // Hover: accent/blue
  // Active: filled/blue
  const getBadgeProps = () => {
    if (isActive) return { type: 'filled' as const, color: 'blue' as const };
    if (isHovered) return { type: 'accent' as const, color: 'blue' as const };
    return { type: 'accent' as const, color: 'neutral' as const };
  };

  const badgeProps = getBadgeProps();

  return (
    <button
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      className={tabClasses}
      onClick={() => !disabled && context.setActiveTab(value)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {hasIcon && icon && <span className="qasah-tab__icon">{icon}</span>}
      <span className="qasah-tab__label">{children}</span>
      {hasNumberTag && (
        <Badge 
          size="sm" 
          type={badgeProps.type} 
          color={badgeProps.color}
          className="qasah-tab__number-tag"
        >
          {numberTag}
        </Badge>
      )}
    </button>
  );
};

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabPanel: React.FC<TabPanelProps> = ({ value, className = '', children, ...props }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');
  
  if (context.activeTab !== value) return null;
  
  return (
    <div className={`qasah-tab-panel ${className}`} role="tabpanel" {...props}>
      {children}
    </div>
  );
};
