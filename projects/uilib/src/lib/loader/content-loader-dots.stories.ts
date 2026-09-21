import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ContentLoaderDotsComponent } from './content-loader-dots.component';

const meta: Meta<ContentLoaderDotsComponent> = {
  title: 'components/Loader/Content Loader - Dots',
  component: ContentLoaderDotsComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [ContentLoaderDotsComponent] }),
  ],
};

export default meta;
type Story = StoryObj<ContentLoaderDotsComponent>;

export const Default: Story = {};
