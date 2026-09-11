import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { ScoreScreen } from './ScoreScreen'

const meta = {
  title: 'Screens/ScoreScreen',
  component: ScoreScreen,
  args: {
    characterChoices: [
      {
        sex: 'F',
        headIndex: 0,
        bodyIndex: 0,
        feetIndex: 0,
      },
      {
        sex: 'M',
        headIndex: 2,
        bodyIndex: 0,
        feetIndex: 0,
      },
      {
        sex: 'F',
        headIndex: 3,
        bodyIndex: 2,
        feetIndex: 4,
      },
    ],
    onRestart: fn(),
    onGameEnd: fn(),
  },
} satisfies Meta<typeof ScoreScreen>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
