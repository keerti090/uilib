import type { Meta, StoryObj } from '@storybook/angular';
import { NavBarComponent } from './nav-bar.component';

const meta: Meta<NavBarComponent> = {
  title: 'components/NavBar',
  component: NavBarComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    platform: {
      control: 'select',
      options: ['CCP', 'WLMP', 'CBOT'],
      description: 'Platform variant of the navigation bar',
    },
    activeItem: {
      control: 'text',
      description: 'Currently active navigation item',
    },
    cartCount: {
      control: 'number',
      description: 'Number of items in cart (WLMP only)',
    },
    userName: {
      control: 'text',
      description: 'Logged-in user label (WLMP only)',
    },
    marketplaceName: {
      control: 'text',
      description: 'Marketplace name shown next to logo (WLMP only)',
    },
    loggedInUser: {
      control: 'text',
      description: 'Full name of logged-in user (CBOT only)',
    },
  },
  args: {
    platform: 'CCP',
    activeItem: 'Dashboard',
    cartCount: 0,
    userName: 'SMP RESELLER',
    marketplaceName: 'Marketplace',
    loggedInUser: 'John Doe',
  },
};

export default meta;
type Story = StoryObj<NavBarComponent>;

export const CCP: Story = {
  args: {
    platform: 'CCP',
    activeItem: 'Dashboard',
  },
};

export const WLMP: Story = {
  args: {
    platform: 'WLMP',
    activeItem: 'Marketplace',
    cartCount: 3,
    userName: 'SMP RESELLER',
    marketplaceName: 'Marketplace',
  },
};

export const CBOT: Story = {
  args: {
    platform: 'CBOT',
    loggedInUser: 'John Doe',
  },
};
