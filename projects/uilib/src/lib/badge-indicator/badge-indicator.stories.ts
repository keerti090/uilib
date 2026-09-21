import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BadgeIndicatorComponent } from './badge-indicator.component';

const meta: Meta<BadgeIndicatorComponent> = {
  title: 'components/BadgeIndicator',
  component: BadgeIndicatorComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BadgeIndicatorComponent],
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['Default', 'Error', 'Success', 'Warning', 'Inactive'],
    },
    indicatorStyle: {
      control: 'select',
      options: ['Dot - Inline', 'Dot - Overlapping', 'With Text', 'With Text - Overlapping'],
    },
    label: { control: 'text' },
    count: { control: 'text' },
  },
  args: {
    type: 'Default',
    indicatorStyle: 'Dot - Inline',
    label: 'Label',
    count: '+99',
  },
};

export default meta;
type Story = StoryObj<BadgeIndicatorComponent>;

export const Default: Story = {};

// ===== Dot - Inline =====
export const DotInlineDefault: Story = {
  args: { type: 'Default', indicatorStyle: 'Dot - Inline' },
};

export const DotInlineError: Story = {
  args: { type: 'Error', indicatorStyle: 'Dot - Inline' },
};

export const DotInlineSuccess: Story = {
  args: { type: 'Success', indicatorStyle: 'Dot - Inline' },
};

export const DotInlineWarning: Story = {
  args: { type: 'Warning', indicatorStyle: 'Dot - Inline' },
};

export const DotInlineInactive: Story = {
  args: { type: 'Inactive', indicatorStyle: 'Dot - Inline' },
};

// ===== Dot - Overlapping =====
export const DotOverlappingDefault: Story = {
  args: { type: 'Default', indicatorStyle: 'Dot - Overlapping' },
};

export const DotOverlappingError: Story = {
  args: { type: 'Error', indicatorStyle: 'Dot - Overlapping' },
};

export const DotOverlappingSuccess: Story = {
  args: { type: 'Success', indicatorStyle: 'Dot - Overlapping' },
};

export const DotOverlappingWarning: Story = {
  args: { type: 'Warning', indicatorStyle: 'Dot - Overlapping' },
};

export const DotOverlappingInactive: Story = {
  args: { type: 'Inactive', indicatorStyle: 'Dot - Overlapping' },
};

// ===== With Text =====
export const WithTextDefault: Story = {
  args: { type: 'Default', indicatorStyle: 'With Text' },
};

export const WithTextError: Story = {
  args: { type: 'Error', indicatorStyle: 'With Text' },
};

export const WithTextSuccess: Story = {
  args: { type: 'Success', indicatorStyle: 'With Text' },
};

export const WithTextWarning: Story = {
  args: { type: 'Warning', indicatorStyle: 'With Text' },
};

export const WithTextInactive: Story = {
  args: { type: 'Inactive', indicatorStyle: 'With Text' },
};

// ===== With Text - Overlapping =====
export const WithTextOverlappingDefault: Story = {
  args: { type: 'Default', indicatorStyle: 'With Text - Overlapping' },
};

export const WithTextOverlappingError: Story = {
  args: { type: 'Error', indicatorStyle: 'With Text - Overlapping' },
};

export const WithTextOverlappingSuccess: Story = {
  args: { type: 'Success', indicatorStyle: 'With Text - Overlapping' },
};

export const WithTextOverlappingWarning: Story = {
  args: { type: 'Warning', indicatorStyle: 'With Text - Overlapping' },
};

export const WithTextOverlappingInactive: Story = {
  args: { type: 'Inactive', indicatorStyle: 'With Text - Overlapping' },
};
