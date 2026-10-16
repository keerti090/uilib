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
    searchOpen: {
      control: 'boolean',
      description: 'Opens the top search drawer (25% of viewport height). Clicking the search bar also opens it (CCP / WLMP)',
    },
    searchValue: {
      control: 'text',
      description: 'Current search text; shown in the nav search bar and the drawer input',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder / label shown when the search is empty',
    },
    searchOpenChange: { action: 'searchOpenChange' },
    searchValueChange: { action: 'searchValueChange' },
    searchSubmit: { action: 'searchSubmit' },
  },
  args: {
    platform: 'CCP',
    activeItem: 'Dashboard',
    cartCount: 0,
    userName: 'SMP RESELLER',
    marketplaceName: 'Marketplace',
    loggedInUser: 'John Doe',
    searchOpen: false,
    searchValue: '',
    searchPlaceholder: 'Global Search',
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

export const SearchDrawerOpen: Story = {
  args: {
    platform: 'CCP',
    searchOpen: true,
    searchValue: 'Quotes',
  },
};
