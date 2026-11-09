import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  CommandShortcut,
  DropdownMenuItemHeader,
  DropdownMenuItem,
  DropdownMenuSection,
  DropdownMenuList,
  SelectorMenuItem,
  SelectorMenuList,
  DropdownsMenu,
  DropdownsSelector,
  type DropdownMenuItemType,
  type DropdownMenuItemState,
  type SelectorMenuItemStyle,
  type SelectorMenuItemState,
  type DropdownsMenuType,
  type DropdownsMenuState,
  type DropdownsSelectorType,
  type DropdownsSelectorState,
} from './Dropdowns';

/* ───────────────────────────────────────────────────────────────────────────
   Figma: page "✤ Dropdowns" — file Hq7luvf787VJlCj1d3YJYw
   Stories are ordered the way Figma organises the page:
     Elements (Base components) → Nested components → Full components
   ─────────────────────────────────────────────────────────────────────────── */

const meta: Meta<typeof DropdownsMenu> = {
  title: 'Components/🔽 Dropdowns',
  component: DropdownsMenu,
  parameters: {
    docs: {
      description: {
        component:
          'Two families from the Figma "✤ Dropdowns" page: **Menu** — a trigger that opens a command-style popover — and **Selectors** — a form field that opens a list of options. Composed from the existing Input, Avatar, Toggle and foundations Icon components.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'avatar', 'icon-only'],
      description: 'Trigger style — Figma `type` variant',
      table: { category: 'Variant' },
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Visual state — Figma `state` variant',
      table: { category: 'Variant' },
    },
    extended: {
      control: 'boolean',
      description:
        'Figma `extended` variant. Leave unset for click-to-open; set it to control the menu.',
      table: { category: 'Variant' },
    },
    defaultExtended: {
      control: 'boolean',
      description: 'Initial open state when uncontrolled',
      table: { category: 'Variant' },
    },
    label: {
      control: 'text',
      description: 'Trigger label — Figma Label text node',
      table: { category: 'Content' },
    },
    iconName: {
      control: 'text',
      description: 'Leading icon — Figma `icon` INSTANCE_SWAP (default `plus-circle`)',
      table: { category: 'Content' },
    },
    trailingIconName: {
      control: 'text',
      description: 'Trailing icon — Figma `chevron-down`',
      table: { category: 'Content' },
    },
    avatarUrl: { control: 'text', table: { category: 'Content' } },
    sections: { control: false, table: { category: 'Content' } },
  },
};
export default meta;

const AVATAR = 'https://i.pravatar.cc/150?u=dropdowns';

// ─── Local presentation helpers (stories only) ─────────────────────────────

const Wrap: React.FC<{ title: string; note?: string; children: React.ReactNode }> = ({
  title,
  note,
  children,
}) => (
  <section style={{ marginBottom: 48, fontFamily: 'DM Sans, sans-serif' }}>
    <h3
      style={{
        margin: '0 0 4px',
        fontSize: 16,
        fontWeight: 600,
        color: 'var(--color-neutral-900)',
      }}
    >
      {title}
    </h3>
    {note && (
      <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--color-neutral-500)' }}>
        {note}
      </p>
    )}
    <div style={{ marginTop: 16 }}>{children}</div>
  </section>
);

