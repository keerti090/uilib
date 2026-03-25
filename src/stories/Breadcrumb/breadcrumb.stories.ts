import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BreadcrumbComponent } from './breadcrumb.component';

const meta: Meta<BreadcrumbComponent> = {
  title: 'components/Breadcrumb',
  component: BreadcrumbComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BreadcrumbComponent],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['S', 'M', 'L'],
    },
    items: { control: 'object' },
  },
  args: {
    size: 'M',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Section', href: '/section' },
      { label: 'Current Page' },
    ],
  },
};

export default meta;
type Story = StoryObj<BreadcrumbComponent>;

export const Default: Story = {};

export const TwoItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Current Page' },
    ],
  },
};

export const FourItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Category', href: '/products/category' },
      { label: 'Item Detail' },
    ],
  },
};

export const SizeSmall: Story = {
  args: {
    size: 'S',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Section', href: '/section' },
      { label: 'Current Page' },
    ],
  },
};

export const SizeMedium: Story = {
  args: {
    size: 'M',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Section', href: '/section' },
      { label: 'Current Page' },
    ],
  },
};

export const SizeLarge: Story = {
  args: {
    size: 'L',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Section', href: '/section' },
      { label: 'Current Page' },
    ],
  },
};

export const LongLabels: Story = {
  args: {
    size: 'M',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Very Long Section Name', href: '/section' },
      { label: 'Another Long Subsection', href: '/section/sub' },
      { label: 'Current Page With A Long Title' },
    ],
  },
};
