import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { TreeViewComponent, TreeViewNode } from './tree-view.component';

// ── Sample data sets (mirrors the Figma variants) ────────────────────────────

const oneLevelNodes: TreeViewNode[] = [
  { label: 'Label' },
  { label: 'Label' },
  { label: 'Label' },
  { label: 'Label' },
  { label: 'Label' },
];

const twoLevelNodes: TreeViewNode[] = [
  {
    label: 'Label',
    children: [
      { label: 'Label' },
      { label: 'Label' },
      { label: 'Label' },
    ],
  },
  { label: 'Label' },
  { label: 'Label' },
];

const threeLevelNodes: TreeViewNode[] = [
  {
    label: 'Label',
    children: [
      {
        label: 'Label',
        children: [
          { label: 'Label' },
          { label: 'Label' },
        ],
      },
      { label: 'Label' },
    ],
  },
  { label: 'Label' },
];

const fourLevelNodes: TreeViewNode[] = [
  {
    label: 'Label',
    children: [
      {
        label: 'Label',
        children: [
          {
            label: 'Label',
            children: [
              { label: 'Label' },
              { label: 'Label' },
            ],
          },
          { label: 'Label' },
        ],
      },
      { label: 'Label' },
    ],
  },
  { label: 'Label' },
];

const realWorldNodes: TreeViewNode[] = [
  {
    label: 'Documents',
    icon: 'folder',
    children: [
      {
        label: 'Reports',
        icon: 'folder',
        children: [
          { label: 'Q1 Report.pdf', icon: 'description' },
          { label: 'Q2 Report.pdf', icon: 'description' },
        ],
      },
      { label: 'Invoice.xlsx', icon: 'description' },
    ],
  },
  {
    label: 'Images',
    icon: 'folder',
    children: [
      { label: 'logo.png', icon: 'image' },
      { label: 'banner.jpg', icon: 'image', disabled: true },
    ],
  },
  { label: 'README.md', icon: 'description' },
];

// ── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<TreeViewComponent> = {
  title: 'components/Tree View/Tree View',
  component: TreeViewComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [TreeViewComponent] }),
  ],
  argTypes: {
    type: { control: 'select', options: ['global', 'local'] },
    showIcons: { control: 'boolean' },
    nodes: { control: 'object' },
  },
  args: {
    type: 'global',
    showIcons: true,
    nodes: twoLevelNodes,
  },
};

export default meta;
type Story = StoryObj<TreeViewComponent>;

// ── Figma spec variants ───────────────────────────────────────────────────────

/** Matches Figma: States=1 Level (Default) */
export const OneLevel: Story = {
  args: { nodes: oneLevelNodes },
};

/** Matches Figma: States=2 Levels */
export const TwoLevels: Story = {
  args: { nodes: twoLevelNodes },
};

/** Matches Figma: States=3 Levels */
export const ThreeLevels: Story = {
  args: { nodes: threeLevelNodes },
};

/** Matches Figma: States=4 Levels */
export const FourLevels: Story = {
  args: { nodes: fourLevelNodes },
};

// ── Type variants ─────────────────────────────────────────────────────────────

/** Matches Figma: Type=Local */
export const LocalType: Story = {
  args: { type: 'local', nodes: twoLevelNodes },
};

/** Side-by-side Global vs Local (mirrors Figma layout) */
export const GlobalVsLocal: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:40px; padding:24px; align-items:flex-start; font-family:Inter,sans-serif;">
        <div>
          <p style="font-size:11px;color:#888;margin:0 0 6px">Global</p>
          <app-tree-view type="global" [nodes]="nodes" [showIcons]="true"></app-tree-view>
        </div>
        <div>
          <p style="font-size:11px;color:#888;margin:0 0 6px">Local</p>
          <app-tree-view type="local" [nodes]="nodes" [showIcons]="true"></app-tree-view>
        </div>
      </div>
    `,
    props: { nodes: twoLevelNodes },
    moduleMetadata: { imports: [TreeViewComponent] },
  }),
};

// ── Real-world usage ──────────────────────────────────────────────────────────

/** Custom data with icons, nested folders, and a disabled leaf. */
export const RealWorldData: Story = {
  args: {
    type: 'global',
    nodes: realWorldNodes,
    showIcons: true,
  },
};

export const WithDisabledNodes: Story = {
  args: {
    nodes: [
      { label: 'Active Item' },
      { label: 'Disabled Item', disabled: true },
      { label: 'Active Item' },
      { label: 'Disabled Item', disabled: true },
    ],
  },
};
