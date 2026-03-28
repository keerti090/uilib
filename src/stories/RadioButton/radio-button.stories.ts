import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RadioButtonComponent } from './radio-button.component';

const meta: Meta<RadioButtonComponent> = {
  title: 'components/RadioButton',
  component: RadioButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RadioButtonComponent],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    inputId: { control: 'text' },
    ariaLabel: { control: 'text' },
    valueChange: { action: 'valueChange' },
  },
  args: {
    label: 'Label',
    checked: false,
    disabled: false,
    size: 'md',
    name: 'radio-demo',
    value: 'option',
  },
};

export default meta;
type Story = StoryObj<RadioButtonComponent>;

export const Default: Story = {};

export const Selected: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledSelected: Story = {
  args: { disabled: true, checked: true },
};

export const SizeSmall: Story = {
  args: { size: 'sm', label: 'Small' },
};

export const SizeMedium: Story = {
  args: { size: 'md', label: 'Medium' },
};

export const SizeLarge: Story = {
  args: { size: 'lg', label: 'Large' },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <AppCore-radio-button size="sm" label="Small" [checked]="false"></AppCore-radio-button>
        <AppCore-radio-button size="md" label="Medium" [checked]="false"></AppCore-radio-button>
        <AppCore-radio-button size="lg" label="Large" [checked]="false"></AppCore-radio-button>
      </div>
    `,
  }),
};

export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <AppCore-radio-button label="Default unselected" [checked]="false"></AppCore-radio-button>
        <AppCore-radio-button label="Default selected" [checked]="true"></AppCore-radio-button>
        <AppCore-radio-button label="Disabled unselected" [checked]="false" [disabled]="true"></AppCore-radio-button>
        <AppCore-radio-button label="Disabled selected" [checked]="true" [disabled]="true"></AppCore-radio-button>
      </div>
    `,
  }),
};
