import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NumericStepperComponent } from './numeric-stepper.component';

const meta: Meta<NumericStepperComponent> = {
  title: 'components/NumericStepper',
  component: NumericStepperComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NumericStepperComponent],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['left-input', 'center-input'],
    },
    labelPosition: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    label: { control: 'text' },
    required: { control: 'boolean' },
    value: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    valueChange: { action: 'valueChange' },
  },
  args: {
    variant: 'left-input',
    labelPosition: 'vertical',
    label: 'Label',
    required: true,
    value: 0,
    step: 1,
    disabled: false,
    error: false,
  },
};

export default meta;
type Story = StoryObj<NumericStepperComponent>;

// ─── Left-Input Numeric Stepper ───────────────────────────────────────────────

export const LeftInputDefault: Story = {
  name: 'Left-Input / Default',
  args: { variant: 'left-input' },
};

export const LeftInputDisabled: Story = {
  name: 'Left-Input / Disabled',
  args: { variant: 'left-input', disabled: true, value: 5 },
};

export const LeftInputError: Story = {
  name: 'Left-Input / Error',
  args: { variant: 'left-input', error: true },
};

export const LeftInputWithMinMax: Story = {
  name: 'Left-Input / With Min & Max',
  args: { variant: 'left-input', value: 5, min: 0, max: 10 },
};

// ─── Center-Input Numeric Stepper (Vertical label) ────────────────────────────

export const CenterInputVerticalDefault: Story = {
  name: 'Center-Input / Vertical / Default',
  args: { variant: 'center-input', labelPosition: 'vertical' },
};

export const CenterInputVerticalDisabled: Story = {
  name: 'Center-Input / Vertical / Disabled',
  args: { variant: 'center-input', labelPosition: 'vertical', disabled: true, value: 5 },
};

export const CenterInputVerticalError: Story = {
  name: 'Center-Input / Vertical / Error',
  args: { variant: 'center-input', labelPosition: 'vertical', error: true },
};

// ─── Center-Input Numeric Stepper (Horizontal label) ─────────────────────────

export const CenterInputHorizontalDefault: Story = {
  name: 'Center-Input / Horizontal / Default',
  args: { variant: 'center-input', labelPosition: 'horizontal' },
};

export const CenterInputHorizontalDisabled: Story = {
  name: 'Center-Input / Horizontal / Disabled',
  args: { variant: 'center-input', labelPosition: 'horizontal', disabled: true, value: 3 },
};

export const CenterInputHorizontalError: Story = {
  name: 'Center-Input / Horizontal / Error',
  args: { variant: 'center-input', labelPosition: 'horizontal', error: true },
};
