import React from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import './AppLayout.css';

export interface AppLayoutProps extends HTMLAttributes<HTMLDivElement> {
  sidebar?: ReactNode;
  topbar?: ReactNode;
  children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ 
  sidebar, 
  topbar, 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`fmdqui-app-layout ${className}`} {...props}>
      {sidebar && (
        <aside className="fmdqui-app-layout__sidebar">
          {sidebar}
        </aside>
      )}
      <div className="fmdqui-app-layout__main-wrapper">
        {topbar && (
          <header className="fmdqui-app-layout__topbar">
            {topbar}
          </header>
        )}
        <main className="fmdqui-app-layout__content">
          <div className="fmdqui-app-layout__content-inner">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