const Cell: React.FC<{ label: string; children: React.ReactNode; width?: number }> = ({
  label,
  children,
  width = 240,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <code style={{ fontSize: 11, color: 'var(--color-neutral-500)' }}>{label}</code>
    <div style={{ width, border: '1px dashed var(--color-neutral-200)' }}>{children}</div>
  </div>
);

const MENU_TYPES: DropdownMenuItemType[] = ['default', 'avatar', 'icon'];
const MENU_STATES: DropdownMenuItemState[] = [
  'default',
  'hover',
  'focused',
  'selected',
  'disabled',
];
const SEL_STYLES: SelectorMenuItemStyle[] = ['default', 'avatar', 'icon', 'status'];
const SEL_STATES: SelectorMenuItemState[] = ['default', 'hover', 'focused', 'disabled'];

/* ═══════════════════════════════════════════════════════════════════════════
   1 · ELEMENTS — Figma "Base components" / "Selectors Base components"
   ═══════════════════════════════════════════════════════════════════════════ */

export const ElementsCommandShortcut: StoryObj = {
  name: 'Elements / ⌘ Command Shortcut',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `Command shortcut` (COMPONENT_SET 2327:77216) — both `Type` variants. Key frame: neutral-50 fill, 1px neutral-100 border, 4px radius, neutral-600 text.',
      },
    },
  },
  render: () => (
    <Wrap title="Command shortcut" note="Figma 2327:77216 · 2 variants (Type)">
      <div style={{ display: 'flex', gap: 24 }}>
        <Cell label="Type=Mac OS" width={80}>
          <div style={{ padding: 8 }}>
            <CommandShortcut type="mac os" />
          </div>
        </Cell>
        <Cell label="Type=windows OS" width={80}>
          <div style={{ padding: 8 }}>
            <CommandShortcut type="windows os" />
          </div>
        </Cell>
      </div>
    </Wrap>
  ),
};

export const ElementsMenuItemHeader: StoryObj = {
  name: 'Elements / 🏷️ Menu Item Header',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `Dropdown / menu item headers` (COMPONENT_SET 2159:85848) — both `borders` variants, plus the `has supporting texts` boolean. Title is DM Sans SemiBold 14, subtitle Regular 14 neutral-500.',
      },
    },
  },
  render: () => (
    <Wrap title="Menu item headers" note="Figma 2159:85848 · 2 variants (borders)">
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <Cell label="borders=true">
          <DropdownMenuItemHeader borders />
        </Cell>
        <Cell label="borders=false">
          <DropdownMenuItemHeader borders={false} />
        </Cell>
        <Cell label="has supporting texts=false">
          <DropdownMenuItemHeader borders hasSupportingTexts={false} />
        </Cell>
      </div>
    </Wrap>
  ),
};

export const ElementsMenuItemAllVariants: StoryObj = {
  name: 'Elements / 📋 Menu Item — all 15 Figma variants',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `Dropdown / menu item` (COMPONENT_SET 2159:51455) — the complete `type` × `state` matrix. The Checkcircle toggle appears only in `selected` and `disabled` (secondary-400 and neutral-300 respectively); the command shortcut is hidden in `selected`.',
      },
    },
  },
  render: () => (
    <Wrap
      title="Dropdown / menu item"
      note="Figma 2159:51455 · 15 variants = type (3) × state (5) · 240×36"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 24 }}>
        {MENU_TYPES.map((type) =>
          MENU_STATES.map((state) => (
            <Cell key={`${type}-${state}`} label={`type=${type}, state=${state}`}>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                <DropdownMenuItem type={type} state={state} avatarUrl={AVATAR} />
              </ul>
            </Cell>
          ))
        )}
      </div>
    </Wrap>
  ),
};

export const ElementsSelectorItemAllVariants: StoryObj = {
  name: 'Elements / 🔘 Selector Menu Item — all 32 Figma variants',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `.Selector menu / menu item` (COMPONENT_SET 2459:70670) — the complete `type` × `style` × `state` matrix. Note that `focused` is the only state that shifts the label to DM Sans Medium, and that unlike the menu item, the selector keeps neutral-900 text when disabled.',
      },
    },
  },
  render: () => (
    <Wrap
      title=".Selector menu / menu item"
      note="Figma 2459:70670 · 32 variants = type (2) × style (4) × state (4) · 375×36"
    >
      {(['default', 'selected'] as const).map((type) => (
        <div key={type} style={{ marginBottom: 32 }}>
          <code style={{ fontSize: 12, fontWeight: 600 }}>type={type}</code>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, auto)',
              gap: 20,
              marginTop: 12,
            }}
          >
            {SEL_STYLES.map((style) =>
              SEL_STATES.map((state) => (
                <Cell
                  key={`${type}-${style}-${state}`}
                  label={`style=${style}, state=${state}`}
                  width={375}
                >
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    <SelectorMenuItem
                      type={type}
                      style={style}
                      state={state}
                      avatarUrl={AVATAR}
                    />
                  </ul>
                </Cell>
              ))
            )}
          </div>
        </div>
      ))}
    </Wrap>
  ),
};

