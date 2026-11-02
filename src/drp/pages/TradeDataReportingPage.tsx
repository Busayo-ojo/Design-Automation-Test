import React, { useState } from 'react';
import { Heading, Text } from '../../components/Typography';
import { Badge } from '../../elements/Badge';
import { Button } from '../../elements/Button';
import { Input, InputDropdown } from '../../elements/Input';
import { MOCK_TRADE_RECORDS } from '../services/mockData';

export const TradeDataReportingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'REGISTER' | 'ENTRY'>('REGISTER');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* ── Page Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <Heading level={2}>Trade Data Reporting</Heading>
          <Text size="md" color="secondary" style={{ marginTop: '4px' }}>
            Comprehensive trade capture for FGN Bonds, Treasury Bills, FX Spot/Forwards, and Non-Sovereign Securities.
          </Text>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button 
            variant={activeTab === 'REGISTER' ? 'primary' : 'secondary'} 
            size="sm" 
            label="Trade Register" 
            onClick={() => setActiveTab('REGISTER')}
          />
          <Button 
            variant={activeTab === 'ENTRY' ? 'primary' : 'secondary'} 
            size="sm" 
            label="+ Direct Trade Entry" 
            onClick={() => setActiveTab('ENTRY')}
          />
        </div>
      </div>

      {activeTab === 'ENTRY' ? (
        /* ── Direct Data Entry Form ── */
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-neutral-200)',
          borderRadius: 'var(--radius-16)',
          padding: '32px',
          boxShadow: 'var(--shadow-soft-sm)',
          maxWidth: '800px'
        }}>
          <Heading level={3} style={{ marginBottom: '8px' }}>Direct Trade Input (FMDQ MSG Form)</Heading>
          <Text size="sm" color="secondary" style={{ marginBottom: '28px' }}>
            Enter verified secondary market transaction details. Submissions require dual-control authorisation.
          </Text>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <InputDropdown
              label="Security Category"
              placeholder="Select Category"
              options={[
                { label: 'FGN Bonds', value: 'FGN_BOND' },
                { label: 'Nigerian Treasury Bills (NTBs)', value: 'NTB' },
                { label: 'FX Spot (USD/NGN)', value: 'FX_SPOT' },
                { label: 'Non-Sovereign Securities', value: 'NON_SOVEREIGN' },
                { label: 'Member-Client Bonds', value: 'MEMBER_CLIENT' }
              ]}
            />
            <Input label="Instrument / Security Description" placeholder="e.g. 14.55% FGN APR 2029" />
            <Input label="Face Value / Trade Volume" placeholder="e.g. 500,000,000" />
            <Input label="Execution Yield / Price (%)" placeholder="e.g. 19.45" />
            <InputDropdown
              label="Dealing Counterparty"
              placeholder="Select Counterparty"
              options={[
                { label: 'Stanbic IBTC Bank', value: 'STNB' },
                { label: 'Zenith Bank PLC', value: 'ZENB' },
                { label: 'Access Bank PLC', value: 'ACCS' },
                { label: 'Central Bank of Nigeria (CBN)', value: 'CBN' }
              ]}
            />
            <Input label="Settlement Date" type="date" defaultValue="2026-10-28" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
            <Button variant="secondary" size="sm" label="Cancel" onClick={() => setActiveTab('REGISTER')} />
            <Button variant="primary" size="sm" label="Submit for Authorisation" onClick={() => setActiveTab('REGISTER')} />
          </div>
        </div>
      ) : (
        /* ── Trade Register Table ── */
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-neutral-200)',
          borderRadius: 'var(--radius-16)',
          boxShadow: 'var(--shadow-soft-sm)',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-neutral-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Heading level={4}>Executed Trades Register</Heading>
              <Text size="xs" color="secondary">Filtered by current reporting week (Ending Friday, 30 October 2026)</Text>
            </div>
            <Button size="sm" variant="secondary" label="Export NIBSS / Excel" />
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-neutral-50)', borderBottom: '1px solid var(--color-neutral-200)', color: 'var(--color-neutral-600)' }}>
                  <th style={{ padding: '14px 20px', fontWeight: '600' }}>Trade Ref</th>
                  <th style={{ padding: '14px 20px', fontWeight: '600' }}>Date</th>
                  <th style={{ padding: '14px 20px', fontWeight: '600' }}>Dealing Member</th>
                  <th style={{ padding: '14px 20px', fontWeight: '600' }}>Instrument</th>
                  <th style={{ padding: '14px 20px', fontWeight: '600' }}>Volume</th>
                  <th style={{ padding: '14px 20px', fontWeight: '600' }}>Yield / Rate</th>
                  <th style={{ padding: '14px 20px', fontWeight: '600' }}>Counterparty</th>
                  <th style={{ padding: '14px 20px', fontWeight: '600' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_TRADE_RECORDS.map(record => (
                  <tr key={record.id} style={{ borderBottom: '1px solid var(--color-neutral-100)' }}>
                    <td style={{ padding: '16px 20px', fontWeight: '600', color: 'var(--color-primary-700)' }}>{record.id}</td>
                    <td style={{ padding: '16px 20px', color: 'var(--color-neutral-600)' }}>{record.tradeDate}</td>
                    <td style={{ padding: '16px 20px', fontWeight: '500' }}>{record.dealingMember}</td>
                    <td style={{ padding: '16px 20px' }}>{record.instrument}</td>
                    <td style={{ padding: '16px 20px', fontWeight: '600' }}>
                      {record.securityType === 'FX_SPOT' 
                        ? `$${(record.volume / 1000000).toFixed(1)}M` 
                        : `₦${(record.volume / 1000000).toLocaleString()}M`}
                    </td>
                    <td style={{ padding: '16px 20px', fontWeight: '600' }}>
                      {record.securityType === 'FX_SPOT' ? `₦${record.yieldOrPrice}` : `${record.yieldOrPrice}%`}
                    </td>
                    <td style={{ padding: '16px 20px', color: 'var(--color-neutral-600)' }}>{record.counterparty}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <Badge 
                        type="accent" 
                        color={record.submissionStatus === 'APPROVED' ? 'success' : 'warning'}
                      >
                        {record.submissionStatus === 'APPROVED' ? 'Approved' : 'Pending Approval'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
