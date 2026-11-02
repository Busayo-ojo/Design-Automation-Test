import React from 'react';
import { AppLayout } from '../../layout/AppLayout';
import { TopBar } from '../../layout/TopBar';
import { NavMenu, NavGroup, NavItem } from '../../components/NavMenu';
import { Avatar } from '../../elements/Avatar/Avatar';
import { Badge } from '../../elements/Badge';
import { CURRENT_USER } from '../services/mockData';
import './DrpLayout.css';

export interface DrpLayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}

export const DrpLayout: React.FC<DrpLayoutProps> = ({ activeTab, onTabChange, children }) => {
  const topbar = (
    <TopBar
      leftContent={
        <div className="drp-brand">
          <span className="drp-brand__logo">
            <span style={{ color: 'var(--color-primary-600)' }}>FMDQ</span> DRP
          </span>
          <span className="drp-brand__badge">MSG Portal v1.1</span>
        </div>
      }
      rightContent={
        <div className="drp-topbar-right">
          <Badge type="accent" color="success">System Live</Badge>
          <div className="drp-user-pill">
            <Avatar initials="MO" size="sm" imageUrl={CURRENT_USER.avatarUrl} type="Image" />
            <div className="drp-user-pill__info">
              <span className="drp-user-pill__name">{CURRENT_USER.name}</span>
              <span className="drp-user-pill__role">{CURRENT_USER.institutionCode} • Admin</span>
            </div>
          </div>
        </div>
      }
    />
  );

  const sidebar = (
    <NavMenu activeId={activeTab} onActiveChange={onTabChange}>
      <NavGroup title="CORE MODULES">
        <NavItem id="dashboard" onClick={() => onTabChange('dashboard')}>
          📊 Executive Dashboard
        </NavItem>
        <NavItem id="benchmarks" onClick={() => onTabChange('benchmarks')}>
          🏛️ Benchmark Contributions
        </NavItem>
        <NavItem id="trades" onClick={() => onTabChange('trades')}>
          📈 Trade Data Reporting
        </NavItem>
      </NavGroup>

      <NavGroup title="CONTROL & SURVEILLANCE">
        <NavItem id="approvals" onClick={() => onTabChange('approvals')}>
          ✅ Authorisation Queue
        </NavItem>
        <NavItem id="surveillance" onClick={() => onTabChange('surveillance')}>
          🛡️ Market Surveillance
        </NavItem>
      </NavGroup>

      <NavGroup title="ADMINISTRATION">
        <NavItem id="invoices" onClick={() => onTabChange('invoices')}>
          🧾 Fees & Invoices
        </NavItem>
        <NavItem id="members" onClick={() => onTabChange('members')}>
          👥 Users & Dealing Members
        </NavItem>
      </NavGroup>
    </NavMenu>
  );

  return (
    <AppLayout topbar={topbar} sidebar={sidebar}>
      {children}
    </AppLayout>
  );
};
