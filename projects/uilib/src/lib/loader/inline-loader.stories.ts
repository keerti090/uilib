import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { InlineLoaderComponent } from './inline-loader.component';

const meta: Meta<InlineLoaderComponent> = {
  title: 'components/Loader/Inline Loader - Spinner',
  component: InlineLoaderComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [InlineLoaderComponent] }),
  ],
};

export default meta;
type Story = StoryObj<InlineLoaderComponent>;

export const Default: Story = {};
