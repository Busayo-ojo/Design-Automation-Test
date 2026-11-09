import type { 
  UserProfile, 
  BenchmarkContribution, 
  TradeDataRecord, 
  ApprovalQueueItem, 
  SurveillanceSummary 
} from '../types';

export const CURRENT_USER: UserProfile = {
  id: 'USR-MSG-001',
  name: 'Marvin Ogah',
  email: 'marvin.ogah@fmdqgroup.com',
  institution: 'FMDQ Securities Exchange Limited',
  institutionCode: 'FMDQ-HQ',
  role: 'MSG_ADMIN',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
};

export const MOCK_BENCHMARKS: BenchmarkContribution[] = [
  { id: 'BC-001', contributor: 'Stanbic IBTC Bank', contributorCode: 'STNB', benchmark: 'NIBOR', tenor: 'Overnight', rate: 26.45, submissionTime: '09:42 AM', status: 'APPROVED' },
  { id: 'BC-002', contributor: 'Access Bank PLC', contributorCode: 'ACCS', benchmark: 'NIBOR', tenor: '1 Month', rate: 27.10, submissionTime: '09:48 AM', status: 'APPROVED' },
  { id: 'BC-003', contributor: 'Zenith Bank PLC', contributorCode: 'ZENB', benchmark: 'NITTY', tenor: '3 Months', rate: 21.25, submissionTime: '09:55 AM', status: 'PENDING' },
  { id: 'BC-004', contributor: 'Guaranty Trust Bank', contributorCode: 'GTCO', benchmark: 'NAFEX', tenor: 'Spot (USD/NGN)', rate: 1642.50, submissionTime: '09:58 AM', status: 'APPROVED' },
  { id: 'BC-005', contributor: 'First Bank of Nigeria', contributorCode: 'FBNH', benchmark: 'NAFEX', tenor: 'Spot (USD/NGN)', rate: 1645.00, submissionTime: '10:02 AM', status: 'PENDING' },
  { id: 'BC-006', contributor: 'United Bank for Africa', contributorCode: 'UBAN', benchmark: 'NITTY', tenor: '6 Months', rate: 22.80, submissionTime: '10:04 AM', status: 'PENDING' },
  { id: 'BC-007', contributor: 'Citibank Nigeria', contributorCode: 'CITI', benchmark: 'REPO', tenor: 'Overnight', rate: 25.80, submissionTime: '10:10 AM', status: 'APPROVED' },
  { id: 'BC-008', contributor: 'Rand Merchant Bank', contributorCode: 'RMBN', benchmark: 'SDF', tenor: '1 Week', rate: 1650.25, submissionTime: '10:14 AM', status: 'APPROVED' }
];

export const MOCK_TRADE_RECORDS: TradeDataRecord[] = [
  { id: 'TRD-8821', tradeDate: '2026-10-26', dealingMember: 'Stanbic IBTC', instrument: 'FGN-14.55-2029', securityType: 'FGN_BOND', volume: 500000000, yieldOrPrice: 19.45, counterparty: 'Zenith Bank', submissionStatus: 'APPROVED', enteredBy: 'j.adeyemi' },
  { id: 'TRD-8822', tradeDate: '2026-10-26', dealingMember: 'Access Bank', instrument: 'NTB-182D-2027', securityType: 'TREASURY_BILL', volume: 250000000, yieldOrPrice: 20.12, counterparty: 'GTCO', submissionStatus: 'APPROVED', enteredBy: 'c.nwosu' },
  { id: 'TRD-8823', tradeDate: '2026-10-26', dealingMember: 'Citibank Nigeria', instrument: 'USD/NGN Spot', securityType: 'FX_SPOT', volume: 2000000, yieldOrPrice: 1644.20, counterparty: 'FirstBank', submissionStatus: 'PENDING_APPROVAL', enteredBy: 'a.bello' },
  { id: 'TRD-8824', tradeDate: '2026-10-26', dealingMember: 'Standard Chartered', instrument: 'FGN-12.50-2035', securityType: 'FGN_BOND', volume: 1000000000, yieldOrPrice: 18.90, counterparty: 'UBA', submissionStatus: 'APPROVED', enteredBy: 'm.balogun' },
  { id: 'TRD-8825', tradeDate: '2026-10-26', dealingMember: 'Rand Merchant Bank', instrument: 'Dangote Corp Bond 2028', securityType: 'NON_SOVEREIGN', volume: 150000000, yieldOrPrice: 22.00, counterparty: 'Stanbic IBTC', submissionStatus: 'PENDING_APPROVAL', enteredBy: 'p.eze' }
];

export const MOCK_APPROVAL_QUEUE: ApprovalQueueItem[] = [
  { id: 'AP-101', module: 'NAFEX Fixings', submissionDate: '2026-10-26 10:02', dealingMember: 'First Bank of Nigeria', submittedBy: 'f.olumide', summary: 'USD/NGN rate submission: 1,645.00', status: 'PENDING', urgency: 'HIGH' },
  { id: 'AP-102', module: 'NITTY Contributions', submissionDate: '2026-10-26 09:55', dealingMember: 'Zenith Bank PLC', submittedBy: 't.alabi', summary: '3M Treasury Bill yield rate: 21.25%', status: 'PENDING', urgency: 'NORMAL' },
  { id: 'AP-103', module: 'Trade Data Upload', submissionDate: '2026-10-26 09:50', dealingMember: 'Citibank Nigeria', submittedBy: 'a.bello', summary: 'FX Spot interbank batch TRD-8823 ($2.0M)', status: 'PENDING', urgency: 'HIGH' },
  { id: 'AP-104', module: 'Weekly CBN S4 Refund', submissionDate: '2026-10-24 16:30', dealingMember: 'Access Bank PLC', submittedBy: 'k.okeke', summary: 'Week ended 24-Oct refund claim ₦42,500,000', status: 'PENDING', urgency: 'NORMAL' }
];

export const MOCK_SURVEILLANCE_METRICS: SurveillanceSummary = {
  period: 'October 2026 (Live)',
  rfqComplianceRate: 96.8, // mandatory threshold is 35%
  spreadComplianceRate: 98.4,
  firmQuotesAt10AmRate: 99.1,
  activeInfractionsCount: 2
};
