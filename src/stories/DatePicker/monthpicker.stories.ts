import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { MonthPickerComponent } from './monthpicker.component';

const meta: Meta<MonthPickerComponent> = {
  title: 'components/MonthPicker',
  component: MonthPickerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [MonthPickerComponent],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
    valueChange: { action: 'valueChange' },
  },
  args: {
    label: 'Month',
    placeholder: 'Select a month',
    helperText: '',
    errorMessage: '',
    value: null,
    size: 'md',
    disabled: false,
    error: false,
    minValue: null,
    maxValue: null,
  },
};

export default meta;
type Story = StoryObj<MonthPickerComponent>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: { year: 2025, month: 5 } }, // June 2025
};

export const WithHelperText: Story = {
  args: { helperText: 'Select the billing month for your report.' },
};

export const ErrorState: Story = {
  args: { error: true, errorMessage: 'A month is required.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledWithValue: Story = {
  args: { disabled: true, value: { year: 2025, month: 5 } },
};

export const WithMinMaxValue: Story = {
  args: {
    minValue: { year: new Date().getFullYear(), month: 0 },
    maxValue: { year: new Date().getFullYear(), month: 11 },
    helperText: 'Only months within the current year are selectable.',
  },
};

export const SizeSmall: Story = {
  args: { size: 'sm' },
};

export const SizeMedium: Story = {
  args: { size: 'md' },
};

export const SizeLarge: Story = {
  args: { size: 'lg' },
};

export const NoLabel: Story = {
  args: { label: '' },
};
