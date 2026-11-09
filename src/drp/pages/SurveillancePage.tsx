import React from 'react';
import { Heading, Text } from '../../components/Typography';
import { Badge } from '../../elements/Badge';
import { Button } from '../../elements/Button';
import { Toast } from '../../components/Toast';
import { MOCK_SURVEILLANCE_METRICS } from '../services/mockData';

export const SurveillancePage: React.FC = () => {
  const infractions = [
    {
      id: 'INF-2026-08',
      dealingMember: 'Fidelity Bank PLC',
      code: 'FIDL',
      type: 'Infraction A (RFQ Response)',
      description: 'Responded to 28% of mandatory RFQs (Threshold: 35%)',
      timestamp: '2026-10-23',
      status: 'UNDER_REVIEW'
    },
    {
      id: 'INF-2026-09',
      dealingMember: 'Wema Bank PLC',
      code: 'WEMA',
      type: 'Infraction C (Firm Quote Delay)',
      description: 'Firm benchmark quotes submitted at 10:18 AM (Mandatory deadline: 10:00 AM)',
      timestamp: '2026-10-26',
      status: 'NOTICE_ISSUED'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* ── Page Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <Heading level={2}>Market Surveillance & Compliance</Heading>
          <Text size="md" color="secondary" style={{ marginTop: '4px' }}>
            Daily automated compliance monitoring per FMDQ Market Service Group Rules (RFQ, Spread, and 10:00 AM Firm Quotes).
          </Text>
        </div>
        <Button variant="secondary" size="sm" label="Export Monthly Infraction Summary" />
      </div>

      {/* ── Rule Definitions Banner ── */}
      <Toast
        type="banners"
        state="warning"
        title="Surveillance Compliance Standards (FMDQ Rulebook)"
        subtext="Infraction A: < 35% RFQ response rate. Infraction B: Delay in submitting weekly trade returns. Infraction C: Failure to place firm quotes by 10:00 AM."
      />

      {/* ── Compliance KPI Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-neutral-200)',
          borderRadius: 'var(--radius-12)',
          padding: '24px',
          boxShadow: 'var(--shadow-soft-sm)'
        }}>
          <Text size="xs" weight="bold" color="secondary" style={{ textTransform: 'uppercase' }}>
            RFQ Compliance (Threshold: 35%)
          </Text>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '8px' }}>
            <Heading level={2} style={{ color: 'var(--color-success-600)' }}>
              {MOCK_SURVEILLANCE_METRICS.rfqComplianceRate}%
            </Heading>
            <Badge type="accent" color="success">Compliant</Badge>
          </div>
          <Text size="xs" color="secondary" style={{ marginTop: '6px' }}>Average response rate across dealing members</Text>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-neutral-200)',
          borderRadius: 'var(--radius-12)',
          padding: '24px',
          boxShadow: 'var(--shadow-soft-sm)'
        }}>
          <Text size="xs" weight="bold" color="secondary" style={{ textTransform: 'uppercase' }}>
            Permitted Spread Compliance
          </Text>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '8px' }}>
            <Heading level={2} style={{ color: 'var(--color-primary-600)' }}>
              {MOCK_SURVEILLANCE_METRICS.spreadComplianceRate}%
            </Heading>
            <Badge type="accent" color="success">Optimal</Badge>
          </div>
          <Text size="xs" color="secondary" style={{ marginTop: '6px' }}>Within regulatory maximum basis point spreads</Text>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-neutral-200)',
          borderRadius: 'var(--radius-12)',
          padding: '24px',
          boxShadow: 'var(--shadow-soft-sm)'
        }}>
          <Text size="xs" weight="bold" color="secondary" style={{ textTransform: 'uppercase' }}>
            10:00 AM Firm Quote Compliance
          </Text>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '8px' }}>
            <Heading level={2} style={{ color: 'var(--color-success-600)' }}>
              {MOCK_SURVEILLANCE_METRICS.firmQuotesAt10AmRate}%
            </Heading>
            <Badge type="accent" color="success">On Target</Badge>
          </div>
          <Text size="xs" color="secondary" style={{ marginTop: '6px' }}>FGN Bonds & Treasury Bills order placement</Text>
        </div>
      </div>

      {/* ── Infractions Register ── */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--color-neutral-200)',
        borderRadius: 'var(--radius-16)',
        boxShadow: 'var(--shadow-soft-sm)',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-neutral-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Heading level={4}>Active Member Infractions</Heading>
            <Text size="xs" color="secondary">Surveillance exceptions flagged for review</Text>
          </div>
          <Badge type="accent" color="error">2 Open Infractions</Badge>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-neutral-50)', borderBottom: '1px solid var(--color-neutral-200)', color: 'var(--color-neutral-600)' }}>
                <th style={{ padding: '14px 20px', fontWeight: '600' }}>Ref</th>
                <th style={{ padding: '14px 20px', fontWeight: '600' }}>Dealing Member</th>
                <th style={{ padding: '14px 20px', fontWeight: '600' }}>Rule Infraction</th>
                <th style={{ padding: '14px 20px', fontWeight: '600' }}>Observation Details</th>
                <th style={{ padding: '14px 20px', fontWeight: '600' }}>Date</th>
                <th style={{ padding: '14px 20px', fontWeight: '600' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {infractions.map(inf => (
                <tr key={inf.id} style={{ borderBottom: '1px solid var(--color-neutral-100)' }}>
                  <td style={{ padding: '16px 20px', fontWeight: '600', color: 'var(--color-primary-700)' }}>{inf.id}</td>
                  <td style={{ padding: '16px 20px', fontWeight: '600' }}>{inf.dealingMember}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--color-error-700)', fontWeight: '500' }}>{inf.type}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--color-neutral-700)' }}>{inf.description}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--color-neutral-500)', fontSize: '13px' }}>{inf.timestamp}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <Badge type="accent" color={inf.status === 'NOTICE_ISSUED' ? 'error' : 'warning'}>
                      {inf.status === 'NOTICE_ISSUED' ? 'Notice Issued' : 'Under Review'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
