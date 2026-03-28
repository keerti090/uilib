import type { Meta, StoryObj } from '@storybook/angular';
import { SideNavBarComponent, TreeNavItem } from './side-nav-bar.component';

const backButtonNavItems: TreeNavItem[] = [
  { label: 'Overview', level: 1 },
  { label: 'Customer Reports', level: 1 },
  { label: 'Customer Invoices', level: 1 },
  { label: 'General', level: 1, hasChildren: true },
  {
    label: 'Cloud Billing',
    level: 1,
    hasChildren: true,
    isExpanded: true,
    children: [
      { label: 'Cloud Providers', level: 2 },
      { label: 'Cloud Accounts', level: 2 },
      { label: 'Tax Profile', level: 2 },
      { label: 'Credits', level: 2 },
      { label: 'Charges & Discounts', level: 2 },
      { label: 'Detailed Billing Exports', level: 2 },
    ],
  },
];

const headerNavItems: TreeNavItem[] = [
  { label: 'All Products', level: 1 },
  { label: 'My Products', level: 1 },
  { label: 'Product Settings', level: 1, hasChildren: true },
];

const meta: Meta<SideNavBarComponent> = {
  title: 'components/SideNavBar',
  component: SideNavBarComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    navStyle: {
      control: 'select',
      options: ['with-back-button', 'with-header'],
      description: 'Visual style of the side navigation bar',
    },
    backButtonLabel: {
      control: 'text',
      description: 'Label for the back button (with-back-button style only)',
    },
    headerTitle: {
      control: 'text',
      description: 'Title shown in the header (with-header style only)',
    },
    headerIcon: {
      control: 'text',
      description: 'Material icon name for the header (with-header style only)',
    },
    activeItem: {
      control: 'text',
      description: 'Label of the currently active nav item',
    },
  },
  args: {
    navStyle: 'with-back-button',
    backButtonLabel: 'All Customers',
    headerTitle: 'Products',
    headerIcon: 'category',
    activeItem: '',
  },
};

export default meta;
type Story = StoryObj<SideNavBarComponent>;

export const WithBackButton: Story = {
  args: {
    navStyle: 'with-back-button',
    backButtonLabel: 'All Customers',
    navItems: backButtonNavItems,
  },
};

export const WithHeader: Story = {
  args: {
    navStyle: 'with-header',
    headerTitle: 'Products',
    headerIcon: 'category',
    navItems: headerNavItems,
  },
};
