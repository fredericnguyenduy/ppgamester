import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { TitleScreen } from './TitleScreen'

const meta = {
  title: 'Screens/TitleScreen',
  component: TitleScreen,
  args: {
    onComplete: fn(),
  },
} satisfies Meta<typeof TitleScreen>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
