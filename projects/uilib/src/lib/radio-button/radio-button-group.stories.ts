import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RadioButtonGroupComponent, RadioButtonItem } from './radio-button-group.component';

const defaultItems: RadioButtonItem[] = [
  { id: 'opt-1', label: 'Option one', value: 'one' },
  { id: 'opt-2', label: 'Option two', value: 'two' },
  { id: 'opt-3', label: 'Option three', value: 'three' },
  { id: 'opt-4', label: 'Option four', value: 'four' },
];

const itemsWithDisabled: RadioButtonItem[] = [
  { id: 'role-admin', label: 'Admin', value: 'admin' },
  { id: 'role-editor', label: 'Editor', value: 'editor' },
  { id: 'role-viewer', label: 'Viewer', value: 'viewer', disabled: true },
  { id: 'role-guest', label: 'Guest', value: 'guest', disabled: true },
];

const meta: Meta<RadioButtonGroupComponent> = {
  title: 'components/RadioButtonGroup',
  component: RadioButtonGroupComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RadioButtonGroupComponent],
    }),
  ],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'horizontal-next-row'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    groupLabel: { control: 'text' },
    groupDescription: { control: 'text' },
    value: { control: 'text' },
    valueChange: { action: 'valueChange' },
  },
  args: {
    items: defaultItems,
    groupLabel: 'Parent Label',
    groupDescription: '',
    value: '',
    orientation: 'vertical',
    size: 'md',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<RadioButtonGroupComponent>;

export const Default: Story = {};

export const WithPreselectedValue: Story = {
  args: {
    groupLabel: 'Preferred contact',
    value: 'two',
    items: defaultItems,
  },
};

export const WithDescription: Story = {
  args: {
    groupLabel: 'Parent Label',
    groupDescription: 'Description',
    items: defaultItems,
  },
};

export const Vertical: Story = {
  args: {
    groupLabel: 'Notification type',
    groupDescription: 'Choose how you want to be notified.',
    orientation: 'vertical',
    items: defaultItems,
  },
};

export const Horizontal: Story = {
  args: {
    groupLabel: 'Frequency',
    groupDescription: 'How often should we send updates?',
    orientation: 'horizontal',
    items: [
      { id: 'freq-daily', label: 'Daily', value: 'daily' },
      { id: 'freq-weekly', label: 'Weekly', value: 'weekly' },
      { id: 'freq-monthly', label: 'Monthly', value: 'monthly' },
    ],
  },
};

export const HorizontalNextRow: Story = {
  args: {
    groupLabel: 'Subscription plan',
    groupDescription: 'Select a billing plan.',
    orientation: 'horizontal-next-row',
    items: [
      { id: 'plan-free', label: 'Free', value: 'free' },
      { id: 'plan-pro', label: 'Pro', value: 'pro' },
      { id: 'plan-team', label: 'Team', value: 'team' },
      { id: 'plan-enterprise', label: 'Enterprise', value: 'enterprise' },
    ],
  },
};

export const WithDisabledItems: Story = {
  args: {
    groupLabel: 'User role',
    groupDescription: 'Some roles are restricted.',
    value: 'editor',
    items: itemsWithDisabled,
  },
};

export const AllDisabled: Story = {
  args: {
    groupLabel: 'Options',
    disabled: true,
    value: 'two',
    items: defaultItems,
  },
};

export const SizeSmall: Story = {
  args: {
    groupLabel: 'Small group',
    size: 'sm',
    items: defaultItems,
  },
};

export const SizeMedium: Story = {
  args: {
    groupLabel: 'Medium group',
    size: 'md',
    items: defaultItems,
  },
};

export const SizeLarge: Story = {
  args: {
    groupLabel: 'Large group',
    size: 'lg',
    items: defaultItems,
  },
};