/* ═══════════════════════════════════════════════════════════════════════════
   2 · NESTED COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

/* Content and icons mirror the Figma popover exactly: the labels come from the
   Figma documentation frame, and every row uses the `icon` INSTANCE_SWAP
   default (`icon / hashtag`). Figma hides the section header inside the
   popover instances, so `hasHeader` is false here. */
const SECTION_A = {
  hasHeader: false,
  header: { title: 'Menu Title', subtitle: 'This is a subheading for the title' },
  items: [
    { menuText: 'Home', type: 'icon' as const },
    { menuText: 'Search', type: 'icon' as const },
    { menuText: 'Notifications', type: 'icon' as const },
  ],
};

const SECTION_B = {
  hasHeader: false,
  header: { title: 'Menu Title', subtitle: 'This is a subheading for the title' },
  items: [
    { menuText: 'Account Settings', type: 'icon' as const },
    { menuText: 'Admin Settings', type: 'icon' as const },
  ],
};

const SECTION_C = {
  hasHeader: false,
  header: { title: 'Menu Title', subtitle: 'This is a subheading for the title' },
  items: [
    { menuText: 'Sign out', type: 'icon' as const },
    { menuText: 'Delete account', type: 'icon' as const },
  ],
};

export const NestedMenuSection: StoryObj = {
  name: 'Nested / 🧩 Menu Items Section',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `Dropdown / menu items section` (COMPONENT 2159:81118) — a header (instanced with `borders=false`) followed by menu items. Vertical, 4px block padding, no gap.',
      },
    },
  },
  render: () => (
    <Wrap title="Dropdown / menu items section" note="Figma 2159:81118 · 240 wide">
      <div style={{ display: 'flex', gap: 24 }}>
        <Cell label="hasHeader (base component)">
          <DropdownMenuSection {...SECTION_A} hasHeader />
        </Cell>
        <Cell label="hasHeader=false (as instanced in the popover)">
          <DropdownMenuSection {...SECTION_A} />
        </Cell>
      </div>
    </Wrap>
  ),
};

export const NestedMenuList: StoryObj = {
  name: 'Nested / 🪟 Menu List (popover)',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `Dropdown / menu items` — the popover shell. White fill, 8px radius, 8px gap, and a 3-layer drop shadow captured as the new `--shadow-dropdown-menu` token. Sections are separated by 1px neutral-100 dividers, exactly as Figma composes them.',
      },
    },
  },
  render: () => (
    <Wrap
      title="Dropdown / menu items"
      note="3 sections separated by 1px dividers · 240 collapsed / 267 extended"
    >
      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
        <Cell label="width=240 (collapsed)">
          <DropdownMenuList sections={[SECTION_A, SECTION_B, SECTION_C]} />
        </Cell>
        <Cell label="width=267 (extended)" width={267}>
          <DropdownMenuList width={267} sections={[SECTION_A, SECTION_B, SECTION_C]} />
        </Cell>
      </div>
    </Wrap>
  ),
};

const SELECTOR_ITEMS = Array.from({ length: 5 }, () => ({
  menuText: 'Account settings',
  supportingText: '@account',
}));

export const NestedSelectorMenuList: StoryObj = {
  name: 'Nested / 📃 Selector Menu List',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `.Selector menu / menu list` — white fill, 1px neutral-200 border, 8px radius, 4px block padding. Its shadow is an exact match for the existing `--shadow-normal-xsm` token, so no new token was needed.',
      },
    },
  },
  render: () => (
    <Wrap title=".Selector menu / menu list" note="375 wide · shadow = --shadow-normal-xsm">
      <div style={{ width: 375 }}>
        <SelectorMenuList items={SELECTOR_ITEMS} />
      </div>
    </Wrap>
  ),
};

