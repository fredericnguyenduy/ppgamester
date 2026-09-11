import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Shopping } from './Shopping'

const meta = {
  title: 'Screens/Shopping',
  component: Shopping,
  args: {
    characterChoice: {
      sex: 'F',
      headIndex: 0,
      bodyIndex: 0,
      feetIndex: 0,
    },
    onTimerComplete: fn(),
  },
} satisfies Meta<typeof Shopping>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
