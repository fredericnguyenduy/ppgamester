import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { SexChoiceScreen } from './SexChoiceScreen'

const meta = {
  title: 'Screens/SexChoiceScreen',
  component: SexChoiceScreen,
  args: {
    onSelect: fn(),
  },
} satisfies Meta<typeof SexChoiceScreen>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
