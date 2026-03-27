import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DatePickerComponent } from './datepicker.component';

const meta: Meta<DatePickerComponent> = {
  title: 'components/DatePicker',
  component: DatePickerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DatePickerComponent],
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
    label: 'Date',
    placeholder: 'Select a date',
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
type Story = StoryObj<DatePickerComponent>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: new Date(2025, 5, 15) }, // June 15, 2025
};

export const WithHelperText: Story = {
  args: { helperText: 'Select the date for your appointment.' },
};

export const ErrorState: Story = {
  args: { error: true, errorMessage: 'A date is required.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledWithValue: Story = {
  args: { disabled: true, value: new Date(2025, 5, 15) },
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