/* ═══════════════════════════════════════════════════════════════════════════
   3 · FULL COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

const MENU_TRIGGER_TYPES: DropdownsMenuType[] = ['default', 'avatar', 'icon-only'];
const MENU_TRIGGER_STATES: DropdownsMenuState[] = ['default', 'hover', 'active', 'disabled'];

export const FullDropdownsMenu: StoryObj = {
  name: 'Full / 🔽 Dropdowns Menu — all 12 Figma variants',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `Dropdown / Menu` (COMPONENT_SET 2190:54213) — the complete `type` × `state` matrix. Figma pairs `extended=yes` with `state=active`, which is reproduced here. Trigger strokes run neutral-300 → secondary-100 (hover) → secondary-300 (active).',
      },
    },
  },
  render: () => (
    <Wrap
      title="Dropdown / Menu"
      note="Figma 2190:54213 · 12 variants = type (3) × state (4) · extended=yes on active"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(140px, auto))',
          gap: 32,
          alignItems: 'flex-start',
        }}
      >
        {MENU_TRIGGER_TYPES.map((type) =>
          MENU_TRIGGER_STATES.map((state) => (
            <div key={`${type}-${state}`} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <code style={{ fontSize: 11, color: 'var(--color-neutral-500)' }}>
                {`type=${type}, state=${state}`}
              </code>
              <DropdownsMenu
                type={type}
                state={state}
                extended={state === 'active'}
                avatarUrl={AVATAR}
                sections={[SECTION_A, SECTION_B, SECTION_C]}
              />
            </div>
          ))
        )}
      </div>
    </Wrap>
  ),
};

const SEL_FIELD_TYPES: DropdownsSelectorType[] = [
  'default',
  'icon leading',
  'avatar leading',
  'status',
];
const SEL_FIELD_STATES: DropdownsSelectorState[] = [
  'default',
  'hover',
  'active',
  'filled',
  'disabled',
];

export const FullDropdownsSelector: StoryObj = {
  name: 'Full / 🔤 Dropdowns Selector — all 20 Figma variants',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `Dropdown / Selectors` (COMPONENT_SET 2959:115795) — the complete `type` × `state` matrix. The field is the existing `<Input size="lg">` element with the leading adornment and trailing chevron swapped in from the foundations icon set; `extended=true` reveals the `SelectorMenuList`. Figma pairs `extended=true` with `state=active`.',
      },
    },
  },
  render: () => (
    <Wrap
      title="Dropdown / Selectors"
      note="Figma 2959:115795 · 20 variants = type (4) × state (5) · extended=true on active"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 375px)',
          gap: 40,
          alignItems: 'flex-start',
        }}
      >
        {SEL_FIELD_TYPES.map((type) =>
          SEL_FIELD_STATES.map((state) => (
            <div key={`${type}-${state}`} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <code style={{ fontSize: 11, color: 'var(--color-neutral-500)' }}>
                {`type=${type}, state=${state}`}
              </code>
              <DropdownsSelector
                type={type}
                state={state}
                extended={state === 'active'}
                avatarUrl={AVATAR}
                items={SELECTOR_ITEMS}
              />
            </div>
          ))
        )}
      </div>
    </Wrap>
  ),
};

/* ═══════════════════════════════════════════════════════════════════════════
   4 · COMPOSITION — elements → nested → full, in one view
   ═══════════════════════════════════════════════════════════════════════════ */

