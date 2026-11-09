export type SecurityRole = 
  | 'MSG_ADMIN'
  | 'CHIEF_DEALER_AUTHORISER'
  | 'UNIVERSAL_INPUTTER'
  | 'UNIVERSAL_AUTHORISER'
  | 'TRADE_DATA_INPUTTER'
  | 'TRADE_DATA_AUTHORISER'
  | 'SURVEILLANCE'
  | 'FMDQ_VIEW_ONLY';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  institution: string;
  institutionCode: string;
  role: SecurityRole;
  avatarUrl?: string;
}

export type BenchmarkType = 'NIBOR' | 'NITTY' | 'NAFEX' | 'NIFEX' | 'REPO' | 'SDF';

export interface BenchmarkContribution {
  id: string;
  contributor: string;
  contributorCode: string;
  benchmark: BenchmarkType;
  tenor: string; // e.g. "Overnight", "1 Month", "3 Month", "6 Month"
  rate: number;
  submissionTime: string;
  status: 'SUBMITTED' | 'APPROVED' | 'PENDING' | 'REJECTED';
  authoriser?: string;
}

export interface TradeDataRecord {
  id: string;
  tradeDate: string;
  dealingMember: string;
  instrument: string;
  securityType: 'FGN_BOND' | 'TREASURY_BILL' | 'FX_SPOT' | 'FX_FORWARDS' | 'NON_SOVEREIGN';
  volume: number;
  yieldOrPrice: number;
  counterparty: string;
  submissionStatus: 'APPROVED' | 'PENDING_APPROVAL' | 'REJECTED';
  enteredBy: string;
}

export interface ApprovalQueueItem {
  id: string;
  module: string;
  submissionDate: string;
  dealingMember: string;
  submittedBy: string;
  summary: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  urgency: 'HIGH' | 'NORMAL';
}

export interface SurveillanceSummary {
  period: string;
  rfqComplianceRate: number; // percentage e.g. 94.2%
  spreadComplianceRate: number; // percentage
  firmQuotesAt10AmRate: number; // percentage
  activeInfractionsCount: number;
}
