import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ComboboxComponent } from './combobox.component';

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry', disabled: true },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
];

const meta: Meta<ComboboxComponent> = {
  title: 'components/Combobox',
  component: ComboboxComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ComboboxComponent],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    searchable: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
    value: { control: 'text' },
    valueChange: { action: 'valueChange' },
    selectionChange: { action: 'selectionChange' },
  },
  args: {
    options: sampleOptions,
    label: 'Fruit',
    placeholder: 'Select a fruit',
    helperText: '',
    errorMessage: '',
    value: '',
    size: 'md',
    disabled: false,
    error: false,
    searchable: false,
  },
};

export default meta;
type Story = StoryObj<ComboboxComponent>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 'banana' },
};

export const WithHelperText: Story = {
  args: { helperText: 'Choose your favourite fruit.' },
};

export const Searchable: Story = {
  args: { searchable: true, placeholder: 'Type to filter...' },
};

export const SearchableWithValue: Story = {
  args: { searchable: true, value: 'cherry', placeholder: 'Type to filter...' },
};

export const ErrorState: Story = {
  args: { error: true, errorMessage: 'A selection is required.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledWithValue: Story = {
  args: { disabled: true, value: 'fig' },
};

export const SizeSmall: Story = {
  args: { size: 'sm' },
};

export const SizeMedium: Story = {
  args: { size: 'md' },
};

export const SizeLarge: Story = {
  args: { size: 'lg' },
};

export const NoLabel: Story = {
  args: { label: '' },
};
