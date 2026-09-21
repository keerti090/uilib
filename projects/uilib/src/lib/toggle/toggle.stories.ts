import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ToggleComponent } from './toggle.component';

const meta: Meta<ToggleComponent> = {
  title: 'components/Toggle',
  component: ToggleComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ToggleComponent],
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
    checkedChange: { action: 'checkedChange' },
  },
  args: {
    label: 'Label',
    checked: false,
    disabled: false,
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<ToggleComponent>;

export const Default: Story = {};

export const On: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledOn: Story = {
  args: { disabled: true, checked: true },
};

export const SizeSmall: Story = {
  args: { size: 'sm' },
};

export const SizeSmallOn: Story = {
  args: { size: 'sm', checked: true },
};

export const SizeMedium: Story = {
  args: { size: 'md' },
};

export const SizeMediumOn: Story = {
  args: { size: 'md', checked: true },
};

export const SizeLarge: Story = {
  args: { size: 'lg' },
};

export const SizeLargeOn: Story = {
  args: { size: 'lg', checked: true },
};

export const NoLabel: Story = {
  args: { label: '' },
};
