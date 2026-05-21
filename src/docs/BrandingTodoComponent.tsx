import React, { useState, useMemo } from 'react';
import { Badge } from '../elements/Badge';
import { Heading } from '../components/Typography/Heading';
import { Text } from '../components/Typography/Text';
import { Toggle } from '../elements/Toggle';
import { Button } from '../elements/Button';
import { Chip } from '../elements/Chip';

interface ChecklistItem {
  id: string;
  description: string;
  severity: 'High' | 'Medium';
}

interface ChecklistSection {
  id: string;
  title: string;
  items: ChecklistItem[];
}

const SECTIONS: ChecklistSection[] = [
  {
    id: 's1',
    title: '1. Casing and Capitalisation',
    items: [
      { id: 's1-1', severity: 'High', description: 'System feedback messages (success/error pop-ups) start with a capital letter. e.g. "Success" not "success", "An error occurred" not "an error occurred".' },
      { id: 's1-2', severity: 'High', description: 'Search box placeholder text starts with a capital letter. e.g. "Search by name" not "search by name".' },
      { id: 's1-3', severity: 'High', description: 'Action buttons use correct casing for two-word verbs. e.g. "Log In" and "Log Out" not "Login" / "Logout".' },
      { id: 's1-4', severity: 'High', description: 'Minor prepositions in headings and titles are lowercase. Words like "of", "for", "your", "by", and "with" must not be capitalised mid-title. e.g. "Notification of Change" not "Notification Of Change".' },
      { id: 's1-5', severity: 'Medium', description: 'Stand-alone action prompts and dropdown triggers are capitalised. e.g. "Import", "Export", "Select" — not "import", "export", "select".' },
    ],
  },
  {
    id: 's2',
    title: '2. Singular vs. Plural (Menus, Headers & Tabs)',
    items: [
      { id: 's2-1', severity: 'High', description: 'Navigation menu labels use the approved singular form. Standard: "Product", "Institution", "User", "Menu", "Complaint", "Role", "Trading Asset" — not their plurals.' },
      { id: 's2-2', severity: 'High', description: 'Table headers use "Action" not "Actions", and "Asset" not "Assets". Review every data table header in the application.' },
      { id: 's2-3', severity: 'Medium', description: 'Report and tab names use the singular form. e.g. "Authorised Representatives Report" not "Authorised Representatives Reports".' },
    ],
  },
  {
    id: 's3',
    title: '3. Punctuation and Spacing',
    items: [
      { id: 's3-1', severity: 'High', description: 'UI labels, input field titles, and table headers have no trailing colons. e.g. "Face Value" not "Face Value:", "Collateral Purpose" not "Collateral Purpose:".' },
      { id: 's3-2', severity: 'High', description: 'Descriptive helper text and standalone sentences end with a full stop.' },
      { id: 's3-3', severity: 'High', description: 'Three-letter month abbreviations include a full stop, except May. "Jan.", "Feb.", "Mar.", "Apr.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec." — "May" never takes a full stop. Always be consistent with whatever format you decide to use.' },
      { id: 's3-4', severity: 'Medium', description: 'Only the square (▪) bullet point is acceptable.' },
      { id: 's3-5', severity: 'Medium', description: 'A space appears before every open bracket. e.g. "Contract Value (₦\'mm)" not "Contract Value(₦\'mm)".' },
      { id: 's3-6', severity: 'Medium', description: 'Button labels, headings, and navigation items do not end with a full stop.' },
    ],
  },
  {
    id: 's4',
    title: '4. Currency and Number Formatting',
    items: [
      { id: 's4-1', severity: 'High', description: 'The Naira symbol ₦ is used, not the letter N or the code NGN — in all UI fields. This applies to labels, table headers, and inline references.' },
      { id: 's4-2', severity: 'High', description: 'The ₦ symbol is not repeated in individual table cells when it is already in the column header.' },
      { id: 's4-3', severity: 'High', description: 'All figures display commas as thousand separators and are formatted to two decimal places. e.g. "₦1,250,000.00" not "₦1250000" or "₦1,250,000".' },
    ],
  },
  {
    id: 's5',
    title: '5. Table and Data Alignment',
    items: [
      { id: 's5-1', severity: 'High', description: 'Table header text is centre aligned.' },
      { id: 's5-2', severity: 'High', description: 'All numerical figures, percentages, and currency amounts in table cells are right aligned. Right-alignment is the standard for any value used in calculation or comparison.' },
      { id: 's5-3', severity: 'High', description: 'Serial number columns use the header "S/N" — not "#", "UID", "IID", or "RegID".' },
      { id: 's5-4', severity: 'Medium', description: 'Long text blocks (e.g. Terms & Conditions, legal disclaimers) are fully justified.' },
    ],
  },
  {
    id: 's6',
    title: '6. Date and Time Formatting',
    items: [
      { id: 's6-1', severity: 'High', description: 'Dates follow the format: Month DD, YYYY — with no leading zero for single-digit days. "Mar. 1, 2025" not "Mar 01, 2025". Note the full stop after the abbreviated month.' },
      { id: 's6-2', severity: 'High', description: '"Expiry Date" is used for active contracts and products — not "Expired Date". "Expired" is past tense and implies the product is already inactive.' },
    ],
  },
  {
    id: 's7',
    title: '7. Empty States',
    items: [
      { id: 's7-1', severity: 'High', description: 'Empty state messages use only the approved phrases: "No Data Available" or "No Orders Available". "No data", "There are no records found", "No notifications yet" and similar variations are not approved.' },
      { id: 's7-2', severity: 'Medium', description: 'No redundant sub-text appears beneath the empty state graphic repeating the same message. If a graphic already says "No Orders", do not add a sentence below that says the same thing in different words.' },
    ],
  },
  {
    id: 's8',
    title: '8. Terminology, Spelling, and Grammar',
    items: [
      { id: 's8-1', severity: 'High', description: 'No backend variable names or snake_case syntax appear in the user interface. e.g. UI must display "Dealer Code" not "dealer_code", "Collateral Type" not "collateral_type".' },
      { id: 's8-2', severity: 'High', description: 'UK/British English spelling is used consistently throughout. "Authoriser" not "Authorizer", "synchronise" not "synchronize", "organisation" not "organization".' },
      { id: 's8-3', severity: 'Medium', description: 'Required terms are written out in full at first use. "Two-Factor Authentication (2FA)" not "2FA", "Unit of Measurement (UoM)" not "UoM".' },
      { id: 's8-4', severity: 'Medium', description: 'Compound modifiers include the required hyphen. "Non-Interest" not "Non Interest"; "One-way quote" not "1-Way-Quote".' },
      { id: 's8-5', severity: 'High', description: 'All product names, regulatory bodies, and FMDQ entity names are spelled exactly as per the approved glossary. e.g. "FMDQ Exchange", "FMDQ Clear", "CBN", "SEC" — check every instance.' },
    ],
  },
];

