import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { TreeViewComponent, TreeViewNode } from './tree-view.component';

const oneLevelNodes: TreeViewNode[] = [
  { id: '1', label: 'Label' },
  { id: '2', label: 'Label' },
  { id: '3', label: 'Label' },
  { id: '4', label: 'Label' },
  { id: '5', label: 'Label' },
];

const twoLevelNodes: TreeViewNode[] = [
  {
    id: '1',
    label: 'Label',
    children: [
      { id: '1-1', label: 'Label' },
      { id: '1-2', label: 'Label' },
      { id: '1-3', label: 'Label' },
    ],
  },
  { id: '2', label: 'Label' },
  { id: '3', label: 'Label' },
];

const threeLevelNodes: TreeViewNode[] = [
  {
    id: '1',
    label: 'Label',
    children: [
      {
        id: '1-1',
        label: 'Label',
        children: [
          { id: '1-1-1', label: 'Label' },
          { id: '1-1-2', label: 'Label' },
        ],
      },
      { id: '1-2', label: 'Label' },
    ],
  },
  { id: '2', label: 'Label' },
];

const fourLevelNodes: TreeViewNode[] = [
  {
    id: '1',
    label: 'Label',
    children: [
      {
        id: '1-1',
        label: 'Label',
        children: [
          {
            id: '1-1-1',
            label: 'Label',
            children: [
              { id: '1-1-1-1', label: 'Label' },
              { id: '1-1-1-2', label: 'Label' },
            ],
          },
          { id: '1-1-2', label: 'Label' },
        ],
      },
      { id: '1-2', label: 'Label' },
    ],
  },
  { id: '2', label: 'Label' },
];

const meta: Meta<TreeViewComponent> = {
  title: 'components/Tree View/Tree View',
  component: TreeViewComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TreeViewComponent],
    }),
  ],
  argTypes: {
    type: { control: 'select', options: ['global', 'local'] },
    showIcons: { control: 'boolean' },
    nodes: { control: 'object' },
    selectedId: { control: 'text' },
  },
  args: {
    type: 'global',
    showIcons: true,
    nodes: oneLevelNodes,
    selectedId: null,
  },
};

export default meta;
type Story = StoryObj<TreeViewComponent>;

export const Default: Story = {};

export const OneLevel: Story = {
  args: {
    nodes: oneLevelNodes,
  },
};

export const TwoLevels: Story = {
  args: {
    nodes: twoLevelNodes,
  },
};

export const ThreeLevels: Story = {
  args: {
    nodes: threeLevelNodes,
  },
};

export const FourLevels: Story = {
  args: {
    nodes: fourLevelNodes,
  },
};

export const LocalType: Story = {
  args: {
    type: 'local',
    nodes: twoLevelNodes,
  },
};

export const WithDisabledNodes: Story = {
  args: {
    nodes: [
      { id: '1', label: 'Active Item' },
      { id: '2', label: 'Disabled Item', disabled: true },
      { id: '3', label: 'Active Item' },
      { id: '4', label: 'Disabled Item', disabled: true },
    ],
  },
};

export const GlobalVsLocal: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 40px; padding: 24px; align-items: flex-start;">
        <div>
          <p style="font-family: Inter, sans-serif; font-size: 12px; color: #666; margin: 0 0 8px;">Global</p>
          <app-tree-view type="global" [nodes]="nodes" [showIcons]="true"></app-tree-view>
        </div>
        <div>
          <p style="font-family: Inter, sans-serif; font-size: 12px; color: #666; margin: 0 0 8px;">Local</p>
          <app-tree-view type="local" [nodes]="nodes" [showIcons]="true"></app-tree-view>
        </div>
      </div>
    `,
    props: { nodes: twoLevelNodes },
    moduleMetadata: { imports: [TreeViewComponent] },
  }),
};
