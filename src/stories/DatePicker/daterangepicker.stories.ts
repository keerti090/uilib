import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DateRangePickerComponent } from './daterangepicker.component';

const meta: Meta<DateRangePickerComponent> = {
  title: 'components/DateRangePicker',
  component: DateRangePickerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DateRangePickerComponent],
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
    label: 'Date range',
    placeholder: 'Select date range',
    helperText: '',
    errorMessage: '',
    value: null,
    size: 'md',
    disabled: false,
    error: false,
    minDate: null,
    maxDate: null,
  },
};

export default meta;
type Story = StoryObj<DateRangePickerComponent>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: {
      start: new Date(2025, 5, 3),
      end: new Date(2025, 5, 18),
    },
  },
};

export const WithHelperText: Story = {
  args: { helperText: 'Select the start and end dates for your booking.' },
};

export const ErrorState: Story = {
  args: { error: true, errorMessage: 'A date range is required.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledWithValue: Story = {
  args: {
    disabled: true,
    value: {
      start: new Date(2025, 5, 3),
      end: new Date(2025, 5, 18),
    },
  },
};

export const WithMinMaxDate: Story = {
  args: {
    minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    helperText: 'Only dates within the current month are selectable.',
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

export const SingleDayRange: Story = {
  args: {
    value: {
      start: new Date(2025, 5, 15),
      end: new Date(2025, 5, 15),
    },
  },
};