const STORAGE_KEY = 'fmdqui_branding_todo';

export const BrandingTodoComponent: React.FC = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      }
      return next;
    });
  };

  const resetAll = () => {
    setChecked({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear localStorage:', e);
    }
  };

  const { totalItems, completedItems, highTotal, highCompleted } = useMemo(() => {
    const allItems = SECTIONS.flatMap((s) => s.items);
    const total = allItems.length;
    const completed = allItems.filter((item) => checked[item.id]).length;
    const highItems = allItems.filter((i) => i.severity === 'High');
    const highDone = highItems.filter((i) => checked[i.id]).length;
    return {
      totalItems: total,
      completedItems: completed,
      highTotal: highItems.length,
      highCompleted: highDone,
    };
  }, [checked]);

  const progressPct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  const allHighCleared = highCompleted === highTotal;

  return (
    <div style={{ fontFamily: 'var(--font-family-primary)', color: '#101828', maxWidth: '1000px', margin: '0 auto' }}>
      <style>{`
        .bt-intro {
          background: #f9fafb;
          border: 1px solid #e4e7ec;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 32px;
        }
        .bt-intro-categories-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 24px;
          margin-bottom: 20px;
          padding-left: 4px;
        }
        @media (max-width: 600px) {
          .bt-intro-categories-grid {
            grid-template-columns: 1fr;
          }
        }
        .bt-category-item {
          font-size: 14px;
          color: #475367;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .bt-intro-warning {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: var(--color-secondary-50, #FEF6E7);
          border: 1px solid var(--color-secondary-500, #CC9933);
          border-radius: 6px;
          padding: 12px 16px;
        }
        .bt-instructions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }
        @media (max-width: 768px) {
          .bt-instructions-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
        .bt-instruction-card {
          background: #ffffff;
          border: 1px solid #e4e7ec;
          border-radius: 12px;
          padding: 20px 24px;
          box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.05);
        }
        .bt-instruction-list {
          margin: 0;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          list-style-type: square;
        }
        .bt-instruction-list li {
          font-size: 14px;
          color: #344054;
          line-height: 1.6;
        }
        .bt-progress-card {
          position: sticky;
          top: 16px;
          z-index: 100;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid #e4e7ec;
          border-radius: 12px;
          padding: 20px 24px;
          margin-bottom: 32px;
          box-shadow: 0px 8px 30px rgba(16, 24, 40, 0.08);
        }
        .bt-progress-bar-track {
          background: #f0f2f5;
          border-radius: 999px;
          height: 8px;
          width: 100%;
          overflow: hidden;
          margin: 12px 0 8px;
        }
        .bt-progress-bar-fill {
          height: 100%;
          border-radius: 999px;
          background: #1D326D;
          transition: width 0.3s ease;
        }
        .bt-progress-stats {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }
        .bt-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .bt-stat-value {
          font-size: 20px;
          font-weight: 700;
          color: #1D326D;
        }
        .bt-stat-label {
          font-size: 12px;
          color: #667185;
        }
        .bt-section {
          margin-bottom: 28px;
          border: 1px solid #e4e7ec;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.05);
        }
        .bt-section-header {
          background: var(--color-neutral-200);
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .bt-section-header-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--color-primary-700);
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .bt-section-progress {
          font-size: 12px;
          color: var(--color-neutral-700);
          font-weight: 500;
        }
        .bt-item {
          display: grid;
          grid-template-columns: 48px 1fr auto;
          align-items: center;
          gap: 0;
          border-bottom: 1px solid #f0f2f5;
          background: #ffffff;
          transition: background 0.15s ease;
        }
        .bt-item:last-child {
          border-bottom: none;
        }
        .bt-item.bt-item--checked {
          background: #f9fafb;
        }
        .bt-item-checkbox-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px 0 16px 16px;
        }
        .bt-item-description {
          padding: 14px 12px 14px 8px;
          font-size: 14px;
          line-height: 1.6;
          color: #344054;
        }
        .bt-item--checked .bt-item-description {
          color: #98a2b3;
          text-decoration: line-through;
          text-decoration-color: #d0d5dd;
        }
        .bt-item-severity {
          padding: 14px 16px 14px 8px;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .bt-item-severity .fmdqui-badge,
        .bt-item-severity .fmdqui-badge .fmdqui-badge__label {
          font-size: 14px !important;
        }
      `}</style>

      {/* Intro */}
      <div className="bt-intro">
        <Text size="md" style={{ margin: '0 0 16px 0', color: '#344054', lineHeight: '1.7' }}>
          This checklist is a mandatory pre-submission gate for every iQx application going into brand review.
          It exists to ensure that observations from external parties and the cycle of fixes is reduced to the barest minimum.
        </Text>

        <Text size="md" style={{ margin: '0 0 12px 0', fontWeight: 600, color: '#101828' }}>
          The recurring issues catalogued here are drawn directly from historical brand review feedback. They fall into eight categories:
        </Text>

        <div className="bt-intro-categories-grid">
          <div className="bt-category-item">▪ Casing and capitalisation</div>
          <div className="bt-category-item">▪ Singular/plural consistency</div>
          <div className="bt-category-item">▪ Punctuation and spacing</div>
          <div className="bt-category-item">▪ Currency and number formatting</div>
          <div className="bt-category-item">▪ Table and data alignment</div>
          <div className="bt-category-item">▪ Empty states</div>
          <div className="bt-category-item">▪ Date and time formatting</div>
          <div className="bt-category-item">▪ Terminology</div>
        </div>

        <div className="bt-intro-warning">
          <span style={{ fontSize: '18px', lineHeight: '1', flexShrink: 0 }}>⚠️</span>
          <Text size="sm" style={{ margin: 0, color: 'var(--color-primary-700, #1D326D)', fontWeight: 500 }}>
            Items marked <strong>High</strong> are non-negotiable; any high item left unresolved is grounds to return the application to the developer without further review.
          </Text>
        </div>
      </div>

      {/* Instructions Grid: Who and How stacked side-by-side */}
      <div className="bt-instructions-grid">
        <div className="bt-instruction-card">
          <Heading level={6} style={{ margin: '0 0 12px 0', color: '#101828', fontSize: '16px', fontWeight: 700 }}>
            Who Should Use This Checklist
          </Heading>
          <ul className="bt-instruction-list">
            <li><strong>Developers:</strong> Complete this checklist before handing off to QA</li>
            <li><strong>QA engineers:</strong> Verify all items independently</li>
            <li><strong>System Reviewers:</strong> Cross-check and reconfirm all items before approving for brand review</li>
          </ul>
        </div>

        <div className="bt-instruction-card">
          <Heading level={6} style={{ margin: '0 0 12px 0', color: '#101828', fontSize: '16px', fontWeight: 700 }}>
            How to Use This Checklist
          </Heading>
          <ul className="bt-instruction-list">
            <li>Work through each section in order, and on every page of the application</li>
            <li>Tick the checkbox for each item once you have confirmed it is correct across all screens and states of the application</li>
            <li>Do not tick an item based on memory; verify it directly in the running application on localhost or test environment</li>
            <li>If a high item cannot be resolved before submission, document the reason and escalate to the Group Head of ADG before proceeding</li>
            <li>If the business requests any specific change, proper documentation must be generated specifying why and what the reason for the change is</li>
          </ul>
        </div>
      </div>

      {/* Progress */}
      <div className="bt-progress-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px', flexWrap: 'wrap', gap: '12px' }}>
          <Heading level={6} style={{ margin: 0, color: '#101828' }}>Review Progress</Heading>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Chip
              className="bt-status-chip"
              label={allHighCleared ? '✅ All High items cleared' : `${highTotal - highCompleted} High item${highTotal - highCompleted !== 1 ? 's' : ''} remaining`}
              type="Input"
              state="focused"
              hasCloseButton={false}
            />
            <Button variant="text" buttonType="primary" onClick={resetAll} size="sm">Reset</Button>
          </div>
        </div>
        <div className="bt-progress-bar-track">
          <div className="bt-progress-bar-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="bt-progress-stats">
            <div className="bt-stat">
              <span className="bt-stat-value">{completedItems}/{totalItems}</span>
              <span className="bt-stat-label">Items checked</span>
            </div>
            <div className="bt-stat">
              <span className="bt-stat-value">{progressPct}%</span>
              <span className="bt-stat-label">Complete</span>
            </div>
            <div className="bt-stat">
              <span className="bt-stat-value" style={{ color: allHighCleared ? '#04802E' : '#CB1A14' }}>{highCompleted}/{highTotal}</span>
              <span className="bt-stat-label">High priority done</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist Sections */}
      {SECTIONS.map((section) => {
        const sectionChecked = section.items.filter((i) => checked[i.id]).length;
        return (
          <div key={section.id} className="bt-section">
            <div className="bt-section-header">
              <span className="bt-section-header-title">{section.title}</span>
              <span className="bt-section-progress">{sectionChecked}/{section.items.length}</span>
            </div>
            {section.items.map((item) => (
              <div
                key={item.id}
                className={`bt-item${checked[item.id] ? ' bt-item--checked' : ''}`}
                onClick={() => toggle(item.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="bt-item-checkbox-cell">
                  <Toggle
                    type="Checkcircle"
                    checked={!!checked[item.id]}
                    readOnly
                  />
                </div>
                <div className="bt-item-description">{item.description}</div>
                <div className="bt-item-severity">
                  <Badge
                    color={item.severity === 'High' ? 'error' : 'warning'}
                    type="accent"
                    size="md"
                  >
                    {item.severity}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
