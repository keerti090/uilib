import type { Meta, StoryObj } from '@storybook/angular';
import { ProgressStepperComponent } from './progress-stepper.component';

const meta: Meta<ProgressStepperComponent> = {
  title: 'components/ProgressStepper',
  component: ProgressStepperComponent,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    type: {
      control: 'select',
      options: ['default', 'icon'],
    },
  },
  args: {
    orientation: 'horizontal',
    type: 'default',
  },
};

export default meta;
type Story = StoryObj<ProgressStepperComponent>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    steps: [
      { label: 'Details', state: 'done' },
      { label: 'Address', state: 'done' },
      { label: 'Payment', state: 'current' },
      { label: 'Review', state: 'not-done' },
      { label: 'Confirm', state: 'not-done' },
    ],
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    steps: [
      { label: 'Details', state: 'done' },
      { label: 'Address', state: 'done' },
      { label: 'Payment', state: 'current' },
      { label: 'Review', state: 'not-done' },
      { label: 'Confirm', state: 'not-done' },
    ],
  },
};

export const AllStates: Story = {
  args: {
    orientation: 'horizontal',
    steps: [
      { label: 'Done', state: 'done' },
      { label: 'Current', state: 'current' },
      { label: 'Not Done', state: 'not-done' },
      { label: 'Partial', state: 'partially-done' },
      { label: 'Error', state: 'error' },
    ],
  },
};

export const AllStatesVertical: Story = {
  args: {
    orientation: 'vertical',
    steps: [
      { label: 'Done', state: 'done' },
      { label: 'Current', state: 'current' },
      { label: 'Not Done', state: 'not-done' },
      { label: 'Partial', state: 'partially-done' },
      { label: 'Error', state: 'error' },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    orientation: 'horizontal',
    type: 'icon',
    steps: [
      { label: 'Account', state: 'done', icon: 'person' },
      { label: 'Location', state: 'current', icon: 'location_on' },
      { label: 'Payment', state: 'not-done', icon: 'credit_card' },
      { label: 'Review', state: 'not-done', icon: 'rate_review' },
    ],
  },
};

export const WithIconsVertical: Story = {
  args: {
    orientation: 'vertical',
    type: 'icon',
    steps: [
      { label: 'Account', state: 'done', icon: 'person' },
      { label: 'Location', state: 'current', icon: 'location_on' },
      { label: 'Payment', state: 'not-done', icon: 'credit_card' },
      { label: 'Review', state: 'not-done', icon: 'rate_review' },
    ],
  },
};

export const PartiallyDone: Story = {
  args: {
    orientation: 'horizontal',
    steps: [
      { label: 'Step 1', state: 'done' },
      { label: 'Step 2', state: 'partially-done' },
      { label: 'Step 3', state: 'current' },
      { label: 'Step 4', state: 'not-done' },
    ],
  },
};

export const WithError: Story = {
  args: {
    orientation: 'horizontal',
    steps: [
      { label: 'Step 1', state: 'done' },
      { label: 'Step 2', state: 'error' },
      { label: 'Step 3', state: 'current' },
      { label: 'Step 4', state: 'not-done' },
    ],
  },
};
