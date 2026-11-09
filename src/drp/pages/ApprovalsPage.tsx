import React, { useState } from 'react';
import { Heading, Text } from '../../components/Typography';
import { Badge } from '../../elements/Badge';
import { Button } from '../../elements/Button';
import { Toast } from '../../components/Toast';
import { MOCK_APPROVAL_QUEUE } from '../services/mockData';
import type { ApprovalQueueItem } from '../types';

export const ApprovalsPage: React.FC = () => {
  const [queue, setQueue] = useState<ApprovalQueueItem[]>(MOCK_APPROVAL_QUEUE);
  const [feedback, setFeedback] = useState<{ message: string; state: 'success' | 'error' } | null>(null);

  const handleApprove = (id: string, moduleName: string) => {
    setQueue(prev => prev.filter(item => item.id !== id));
    setFeedback({
      state: 'success',
      message: `Successfully authorised ${moduleName} (Ref: ${id}). Audit trail logged.`
    });
  };

  const handleReject = (id: string, moduleName: string) => {
    setQueue(prev => prev.filter(item => item.id !== id));
    setFeedback({
      state: 'error',
      message: `Rejected submission ${moduleName} (Ref: ${id}). Submitter notified to correct.`
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* ── Page Header ── */}
      <div>
        <Heading level={2}>Authorisation & Approval Queue</Heading>
        <Text size="md" color="secondary" style={{ marginTop: '4px' }}>
          Dual-control governance for benchmark fixings, weekly returns, and secondary trade validation.
        </Text>
      </div>

      {feedback && (
        <Toast
          type="toasts"
          state={feedback.state}
          title={feedback.state === 'success' ? 'Authorisation Complete' : 'Submission Rejected'}
          subtext={feedback.message}
          onClose={() => setFeedback(null)}
        />
      )}

      {/* ── Queue Table ── */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--color-neutral-200)',
        borderRadius: 'var(--radius-16)',
        boxShadow: 'var(--shadow-soft-sm)',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-neutral-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Heading level={4}>Pending Submissions</Heading>
            <Text size="xs" color="secondary">{queue.length} items awaiting authoriser sign-off</Text>
          </div>
          {queue.length > 0 && (
            <Button 
              size="sm" 
              variant="primary" 
              label="Batch Authorise All Normal" 
              onClick={() => {
                setQueue([]);
                setFeedback({ state: 'success', message: 'All pending normal items authorised.' });
              }}
            />
          )}
        </div>

        {queue.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <Heading level={3} style={{ color: 'var(--color-success-600)', marginBottom: '8px' }}>
              ✓ Queue is Clear
            </Heading>
            <Text size="sm" color="secondary">
              All dealing member submissions and fixing returns have been verified and authorised.
            </Text>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-neutral-50)', borderBottom: '1px solid var(--color-neutral-200)', color: 'var(--color-neutral-600)' }}>
                  <th style={{ padding: '14px 20px', fontWeight: '600' }}>Item Ref</th>
                  <th style={{ padding: '14px 20px', fontWeight: '600' }}>Module</th>
                  <th style={{ padding: '14px 20px', fontWeight: '600' }}>Dealing Member</th>
                  <th style={{ padding: '14px 20px', fontWeight: '600' }}>Submitted By</th>
                  <th style={{ padding: '14px 20px', fontWeight: '600' }}>Submission Details</th>
                  <th style={{ padding: '14px 20px', fontWeight: '600' }}>Urgency</th>
                  <th style={{ padding: '14px 20px', fontWeight: '600', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {queue.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--color-neutral-100)' }}>
                    <td style={{ padding: '16px 20px', fontWeight: '600', color: 'var(--color-primary-700)' }}>{item.id}</td>
                    <td style={{ padding: '16px 20px', fontWeight: '500' }}>{item.module}</td>
                    <td style={{ padding: '16px 20px', color: 'var(--color-neutral-900)' }}>{item.dealingMember}</td>
                    <td style={{ padding: '16px 20px', color: 'var(--color-neutral-600)', fontSize: '13px' }}>{item.submittedBy}</td>
                    <td style={{ padding: '16px 20px', color: 'var(--color-neutral-800)' }}>{item.summary}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <Badge type="accent" color={item.urgency === 'HIGH' ? 'error' : 'neutral'}>
                        {item.urgency}
                      </Badge>
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          label="Reject" 
                          onClick={() => handleReject(item.id, item.module)} 
                        />
                        <Button 
                          size="sm" 
                          variant="primary" 
                          label="Authorise" 
                          onClick={() => handleApprove(item.id, item.module)} 
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
