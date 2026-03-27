import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DialogueBoxComponent } from './dialogue-box.component';

const meta: Meta<DialogueBoxComponent> = {
  title: 'components/DialogueBox',
  component: DialogueBoxComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DialogueBoxComponent],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['Default', 'Success', 'Warning', 'Error'],
    },
    size: {
      control: 'select',
      options: ['S', 'M', 'L', 'XL'],
    },
    label: { control: 'text' },
    description: { control: 'text' },
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
    state: 'Default',
    size: 'M',
    label: 'Label',
    description: 'Description',
    cancelLabel: 'Cancel',
    confirmLabel: 'Button',
    closeOnOverlayClick: false,
  },
};

export default meta;
type Story = StoryObj<DialogueBoxComponent>;

export const Default: Story = {};

export const SizeS: Story = {
  name: 'Size S',
  args: { size: 'S' },
};

export const SizeM: Story = {
  name: 'Size M',
  args: { size: 'M' },
};

export const SizeL: Story = {
  name: 'Size L',
  args: { size: 'L' },
};

export const SizeXL: Story = {
  name: 'Size XL',
  args: { size: 'XL' },
};

export const StateSuccess: Story = {
  name: 'State: Success',
  args: {
    state: 'Success',
    label: 'Action Completed',
    description: 'Your changes have been saved successfully.',
    confirmLabel: 'Continue',
  },
};

export const StateWarning: Story = {
  name: 'State: Warning',
  args: {
    state: 'Warning',
    label: 'Proceed with Caution',
    description: 'This action may have unintended side effects.',
    confirmLabel: 'Proceed',
  },
};

export const StateError: Story = {
  name: 'State: Error',
  args: {
    state: 'Error',
    label: 'Something Went Wrong',
    description: 'An error occurred while processing your request.',
    confirmLabel: 'Retry',
  },
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 40px; padding: 40px; background: #f5f5f5;">
        <div style="position: relative; height: 220px;">
          <AppCore-dialogue-box [visible]="true" size="S" label="Small Dialog" description="Size S — 200px height" style="position: absolute; inset: 0;"></AppCore-dialogue-box>
        </div>
        <div style="position: relative; height: 380px;">
          <AppCore-dialogue-box [visible]="true" size="M" label="Medium Dialog" description="Size M — 360px height" style="position: absolute; inset: 0;"></AppCore-dialogue-box>
        </div>
      </div>
    `,
    moduleMetadata: {
      imports: [DialogueBoxComponent],
    },
  }),
};

export const AllStates: Story = {
  name: 'All States',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 40px; padding: 40px; background: #f5f5f5;">
        <div style="position: relative; width: 660px; height: 380px;">
          <AppCore-dialogue-box [visible]="true" state="Default" size="M" label="Default State" description="No special status icon shown."></AppCore-dialogue-box>
        </div>
        <div style="position: relative; width: 660px; height: 380px;">
          <AppCore-dialogue-box [visible]="true" state="Success" size="M" label="Success State" description="Action completed successfully."></AppCore-dialogue-box>
        </div>
        <div style="position: relative; width: 660px; height: 380px;">
          <AppCore-dialogue-box [visible]="true" state="Warning" size="M" label="Warning State" description="Please review before proceeding."></AppCore-dialogue-box>
        </div>
        <div style="position: relative; width: 660px; height: 380px;">
          <AppCore-dialogue-box [visible]="true" state="Error" size="M" label="Error State" description="An error has occurred."></AppCore-dialogue-box>
        </div>
      </div>
    `,
    moduleMetadata: {
      imports: [DialogueBoxComponent],
    },
  }),
};
