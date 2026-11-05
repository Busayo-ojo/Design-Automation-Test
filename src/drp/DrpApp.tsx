import React, { useState } from 'react';
import { DrpLayout } from './layouts/DrpLayout';
import { DashboardPage } from './pages/DashboardPage';
import { BenchmarkContributionsPage } from './pages/BenchmarkContributionsPage';
import { TradeDataReportingPage } from './pages/TradeDataReportingPage';
import { ApprovalsPage } from './pages/ApprovalsPage';
import { SurveillancePage } from './pages/SurveillancePage';
import { Heading, Text } from '../components/Typography';

export const DrpApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage onNavigate={setActiveTab} />;
      case 'benchmarks':
        return <BenchmarkContributionsPage />;
      case 'trades':
        return <TradeDataReportingPage />;
      case 'approvals':
        return <ApprovalsPage />;
      case 'surveillance':
        return <SurveillancePage />;
      case 'invoices':
        return (
          <div style={{ padding: '32px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--color-neutral-200)' }}>
            <Heading level={2}>Fees & Invoices Administration</Heading>
            <Text size="md" color="secondary" style={{ marginTop: '8px' }}>
              Dealing member fee schedules, due dates, NIBSS direct debit file generation, and billing reconciliation.
            </Text>
          </div>
        );
      case 'members':
        return (
          <div style={{ padding: '32px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--color-neutral-200)' }}>
            <Heading level={2}>Users & Dealing Member Institutions</Heading>
            <Text size="md" color="secondary" style={{ marginTop: '8px' }}>
              Member institution registration, role assignments, security levels, and authorisation matrices.
            </Text>
          </div>
        );
      default:
        return <DashboardPage onNavigate={setActiveTab} />;
    }
  };

  return (
    <DrpLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DrpLayout>
  );
};

export default DrpApp;
