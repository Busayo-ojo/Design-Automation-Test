import React from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import './TopBar.css';

export interface TopBarProps extends HTMLAttributes<HTMLDivElement> {
  leftContent?: ReactNode;
  centerContent?: ReactNode;
  rightContent?: ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  leftContent, 
  centerContent, 
  rightContent, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`fmdqui-topbar ${className}`} {...props}>
      <div className="fmdqui-topbar__left">{leftContent}</div>
      <div className="fmdqui-topbar__center">{centerContent}</div>
      <div className="fmdqui-topbar__right">{rightContent}</div>
    </div>
  );
};
