import React, { useState } from 'react';
import { Heading, Text } from '../../components/Typography';
import { Badge } from '../../elements/Badge';
import { Button } from '../../elements/Button';
import { Input } from '../../elements/Input';
import { MOCK_BENCHMARKS } from '../services/mockData';

export const BenchmarkContributionsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = MOCK_BENCHMARKS.filter(item => {
    const matchesFilter = selectedFilter === 'ALL' || item.benchmark === selectedFilter;
    const matchesSearch = item.contributor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.contributorCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tenor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* ── Page Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <Heading level={2}>Benchmark Contributions</Heading>
          <Text size="md" color="secondary" style={{ marginTop: '4px' }}>
            Daily submission, fixing, and approval for NIBOR, NITTY, NAFEX, and Repo Rates.
          </Text>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="secondary" size="sm" label="Download Fixing Template" />
          <Button variant="primary" size="sm" label="Submit Contribution" />
        </div>
      </div>

      {/* ── Filter & Search Toolbar ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        backgroundColor: '#FFFFFF',
        padding: '16px 20px',
        borderRadius: 'var(--radius-12)',
        border: '1px solid var(--color-neutral-200)',
        boxShadow: 'var(--shadow-soft-xxsm)'
      }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['ALL', 'NIBOR', 'NITTY', 'NAFEX', 'REPO', 'SDF'].map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                border: selectedFilter === filter ? '1px solid var(--color-primary-600)' : '1px solid var(--color-neutral-300)',
                backgroundColor: selectedFilter === filter ? 'var(--color-primary-50)' : '#FFFFFF',
                color: selectedFilter === filter ? 'var(--color-primary-700)' : 'var(--color-neutral-700)',
                fontWeight: selectedFilter === filter ? 600 : 400,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        <div style={{ width: '280px' }}>
          <Input 
            size="sm"
            placeholder="Search contributor, code, tenor..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* ── Main Data Table ── */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--color-neutral-200)',
        borderRadius: 'var(--radius-16)',
        boxShadow: 'var(--shadow-soft-sm)',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-neutral-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Heading level={4}>Benchmark Fixings & Rate Register</Heading>
          <Text size="xs" color="secondary">Showing {filteredItems.length} records</Text>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-neutral-50)', borderBottom: '1px solid var(--color-neutral-200)', color: 'var(--color-neutral-600)' }}>
                <th style={{ padding: '14px 20px', fontWeight: '600' }}>ID</th>
                <th style={{ padding: '14px 20px', fontWeight: '600' }}>Dealing Member</th>
                <th style={{ padding: '14px 20px', fontWeight: '600' }}>Code</th>
                <th style={{ padding: '14px 20px', fontWeight: '600' }}>Benchmark</th>
                <th style={{ padding: '14px 20px', fontWeight: '600' }}>Tenor / Window</th>
                <th style={{ padding: '14px 20px', fontWeight: '600' }}>Submitted Rate</th>
                <th style={{ padding: '14px 20px', fontWeight: '600' }}>Timestamp</th>
                <th style={{ padding: '14px 20px', fontWeight: '600' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--color-neutral-100)' }}>
                  <td style={{ padding: '16px 20px', color: 'var(--color-neutral-500)', fontSize: '13px' }}>{item.id}</td>
                  <td style={{ padding: '16px 20px', fontWeight: '600', color: 'var(--color-neutral-900)' }}>{item.contributor}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--color-neutral-600)' }}>
                    <span style={{ backgroundColor: 'var(--color-neutral-100)', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>
                      {item.contributorCode}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ fontWeight: '700', color: 'var(--color-primary-600)' }}>{item.benchmark}</span>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--color-neutral-700)' }}>{item.tenor}</td>
                  <td style={{ padding: '16px 20px', fontWeight: '700' }}>
                    {item.benchmark === 'NAFEX' || item.benchmark === 'SDF' ? `₦${item.rate.toFixed(2)}` : `${item.rate.toFixed(2)}%`}
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--color-neutral-500)', fontSize: '13px' }}>{item.submissionTime}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <Badge type="accent" color={item.status === 'APPROVED' ? 'success' : 'warning'}>
                      {item.status}
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
