import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { PageLoaderComponent } from './page-loader.component';

const meta: Meta<PageLoaderComponent> = {
  title: 'components/Loader/Page Loader - Spinner',
  component: PageLoaderComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [PageLoaderComponent] }),
  ],
  argTypes: {
    visible: { control: 'boolean' },
  },
  args: {
    visible: true,
  },
};

export default meta;
type Story = StoryObj<PageLoaderComponent>;

export const Default: Story = {};

export const Hidden: Story = {
  args: { visible: false },
};
