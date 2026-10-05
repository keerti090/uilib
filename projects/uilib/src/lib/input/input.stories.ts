import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent> = {
  title: 'components/Input',
  component: InputComponent,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'hover', 'active', 'entered', 'disabled', 'error', 'error-active'],
    },
    type: { control: 'select', options: ['default', 'prefix-suffix', 'with-separator'] },
    layout: { control: 'select', options: ['vertical', 'horizontal'] },
    size: { control: 'select', options: ['large', 'small'] },
    nativeType: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helpText: { control: 'text' },
    value: { control: 'text' },
    required: { control: 'boolean' },
    showLabel: { control: 'boolean' },
    showHelpText: { control: 'boolean' },
    showInfoIcon: { control: 'boolean' },
    prefixIconName: { control: 'text' },
    suffixIconName: { control: 'text' },
    prefixText: { control: 'text' },
    suffixText: { control: 'text' },
    valueChange: { action: 'valueChange' },
    inputFocus: { action: 'inputFocus' },
    inputBlur: { action: 'inputBlur' },
    enter: { action: 'enter' },
    cleared: { action: 'cleared' },
    infoClick: { action: 'infoClick' },
  },
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    helpText: 'Help Text',
    state: 'default',
    type: 'default',
    layout: 'vertical',
    size: 'large',
    required: true,
    showLabel: true,
    showHelpText: true,
    showInfoIcon: false,
  },
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Default: Story = {};
export const Hover: Story = { args: { state: 'hover' } };
export const Active: Story = { args: { state: 'active', value: 'Inp' } };
export const Entered: Story = { args: { state: 'entered', value: 'Input value' } };
export const Disabled: Story = { args: { state: 'disabled', value: 'Input value' } };
export const Error: Story = { args: { state: 'error', value: 'Value' } };
export const ErrorActive: Story = { args: { state: 'error-active', value: 'Inp' } };

export const Small: Story = { args: { size: 'small' } };
export const Horizontal: Story = { args: { layout: 'horizontal' } };
export const WithInfoIcon: Story = { args: { showInfoIcon: true } };

export const PrefixSuffix: Story = {
  args: { type: 'prefix-suffix', prefixIconName: 'person', suffixIconName: 'error' },
};

export const WithSeparator: Story = {
  args: { type: 'with-separator', prefixIconName: 'person', prefixText: 'Label', suffixText: 'Label' },
};
