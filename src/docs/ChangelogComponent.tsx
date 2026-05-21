import React, { useState } from 'react';
import changelogData from './changelog-data.json';
import { Badge } from '../elements/Badge';
import type { BadgeColor, BadgeType } from '../elements/Badge';
import { ButtonGroup, ButtonGroupItem } from '../elements/ButtonGroup';
import { Input } from '../elements/Input';
import { Avatar } from '../elements/Avatar/Avatar';
import { Heading } from '../components/Typography/Heading';
import { Text } from '../components/Typography/Text';
import { Button } from '../elements/Button';

interface Commit {
  hash: string;
  date: string;
  author: string;
  email: string;
  subject: string;
  category: string;
  scope: string;
  message: string;
  url: string;
}

const CATEGORY_BADGES: Record<string, { color: BadgeColor; type: BadgeType; label: string }> = {
  feat: { color: 'success', type: 'filled', label: 'Feature' },
  fix: { color: 'error', type: 'filled', label: 'Fix' },
  docs: { color: 'blue', type: 'filled', label: 'Docs' },
  refactor: { color: 'warning', type: 'filled', label: 'Refactor' },
  chore: { color: 'disabled', type: 'accent', label: 'Chore' },
  revert: { color: 'warning', type: 'accent', label: 'Revert' },
  other: { color: 'neutral', type: 'filled', label: 'Other' },
};

export const ChangelogComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter commits
  const filteredCommits = (changelogData as Commit[]).filter((commit) => {
    const matchesSearch =
      commit.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commit.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commit.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commit.scope.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'other'
        ? !['feat', 'fix', 'docs', 'refactor', 'chore', 'revert'].includes(commit.category)
        : commit.category === selectedCategory);

    return matchesSearch && matchesCategory;
  });

  // Group commits by date
  const groupedCommits = filteredCommits.reduce<Record<string, Commit[]>>((groups, commit) => {
    const date = commit.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(commit);
    return groups;
  }, {});

  // Format date header (e.g. "May 18, 2026")
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Unknown Date';
    try {
      const [year, month, day] = dateStr.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const categories = [
    { value: 'all', label: 'All Changes' },
    { value: 'feat', label: 'Features' },
    { value: 'fix', label: 'Fixes' },
    { value: 'docs', label: 'Documentation' },
    { value: 'refactor', label: 'Refactoring' },
    { value: 'chore', label: 'Chores' },
    { value: 'revert', label: 'Reverts' },
    { value: 'other', label: 'Others' },
  ];

  return (
    <div style={{ fontFamily: 'var(--font-family-primary)', color: '#101828', maxWidth: '1000px', margin: '0 auto' }}>
      <style>{`
        .changelog-search-container {
          margin-bottom: 24px;
        }
        .changelog-filter-group {
          margin-bottom: 32px;
          flex-wrap: wrap;
        }
        .changelog-timeline {
          position: relative;
          padding-left: 32px;
          margin-left: 12px;
          border-left: 2px solid #eaecf0;
        }
        .changelog-date-section {
          position: relative;
          margin-bottom: 40px;
        }
        .changelog-date-bullet {
          position: absolute;
          left: -44px;
          top: 4px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ffffff;
          border: 4px solid #183972;
          box-shadow: 0 0 0 4px #f2f4f7;
        }
        .changelog-date-title {
          font-size: 16px;
          font-weight: 700;
          color: #183972;
          margin: 0 0 16px 0;
        }
        .changelog-commits-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .changelog-commit-card {
          padding: 16px;
          background: #ffffff;
          border: 1px solid #eaecf0;
          border-radius: 12px;
          box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .changelog-commit-card:hover {
          transform: translateY(-2px);
          box-shadow: 0px 4px 12px rgba(16, 24, 40, 0.08);
          border-color: #d0d5dd;
        }
        .changelog-commit-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .changelog-badge-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .fmdqui-badge,
        .fmdqui-badge__label {
          font-size: 12px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          font-weight: 700 !important;
        }
        .changelog-scope {
          background: #f8f9fc;
          color: #344054;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          border: 1px solid #eaecf0;
        }
        .changelog-hash-link {
          font-family: monospace;
          font-size: 12px;
          color: #cc9933;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 600;
          transition: color 0.15s ease;
        }
        .changelog-hash-link:hover {
          color: #b38020;
          text-decoration: underline;
        }
        .changelog-commit-message {
          font-size: 14px;
          line-height: 1.5;
          color: #344054;
          margin-bottom: 12px;
        }
        .changelog-commit-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #667085;
        }
        .changelog-author-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .changelog-empty {
          text-align: center;
          padding: 48px;
          border: 1px dashed #eaecf0;
          border-radius: 16px;
          background: #f9fafb;
          color: #667085;
        }
      `}</style>

      {/* Search Header */}
      <div className="changelog-search-container">
        <Input
          hasLabel={false}
          hasHelperText={false}
          hasLeftIcon={true}
          hasRightIcon={false}
          placeholder="Search commits, authors, scopes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filter Tabs */}
      <ButtonGroup className="changelog-filter-group">
        {categories.map((cat, idx) => {
          const position =
            idx === 0 ? 'first'
            : idx === categories.length - 1 ? 'last'
            : 'middle';
          return (
            <ButtonGroupItem
              key={cat.value}
              label={cat.label}
              style={position}
              state={selectedCategory === cat.value ? 'focused' : 'regular'}
              onClick={() => setSelectedCategory(cat.value)}
            />
          );
        })}
      </ButtonGroup>

      {/* Timeline of Commits */}
      {Object.keys(groupedCommits).length > 0 ? (
        <div className="changelog-timeline">
          {Object.entries(groupedCommits).map(([date, commits]) => (
            <div key={date} className="changelog-date-section">
              <div className="changelog-date-bullet" />
              <h3 className="changelog-date-title">{formatDate(date)}</h3>
              <div className="changelog-commits-list">
                {commits.map((commit) => {
                  const catBadge = CATEGORY_BADGES[commit.category] || CATEGORY_BADGES.other;
                  const initials = commit.author ? commit.author.slice(0, 2) : '??';

                  return (
                    <div key={commit.hash} className="changelog-commit-card">
                      <div className="changelog-commit-header">
                        <div className="changelog-badge-container">
                          <Badge 
                            color={catBadge.color} 
                            type={catBadge.type} 
                            size="sm"
                          >
                            {catBadge.label}
                          </Badge>
                          {commit.scope && (
                            <span className="changelog-scope">
                              {commit.scope}
                            </span>
                          )}
                        </div>
                        {commit.url ? (
                          <a
                            href={commit.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="changelog-hash-link"
                          >
                            🔗 {commit.hash}
                          </a>
                        ) : (
                          <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#98a2b3' }}>
                            #{commit.hash}
                          </span>
                        )}
                      </div>
                      <div className="changelog-commit-message">{commit.message}</div>
                      <div className="changelog-commit-footer">
                        <div className="changelog-author-info">
                          <Avatar type="Initials" size="xs" initials={initials} />
                          <span>{commit.author}</span>
                        </div>
                        <Text as="span" size="sm" color="grey">{commit.email}</Text>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="changelog-empty">
          <Heading level={6} style={{ margin: '0 0 12px 0' }}>No changes found</Heading>
          <Text size="md" style={{ margin: 0 }}>Try clearing your search query or choosing another filter.</Text>
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '16px' }}>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
