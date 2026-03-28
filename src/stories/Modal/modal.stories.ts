import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ModalComponent } from './modal.component';

const meta: Meta<ModalComponent> = {
  title: 'components/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ModalComponent],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['S', 'M', 'L', 'XL'],
    },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    cancelLabel: { control: 'text' },
    confirmLabel: { control: 'text' },
    visible: { control: 'boolean' },
    closeOnOverlayClick: { control: 'boolean' },
    close: { action: 'closed' },
    cancel: { action: 'cancelled' },
    confirm: { action: 'confirmed' },
  },
  args: {
    visible: true,
    size: 'S',
    title: 'Header Label',
    subtitle: 'Text',
    cancelLabel: 'Cancel',
    confirmLabel: 'Confirm',
    closeOnOverlayClick: false,
  },
};

export default meta;
type Story = StoryObj<ModalComponent>;

export const Default: Story = {};

export const SizeS: Story = {
  name: 'Size S (640×480)',
  args: { size: 'S' },
};

export const SizeM: Story = {
  name: 'Size M (640×720)',
  args: { size: 'M' },
};

export const SizeL: Story = {
  name: 'Size L (1200×560)',
  args: { size: 'L' },
};

export const SizeXL: Story = {
  name: 'Size XL (1400×720)',
  args: { size: 'XL' },
};

export const NoSubtitle: Story = {
  name: 'No Subtitle',
  args: {
    subtitle: '',
    title: 'Modal Title',
  },
};

export const WithContent: Story = {
  name: 'With Body Content',
  render: (args) => ({
    props: args,
    template: `
      <AppCore-modal
        [visible]="visible"
        [size]="size"
        [title]="title"
        [subtitle]="subtitle"
        [cancelLabel]="cancelLabel"
        [confirmLabel]="confirmLabel"
      >
        <p style="font-family: Inter, sans-serif; font-size: 14px; color: #525252; margin: 0;">
          This is the modal body content area. Place any compatible component here via content projection.
        </p>
      </AppCore-modal>
    `,
    moduleMetadata: {
      imports: [ModalComponent],
    },
  }),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 40px; padding: 40px; background: #f5f5f5; min-height: 100vh;">
        <div style="position: relative; height: 500px;">
          <AppCore-modal [visible]="true" size="S" title="Small Modal" subtitle="640 × 480px" style="position: absolute; inset: 0;"></AppCore-modal>
        </div>
        <div style="position: relative; height: 740px;">
          <AppCore-modal [visible]="true" size="M" title="Medium Modal" subtitle="640 × 720px" style="position: absolute; inset: 0;"></AppCore-modal>
        </div>
      </div>
    `,
    moduleMetadata: {
      imports: [ModalComponent],
    },
  }),
};
