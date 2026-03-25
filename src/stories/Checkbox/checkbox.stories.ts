import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'components/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CheckboxComponent],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    ariaLabel: { control: 'text' },
    inputId: { control: 'text' },
    checkedChange: { action: 'checkedChange' },
  },
  args: {
    label: 'Checkbox label',
    description: '',
    checked: false,
    indeterminate: false,
    disabled: false,
    error: false,
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, checked: false },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true },
};

export const WithDescription: Story = {
  args: {
    label: 'Enable notifications',
    description: 'Receive email alerts for important updates.',
  },
};

export const ErrorState: Story = {
  args: { error: true, label: 'I agree to the terms' },
};

export const SizeSmall: Story = {
  args: { size: 'sm', label: 'Small checkbox' },
};

export const SizeMedium: Story = {
  args: { size: 'md', label: 'Medium checkbox' },
};

export const SizeLarge: Story = {
  args: { size: 'lg', label: 'Large checkbox' },
};

export const SizeLargeWithDescription: Story = {
  args: {
    size: 'lg',
    label: 'Large with description',
    description: 'Additional context about this option.',
  },
};
