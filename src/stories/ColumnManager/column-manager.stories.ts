import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  ColumnManagerComponent,
  ColumnManagerGroup,
} from './column-manager.component';

const defaultGroups: ColumnManagerGroup[] = [
  {
    id: 'group-personal',
    label: 'Personal Information',
    columns: [
      { id: 'col-first-name', label: 'First Name', visible: true, locked: true },
      { id: 'col-last-name', label: 'Last Name', visible: true },
      { id: 'col-email', label: 'Email', visible: true },
      { id: 'col-phone', label: 'Phone', visible: false },
      { id: 'col-dob', label: 'Date of Birth', visible: false },
    ],
  },
  {
    id: 'group-address',
    label: 'Address',
    columns: [
      { id: 'col-street', label: 'Street', visible: true },
      { id: 'col-city', label: 'City', visible: true },
      { id: 'col-state', label: 'State', visible: false },
      { id: 'col-zip', label: 'Zip Code', visible: false },
      { id: 'col-country', label: 'Country', visible: true },
    ],
  },
  {
    id: 'group-account',
    label: 'Account Details',
    collapsed: true,
    columns: [
      { id: 'col-account-id', label: 'Account ID', visible: true, locked: true },
      { id: 'col-created', label: 'Created Date', visible: true },
      { id: 'col-modified', label: 'Last Modified', visible: false },
      { id: 'col-status', label: 'Status', visible: true },
    ],
  },
];

const meta: Meta<ColumnManagerComponent> = {
  title: 'components/ColumnManager',
  component: ColumnManagerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ColumnManagerComponent],
    }),
  ],
  argTypes: {
    title: { control: 'text' },
    searchable: { control: 'boolean' },
    groups: { control: 'object' },
    groupsChange: { action: 'groupsChange' },
    apply: { action: 'apply' },
    cancel: { action: 'cancel' },
  },
  args: {
    title: 'Manage Columns',
    searchable: true,
    groups: defaultGroups,
  },
};

export default meta;
type Story = StoryObj<ColumnManagerComponent>;

export const Default: Story = {};

export const NoSearch: Story = {
  args: {
    searchable: false,
  },
};

export const AllExpanded: Story = {
  args: {
    groups: defaultGroups.map(g => ({ ...g, collapsed: false })),
  },
};

export const AllColumnsVisible: Story = {
  args: {
    groups: defaultGroups.map(g => ({
      ...g,
      collapsed: false,
      columns: g.columns.map(c => ({ ...c, visible: true })),
    })),
  },
};

export const AllColumnsHidden: Story = {
  args: {
    groups: defaultGroups.map(g => ({
      ...g,
      collapsed: false,
      columns: g.columns.map(c => ({ ...c, visible: c.locked ?? false })),
    })),
  },
};

export const SingleGroup: Story = {
  args: {
    groups: [
      {
        id: 'group-metrics',
        label: 'Metrics',
        columns: [
          { id: 'col-revenue', label: 'Revenue', visible: true },
          { id: 'col-cost', label: 'Cost', visible: true },
          { id: 'col-profit', label: 'Profit', visible: false },
          { id: 'col-margin', label: 'Margin', visible: false },
          { id: 'col-growth', label: 'Growth', visible: true },
        ],
      },
    ],
  },
};

export const ManyGroups: Story = {
  args: {
    groups: [
      {
        id: 'group-1',
        label: 'Identification',
        columns: [
          { id: 'c1', label: 'ID', visible: true, locked: true },
          { id: 'c2', label: 'UUID', visible: false },
        ],
      },
      {
        id: 'group-2',
        label: 'Personal',
        columns: [
          { id: 'c3', label: 'First Name', visible: true },
          { id: 'c4', label: 'Last Name', visible: true },
          { id: 'c5', label: 'Email', visible: true },
          { id: 'c6', label: 'Phone', visible: false },
        ],
      },
      {
        id: 'group-3',
        label: 'Location',
        collapsed: true,
        columns: [
          { id: 'c7', label: 'Country', visible: true },
          { id: 'c8', label: 'State', visible: false },
          { id: 'c9', label: 'City', visible: false },
          { id: 'c10', label: 'Zip Code', visible: false },
        ],
      },
      {
        id: 'group-4',
        label: 'Account',
        collapsed: true,
        columns: [
          { id: 'c11', label: 'Plan', visible: true },
          { id: 'c12', label: 'Status', visible: true },
          { id: 'c13', label: 'Created At', visible: false },
          { id: 'c14', label: 'Updated At', visible: false },
        ],
      },
      {
        id: 'group-5',
        label: 'Metrics',
        collapsed: true,
        columns: [
          { id: 'c15', label: 'Logins', visible: false },
          { id: 'c16', label: 'Sessions', visible: false },
          { id: 'c17', label: 'Revenue', visible: true },
        ],
      },
    ],
  },
};
