import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { LoadingScreen } from './LoadingScreen'

const meta = {
  title: 'Screens/LoadingScreen',
  component: LoadingScreen,
  args: {
    onComplete: fn(),
  },
} satisfies Meta<typeof LoadingScreen>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
