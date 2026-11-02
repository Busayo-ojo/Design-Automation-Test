import React from 'react';
import { Heading, Text } from '../../components/Typography';
import { Toast } from '../../components/Toast';
import { Badge } from '../../elements/Badge';
import { Button } from '../../elements/Button';
import { 
  MOCK_BENCHMARKS, 
  MOCK_APPROVAL_QUEUE, 
  MOCK_SURVEILLANCE_METRICS 
} from '../services/mockData';

export interface DashboardPageProps {
  onNavigate: (tab: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* ── Welcome & Operational Notice ── */}
      <div>
        <Toast
          type="banners"
          state="information"
          title="FMDQ MSG Data Reporting Portal — Live Session Active"
          subtext="October 2026 reporting cycle is active. Mandatory benchmark fixings (NIBOR, NITTY, NAFEX) close promptly at 10:00 AM. Ensure all dealing member returns are approved."
          primaryCTALabel="View Authorisation Queue"
          secondaryCTALabel="Explore Benchmark Rates"
          onPrimaryCTAClick={() => onNavigate('approvals')}
          onSecondaryCTAClick={() => onNavigate('benchmarks')}
        />
      </div>

      {/* ── KPI Metric Summary Grid ── */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
        gap: '20px' 
      }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-neutral-200)',
          borderRadius: 'var(--radius-12)',
          padding: '24px',
          boxShadow: 'var(--shadow-soft-sm)'
        }}>
          <Text size="xs" weight="bold" color="secondary" style={{ textTransform: 'uppercase' }}>
            Benchmark Rates Today
          </Text>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '8px' }}>
            <Heading level={2}>8 / 8</Heading>
            <Badge type="accent" color="success">100% On Time</Badge>
          </div>
          <Text size="xs" color="secondary" style={{ marginTop: '6px' }}>
            NIBOR, NITTY, NAFEX fixings active
          </Text>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-neutral-200)',
          borderRadius: 'var(--radius-12)',
          padding: '24px',
          boxShadow: 'var(--shadow-soft-sm)'
        }}>
          <Text size="xs" weight="bold" color="secondary" style={{ textTransform: 'uppercase' }}>
            Pending Authorisations
          </Text>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '8px' }}>
            <Heading level={2} style={{ color: 'var(--color-secondary-600)' }}>4</Heading>
            <Badge type="accent" color="warning">Action Required</Badge>
          </div>
          <Text size="xs" color="secondary" style={{ marginTop: '6px' }}>
            2 high urgency trades awaiting review
          </Text>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-neutral-200)',
          borderRadius: 'var(--radius-12)',
          padding: '24px',
          boxShadow: 'var(--shadow-soft-sm)'
        }}>
          <Text size="xs" weight="bold" color="secondary" style={{ textTransform: 'uppercase' }}>
            RFQ Compliance Rate
          </Text>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '8px' }}>
            <Heading level={2} style={{ color: 'var(--color-primary-600)' }}>
              {MOCK_SURVEILLANCE_METRICS.rfqComplianceRate}%
            </Heading>
            <Badge type="accent" color="success">&gt; 35% Threshold</Badge>
          </div>
          <Text size="xs" color="secondary" style={{ marginTop: '6px' }}>
            FMDQ Surveillance Benchmark compliant
          </Text>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-neutral-200)',
          borderRadius: 'var(--radius-12)',
          padding: '24px',
          boxShadow: 'var(--shadow-soft-sm)'
        }}>
          <Text size="xs" weight="bold" color="secondary" style={{ textTransform: 'uppercase' }}>
            Spread Compliance
          </Text>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '8px' }}>
            <Heading level={2}>
              {MOCK_SURVEILLANCE_METRICS.spreadComplianceRate}%
            </Heading>
            <Badge type="accent" color="success">Optimal</Badge>
          </div>
          <Text size="xs" color="secondary" style={{ marginTop: '6px' }}>
            2 dealing member infractions recorded
          </Text>
        </div>
      </div>

      {/* ── Split Tables Section ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
        {/* Recent Benchmark Contributions */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-neutral-200)',
          borderRadius: 'var(--radius-16)',
          padding: '24px',
          boxShadow: 'var(--shadow-soft-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <Heading level={4}>Recent Benchmark Submissions</Heading>
              <Text size="xs" color="secondary">Live fixing contributions across institutional members</Text>
            </div>
            <Button 
              size="sm" 
              variant="secondary" 
              label="View All Benchmarks" 
              onClick={() => onNavigate('benchmarks')} 
            />
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-neutral-200)', color: 'var(--color-neutral-500)' }}>
                  <th style={{ padding: '12px 8px', fontWeight: '600' }}>Contributor</th>
                  <th style={{ padding: '12px 8px', fontWeight: '600' }}>Benchmark</th>
                  <th style={{ padding: '12px 8px', fontWeight: '600' }}>Tenor</th>
                  <th style={{ padding: '12px 8px', fontWeight: '600' }}>Rate</th>
                  <th style={{ padding: '12px 8px', fontWeight: '600' }}>Time</th>
                  <th style={{ padding: '12px 8px', fontWeight: '600' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_BENCHMARKS.slice(0, 5).map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--color-neutral-100)' }}>
                    <td style={{ padding: '14px 8px', fontWeight: '500' }}>{item.contributor}</td>
                    <td style={{ padding: '14px 8px' }}>
                      <span style={{ fontWeight: '600', color: 'var(--color-primary-700)' }}>{item.benchmark}</span>
                    </td>
                    <td style={{ padding: '14px 8px', color: 'var(--color-neutral-600)' }}>{item.tenor}</td>
                    <td style={{ padding: '14px 8px', fontWeight: '600' }}>
                      {item.benchmark === 'NAFEX' || item.benchmark === 'SDF' 
                        ? `₦${item.rate.toFixed(2)}` 
                        : `${item.rate.toFixed(2)}%`}
                    </td>
                    <td style={{ padding: '14px 8px', color: 'var(--color-neutral-500)', fontSize: '13px' }}>{item.submissionTime}</td>
                    <td style={{ padding: '14px 8px' }}>
                      <Badge 
                        type="accent" 
                        color={item.status === 'APPROVED' ? 'success' : 'warning'}
                      >
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Approvals Widget */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-neutral-200)',
          borderRadius: 'var(--radius-16)',
          padding: '24px',
          boxShadow: 'var(--shadow-soft-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <Heading level={4}>Pending Approvals</Heading>
              <Text size="xs" color="secondary">Dual-control authorisation queue</Text>
            </div>
            <Button 
              size="sm" 
              variant="grey" 
              label="Review Queue" 
              onClick={() => onNavigate('approvals')} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {MOCK_APPROVAL_QUEUE.map(item => (
              <div 
                key={item.id}
                style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-12)',
                  border: '1px solid var(--color-neutral-200)',
                  backgroundColor: 'var(--color-neutral-50)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '600', fontSize: '13px', color: 'var(--color-neutral-900)' }}>
                    {item.module}
                  </span>
                  <Badge 
                    type="accent" 
                    color={item.urgency === 'HIGH' ? 'error' : 'neutral'}
                  >
                    {item.urgency}
                  </Badge>
                </div>
                <Text size="xs" color="secondary">{item.dealingMember} • {item.summary}</Text>
                <span style={{ fontSize: '11px', color: 'var(--color-neutral-400)' }}>{item.submissionDate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
