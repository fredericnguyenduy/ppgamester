import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { CastleScreen } from './CastleScreen'

const meta = {
  title: 'Screens/CastleScreen',
  component: CastleScreen,
  args: {
    onEnter: fn(),
  },
} satisfies Meta<typeof CastleScreen>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
