import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ActionbarComponent } from './actionbar.component';

const meta: Meta<ActionbarComponent> = {
  title: 'components/ActionBar',
  component: ActionbarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ActionbarComponent],
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['icon', 'text'],
    },
    size: {
      control: 'select',
      options: ['xs', 's', 'm', 'l', 'xl'],
    },
    showSet2: { control: 'boolean' },
    showSet3: { control: 'boolean' },
    showKebabMenu: { control: 'boolean' },
  },
  args: {
    type: 'icon',
    size: 'xs',
    showSet2: true,
    showSet3: true,
    showKebabMenu: true,
  },
};

export default meta;
type Story = StoryObj<ActionbarComponent>;

export const Default: Story = {};

export const WithoutSet2: Story = {
  args: { showSet2: false },
};

export const WithoutSet3: Story = {
  args: { showSet3: false },
};

export const WithoutKebab: Story = {
  args: { showKebabMenu: false },
};

export const TextActionBarSmall: Story = {
  args: { type: 'text', size: 's' },
};

export const TextActionBarMedium: Story = {
  args: { type: 'text', size: 'm' },
};

export const TextActionBarLarge: Story = {
  args: { type: 'text', size: 'l' },
};

export const TextActionBarXL: Story = {
  args: { type: 'text', size: 'xl' },
};

export const CustomIcons: Story = {
  args: {
    type: 'icon',
    size: 'm',
    set1: [
      { icon: 'edit' },
      { icon: 'content_copy' },
      { icon: 'share' },
    ],
    set2: [
      { icon: 'star' },
      { icon: 'bookmark' },
    ],
    set3: [
      { icon: 'delete' },
    ],
  },
};

export const CustomTextButtons: Story = {
  args: {
    type: 'text',
    size: 'm',
    textSet1: [
      { label: 'New', leftIconName: 'add' },
      { label: 'Import', leftIconName: 'upload' },
    ],
    textSet2: [
      { label: 'Filter', leftIconName: 'filter_list' },
      { label: 'Sort', leftIconName: 'sort' },
    ],
    textSet3: [
      { label: 'Export', leftIconName: 'download' },
    ],
  },
};
