import type { Meta, StoryObj } from '@storybook/angular';
import { HeaderComponent } from './header.component';

const meta: Meta<HeaderComponent> = {
  title: 'components/Header',
  component: HeaderComponent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    type: { control: 'select', options: ['H1', 'H2', 'H3', 'H4', 'H5'] },
  },
  args: {
    type: 'H1',
    title: 'Header Label',
    subtitle: 'Text',
    showBackIcon: true,
    showText: true,
    showBreadcrumb: false,
    showImage: false,
    showLogo: false,
    showBadge1: false,
    showBadge2: false,
    showBadge3: false,
    showBadge4: false,
    showSearch: false,
    showButtonSet: false,
    showComboButton: false,
    showActionBar: false,
    showIconButton1: false,
    showIconButton2: false,
    showIconButton3: false,
    showAvatar: false,
  },
};

export default meta;
type Story = StoryObj<HeaderComponent>;

// Matches the Figma default (Header 2, back icon + text visible)
export const Default: Story = {
  args: { type: 'H2', showBackIcon: true, showText: true },
};

export const Header1: Story = { args: { type: 'H1' } };
export const Header2: Story = { args: { type: 'H2' } };
export const Header3: Story = { args: { type: 'H3' } };
export const Header4: Story = { args: { type: 'H4' } };
export const Header5: Story = { args: { type: 'H5' } };

export const WithBreadcrumb: Story = {
  args: { showBreadcrumb: true, showText: false, showBackIcon: false },
  render: (args) => ({
    props: args,
    template: `
      <AppCore-header
        [type]="type" [title]="title" [subtitle]="subtitle"
        [showBackIcon]="showBackIcon" [showBreadcrumb]="showBreadcrumb"
        [showText]="showText"
      >
        <span breadcrumb>Home / Section / Current Page</span>
      </AppCore-header>
    `,
  }),
};

export const WithActions: Story = {
  args: {
    showBadge1: true,
    showBadge2: true,
    showIconButton1: true,
    showAvatar: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <AppCore-header
        [type]="type" [title]="title" [subtitle]="subtitle"
        [showBackIcon]="showBackIcon" [showText]="showText"
        [showBadge1]="showBadge1" [showBadge2]="showBadge2"
        [showIconButton1]="showIconButton1" [showAvatar]="showAvatar"
      >
        <span badge1 style="background:#e0f0ff;padding:2px 8px;border-radius:4px;font-size:12px">New</span>
        <span badge2 style="background:#fde8e8;padding:2px 8px;border-radius:4px;font-size:12px">Alert</span>
        <button iconButton1 style="border:none;background:none;cursor:pointer">🔔</button>
        <span avatar style="width:32px;height:32px;border-radius:50%;background:#ccc;display:flex;align-items:center;justify-content:center;font-size:12px">JD</span>
      </AppCore-header>
    `,
  }),
};

export const NoSubtitle: Story = {
  args: { subtitle: '' },
};
