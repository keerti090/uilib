import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { InlineLoaderWithTextComponent } from './inline-loader-with-text.component';

const meta: Meta<InlineLoaderWithTextComponent> = {
  title: 'components/Loader/Inline Loader (With Text) - Spinner',
  component: InlineLoaderWithTextComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [InlineLoaderWithTextComponent] }),
  ],
  argTypes: {
    state: { control: 'select', options: ['Active', 'Success', 'Error'] },
    label: { control: 'text' },
  },
  args: {
    state: 'Active',
    label: 'Label',
  },
};

export default meta;
type Story = StoryObj<InlineLoaderWithTextComponent>;

export const Default: Story = {};

export const Active: Story = {
  args: { state: 'Active' },
};

export const Success: Story = {
  args: { state: 'Success' },
};

export const Error: Story = {
  args: { state: 'Error' },
};