export const AnatomyBuildUp: StoryObj = {
  name: 'Anatomy / 🧬 Elements → Nested → Full',
  parameters: {
    docs: {
      description: {
        story:
          'The same build-up Figma documents in its Anatomy frames. Menu anatomy: dropdown container, leading icon, avatar, dropdown texts, dropdown trigger, dropdown menu. Selector anatomy adds the label, input cursors, placeholder/input texts and helper/success/error texts.',
      },
    },
  },
  render: () => (
    <div style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Wrap title="① Elements" note="The atomic pieces, straight from Figma Base components">
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Cell label="CommandShortcut" width={80}>
            <div style={{ padding: 8 }}>
              <CommandShortcut />
            </div>
          </Cell>
          <Cell label="DropdownMenuItemHeader">
            <DropdownMenuItemHeader borders={false} />
          </Cell>
          <Cell label="DropdownMenuItem">
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              <DropdownMenuItem type="icon" menuText="Home" />
            </ul>
          </Cell>
          <Cell label="SelectorMenuItem" width={375}>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              <SelectorMenuItem style="avatar" avatarUrl={AVATAR} />
            </ul>
          </Cell>
        </div>
      </Wrap>

      <Wrap title="② Nested components" note="Elements composed into sections and popovers">
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Cell label="DropdownMenuSection">
            <DropdownMenuSection {...SECTION_A} />
          </Cell>
          <Cell label="DropdownMenuList">
            <DropdownMenuList sections={[SECTION_A, SECTION_B]} />
          </Cell>
          <Cell label="SelectorMenuList" width={375}>
            <SelectorMenuList items={SELECTOR_ITEMS.slice(0, 3)} />
          </Cell>
        </div>
      </Wrap>

      <Wrap title="③ Full components" note="Trigger + menu, and Input + menu">
        <div style={{ display: 'flex', gap: 64, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div>
            <code style={{ fontSize: 11, color: 'var(--color-neutral-500)' }}>DropdownsMenu</code>
            <div style={{ marginTop: 6 }}>
              <DropdownsMenu
                state="active"
                extended
                sections={[SECTION_A, SECTION_B, SECTION_C]}
              />
            </div>
          </div>
          <div>
            <code style={{ fontSize: 11, color: 'var(--color-neutral-500)' }}>
              DropdownsSelector
            </code>
            <div style={{ marginTop: 6 }}>
              <DropdownsSelector
                type="avatar leading"
                state="active"
                extended
                avatarUrl={AVATAR}
                items={SELECTOR_ITEMS}
              />
            </div>
          </div>
        </div>
      </Wrap>
    </div>
  ),
};

/* ═══════════════════════════════════════════════════════════════════════════
   5 · PLAYGROUNDS
   ═══════════════════════════════════════════════════════════════════════════ */

/* `extended` is deliberately left out of the args below. Omitting it puts the
   component in uncontrolled mode, so the trigger actually opens and closes on
   click (plus outside-click and Escape). Set the `extended` control to pin the
   menu open or shut and the component switches to controlled mode. */

export const MenuPlayground: StoryObj<typeof DropdownsMenu> = {
  name: 'Playground / Menu',
  parameters: {
    docs: {
      description: {
        story:
          'Click the trigger to open and close the menu. Click outside or press Escape to dismiss. Setting the `extended` control takes over and pins the menu.',
      },
    },
  },
  args: {
    type: 'default',
    state: 'default',
    label: 'Label',
    avatarUrl: AVATAR,
    sections: [SECTION_A, SECTION_B, SECTION_C],
  },
};

export const SelectorPlayground: StoryObj<typeof DropdownsSelector> = {
  name: 'Playground / Selector',
  parameters: {
    docs: {
      description: {
        story:
          'Click the field to open it, then pick a row — the selection fills the field and the menu closes. Outside-click and Escape dismiss it. Setting `extended` or `state` takes over.',
      },
    },
  },
  render: (args) => <DropdownsSelector {...args} />,
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'icon leading', 'avatar leading', 'status'],
      description: 'Leading adornment — Figma `type` variant',
      table: { category: 'Variant' },
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'active', 'filled', 'disabled'],
      description: 'Visual state — Figma `state` variant',
      table: { category: 'Variant' },
    },
    extended: {
      control: 'boolean',
      description:
        'Figma `extended` variant. Leave unset for click-to-open; set it to control the menu.',
      table: { category: 'Variant' },
    },
    hasLabel: {
      control: 'boolean',
      description: 'Figma `has label`',
      table: { category: 'Boolean Controls' },
    },
    hasHelperTexts: {
      control: 'boolean',
      description: 'Figma `has helper texts`',
      table: { category: 'Boolean Controls' },
    },
    label: { control: 'text', table: { category: 'Content' } },
    helperText: { control: 'text', table: { category: 'Content' } },
    placeholder: { control: 'text', table: { category: 'Content' } },
    iconName: { control: 'text', table: { category: 'Content' } },
    avatarUrl: { control: 'text', table: { category: 'Content' } },
    items: { control: false, table: { category: 'Content' } },
  },
  args: {
    type: 'default',
    state: 'default',
    hasLabel: true,
    label: 'Label',
    hasHelperTexts: false,
    helperText: 'Helper text',
    placeholder: 'Placeholder',
    avatarUrl: AVATAR,
    items: SELECTOR_ITEMS,
  },
};
