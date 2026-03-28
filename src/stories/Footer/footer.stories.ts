import type { Meta, StoryObj } from '@storybook/angular';
import { FooterComponent } from './footer.component';

const meta: Meta<FooterComponent> = {
  title: 'components/Footer',
  component: FooterComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    platform: {
      control: 'select',
      options: ['TC', 'WLMP'],
      description: 'Platform variant of the footer',
    },
    tagline: {
      control: 'text',
      description: 'Tagline text (WLMP only)',
    },
    contactEmail: {
      control: 'text',
      description: 'Contact email address (WLMP only)',
    },
    copyrightText: {
      control: 'text',
      description: 'Copyright text (WLMP only)',
    },
  },
  args: {
    platform: 'TC',
    tagline: 'We provide the tools, resources and people to simplify the delivery of cloud solutions.',
    contactEmail: 'sales@techdata.com',
    copyrightText: '⓪ Tech Data Corporation, 2021 Tech Data and Tech Data logo are registered trademarks of Tech Data Corporation in the United States and Other countries. All other trademarks are the property of their respective owners.',
  },
};

export default meta;
type Story = StoryObj<FooterComponent>;

export const TermsAndConditions: Story = {
  args: {
    platform: 'TC',
  },
};

export const WLMP: Story = {
  args: {
    platform: 'WLMP',
  },
};
