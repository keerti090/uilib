import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { TreeViewItemComponent } from './tree-view-item.component';

const meta: Meta<TreeViewItemComponent> = {
  title: 'components/Tree View/Tree View Item',
  component: TreeViewItemComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TreeViewItemComponent],
    }),
  ],
  argTypes: {
    label: { control: 'text' },
    level: { control: 'select', options: [1, 2, 3, 4] },
    type: { control: 'select', options: ['global', 'local'] },
    state: {
      control: 'select',
      options: ['default', 'hover', 'pressed', 'selected', 'disabled'],
    },
    expanded: { control: 'boolean' },
    hasChildren: { control: 'boolean' },
    showPrefixIcon: { control: 'boolean' },
    prefixIcon: { control: 'text' },
  },
  args: {
    label: 'Label',
    level: 1,
    type: 'global',
    state: 'default',
    expanded: false,
    hasChildren: false,
    showPrefixIcon: true,
    prefixIcon: 'add',
  },
};

export default meta;
type Story = StoryObj<TreeViewItemComponent>;

export const Default: Story = {};

export const Level1Collapsed: Story = {
  args: { level: 1, hasChildren: true, expanded: false },
};

export const Level1Expanded: Story = {
  args: { level: 1, hasChildren: true, expanded: true },
};

export const Level2: Story = {
  args: { level: 2 },
};

export const Level3: Story = {
  args: { level: 3 },
};

export const Level4: Story = {
  args: { level: 4 },
};

export const Hover: Story = {
  args: { state: 'hover' },
};

export const Selected: Story = {
  args: { state: 'selected' },
};

export const Disabled: Story = {
  args: { state: 'disabled' },
};

export const LocalType: Story = {
  args: { type: 'local' },
};

export const LocalHover: Story = {
  args: { type: 'local', state: 'hover' },
};

export const LocalSelected: Story = {
  args: { type: 'local', state: 'selected' },
};

export const AllGlobalStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 4px; padding: 16px; background: #f9f9f9;">
        <p style="font-family: Inter, sans-serif; font-size: 12px; color: #666; margin: 0 0 8px;">Global Type</p>
        <app-tree-view-item label="Default" [level]="1" type="global" state="default" [showPrefixIcon]="true"></app-tree-view-item>
        <app-tree-view-item label="Hover" [level]="1" type="global" state="hover" [showPrefixIcon]="true"></app-tree-view-item>
        <app-tree-view-item label="Pressed" [level]="1" type="global" state="pressed" [showPrefixIcon]="true"></app-tree-view-item>
        <app-tree-view-item label="Selected" [level]="1" type="global" state="selected" [showPrefixIcon]="true"></app-tree-view-item>
        <app-tree-view-item label="Disabled" [level]="1" type="global" state="disabled" [showPrefixIcon]="true"></app-tree-view-item>
      </div>
    `,
    moduleMetadata: { imports: [TreeViewItemComponent] },
  }),
};

export const AllLocalStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 4px; padding: 16px; background: #f9f9f9;">
        <p style="font-family: Inter, sans-serif; font-size: 12px; color: #666; margin: 0 0 8px;">Local Type</p>
        <app-tree-view-item label="Default" [level]="1" type="local" state="default" [showPrefixIcon]="true"></app-tree-view-item>
        <app-tree-view-item label="Hover" [level]="1" type="local" state="hover" [showPrefixIcon]="true"></app-tree-view-item>
        <app-tree-view-item label="Pressed" [level]="1" type="local" state="pressed" [showPrefixIcon]="true"></app-tree-view-item>
        <app-tree-view-item label="Selected" [level]="1" type="local" state="selected" [showPrefixIcon]="true"></app-tree-view-item>
        <app-tree-view-item label="Disabled" [level]="1" type="local" state="disabled" [showPrefixIcon]="true"></app-tree-view-item>
      </div>
    `,
    moduleMetadata: { imports: [TreeViewItemComponent] },
  }),
};

export const AllLevels: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 4px; padding: 16px; background: #f9f9f9; width: 220px;">
        <app-tree-view-item label="Level 1" [level]="1" type="global" state="default" [showPrefixIcon]="true" [hasChildren]="true" [expanded]="true"></app-tree-view-item>
        <app-tree-view-item label="Level 2" [level]="2" type="global" state="default" [showPrefixIcon]="true" [hasChildren]="true" [expanded]="true"></app-tree-view-item>
        <app-tree-view-item label="Level 3" [level]="3" type="global" state="default" [showPrefixIcon]="true" [hasChildren]="true" [expanded]="true"></app-tree-view-item>
        <app-tree-view-item label="Level 4" [level]="4" type="global" state="default" [showPrefixIcon]="true"></app-tree-view-item>
      </div>
    `,
    moduleMetadata: { imports: [TreeViewItemComponent] },
  }),
};
