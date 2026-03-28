import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { OverlayComponent } from './overlay.component';

const meta: Meta<OverlayComponent> = {
  title: 'components/Loader/Overlay',
  component: OverlayComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [OverlayComponent] }),
  ],
  argTypes: {
    visible: { control: 'boolean' },
    type: { control: 'select', options: ['Light', 'Dark'] },
  },
  args: {
    visible: true,
    type: 'Light',
  },
};

export default meta;
type Story = StoryObj<OverlayComponent>;

export const Light: Story = {
  args: { type: 'Light' },
};

export const Dark: Story = {
  args: { type: 'Dark' },
};
