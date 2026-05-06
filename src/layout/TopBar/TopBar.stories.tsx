import type { Meta, StoryObj } from '@storybook/react-vite';
import { TopBar } from './TopBar';
import { Input } from '../../elements/Input';
import { Button } from '../../elements/Button';
import { Badge } from '../../elements/Badge';
import { Dropdown } from '../../components/Dropdown';

const meta: Meta<typeof TopBar> = {
  title: 'Layout/TopBar',
  component: TopBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '64px', borderBottom: '1px solid #e4e7ec', backgroundColor: '#fff' }}>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof TopBar>;

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const FMDQLogo = () => (
  <svg width="130" height="32" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Lines */}
    <rect x="18" y="6" width="22" height="5" rx="2.5" fill="#98a2b3" />
    <rect x="0" y="16" width="40" height="5" rx="2.5" fill="#034591" />
    <rect x="10" y="26" width="30" height="5" rx="2.5" fill="#d29729" />
    {/* FMDQ Text */}
    <text x="48" y="32" fontFamily="Arial, Helvetica, sans-serif" fontSize="32" fontWeight="bold" fill="#034591" letterSpacing="-1.5">FMDQ</text>
  </svg>
);

export const Default: Story = {
  args: {
    leftContent: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FMDQLogo />
      </div>
    ),
    centerContent: (
      <div style={{ width: '400px' }}>
        <Input 
          placeholder="Search for assets, trades..." 
          leadingIcon={<SearchIcon />} 
        />
      </div>
    ),
    rightContent: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ position: 'relative' }}>
          <Button variant="text" iconStyle="icon-only" icon={<BellIcon />} />
          <div style={{ position: 'absolute', top: '0', right: '0' }}>
            <Badge variant="destructive" size="sm" rounded>3</Badge>
          </div>
        </div>
        
        <Dropdown
          align="right"
          trigger={
            <Button variant="secondary" outline>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-primary-default)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>
                  BI
                </div>
                <span>Bonnie Imisioluwa</span>
              </div>
            </Button>
          }
          items={[
            { id: '1', label: 'My Profile', onClick: () => {} },
            { id: '2', label: 'Settings', onClick: () => {} },
            { id: '3', label: 'Sign Out', destructive: true, onClick: () => {} }
          ]}
        />
      </div>
    )
  }
};
