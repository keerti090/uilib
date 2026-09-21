import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CheckboxGroupComponent, CheckboxItem } from './checkbox-group.component';

const defaultItems: CheckboxItem[] = [
  { id: 'opt-1', label: 'Option one', checked: false },
  { id: 'opt-2', label: 'Option two', checked: true },
  { id: 'opt-3', label: 'Option three', checked: false },
  { id: 'opt-4', label: 'Option four', checked: false },
];

const itemsWithDescriptions: CheckboxItem[] = [
  {
    id: 'notif-email',
    label: 'Email notifications',
    description: 'Receive updates via email.',
    checked: true,
  },
  {
    id: 'notif-sms',
    label: 'SMS notifications',
    description: 'Receive updates via text message.',
    checked: false,
  },
  {
    id: 'notif-push',
    label: 'Push notifications',
    description: 'Receive updates in the browser.',
    checked: false,
  },
];

const itemsWithDisabled: CheckboxItem[] = [
  { id: 'role-admin', label: 'Admin', checked: true, disabled: true },
  { id: 'role-editor', label: 'Editor', checked: true },
  { id: 'role-viewer', label: 'Viewer', checked: false },
  { id: 'role-guest', label: 'Guest', checked: false, disabled: true },
];

const meta: Meta<CheckboxGroupComponent> = {
  title: 'components/CheckboxGroup',
  component: CheckboxGroupComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CheckboxGroupComponent],
    }),
  ],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showSelectAll: { control: 'boolean' },
    disabled: { control: 'boolean' },
    groupLabel: { control: 'text' },
    groupDescription: { control: 'text' },
    selectAllLabel: { control: 'text' },
    error: { control: 'text' },
    selectionChange: { action: 'selectionChange' },
  },
  args: {
    items: defaultItems,
    groupLabel: 'Preferences',
    groupDescription: '',
    showSelectAll: false,
    selectAllLabel: 'Select All',
    orientation: 'vertical',
    size: 'md',
    disabled: false,
    error: '',
  },
};

export default meta;
type Story = StoryObj<CheckboxGroupComponent>;

export const Default: Story = {};

export const WithGroupLabel: Story = {
  args: {
    groupLabel: 'Notification channels',
    groupDescription: 'Choose how you want to be notified.',
    items: itemsWithDescriptions,
  },
};

export const WithSelectAll: Story = {
  args: {
    groupLabel: 'Features',
    showSelectAll: true,
    items: defaultItems,
  },
};

export const SelectAllIndeterminate: Story = {
  args: {
    groupLabel: 'Features',
    showSelectAll: true,
    items: [
      { id: 'f-1', label: 'Dark mode', checked: true },
      { id: 'f-2', label: 'Auto-save', checked: false },
      { id: 'f-3', label: 'Spell check', checked: true },
      { id: 'f-4', label: 'Compact view', checked: false },
    ],
  },
};

export const SelectAllChecked: Story = {
  args: {
    groupLabel: 'Features',
    showSelectAll: true,
    items: [
      { id: 'f-1', label: 'Dark mode', checked: true },
      { id: 'f-2', label: 'Auto-save', checked: true },
      { id: 'f-3', label: 'Spell check', checked: true },
    ],
  },
};

export const HorizontalLayout: Story = {
  args: {
    groupLabel: 'Days available',
    orientation: 'horizontal',
    items: [
      { id: 'd-mon', label: 'Monday', checked: true },
      { id: 'd-tue', label: 'Tuesday', checked: false },
      { id: 'd-wed', label: 'Wednesday', checked: true },
      { id: 'd-thu', label: 'Thursday', checked: false },
      { id: 'd-fri', label: 'Friday', checked: true },
    ],
  },
};

export const WithDescriptions: Story = {
  args: {
    groupLabel: 'Notification channels',
    groupDescription: 'Select where you want to receive alerts.',
    items: itemsWithDescriptions,
  },
};

export const WithDisabledItems: Story = {
  args: {
    groupLabel: 'User roles',
    groupDescription: 'Locked roles cannot be modified.',
    items: itemsWithDisabled,
  },
};

export const AllDisabled: Story = {
  args: {
    groupLabel: 'Options',
    disabled: true,
    showSelectAll: true,
    items: defaultItems,
  },
};

export const ErrorState: Story = {
  args: {
    groupLabel: 'Required selection',
    error: 'Please select at least one option.',
    items: defaultItems.map(i => ({ ...i, checked: false })),
  },
};

export const SizeSmall: Story = {
  args: {
    groupLabel: 'Small size group',
    size: 'sm',
    items: defaultItems,
  },
};

export const SizeLarge: Story = {
  args: {
    groupLabel: 'Large size group',
    size: 'lg',
    items: itemsWithDescriptions,
  },
};
