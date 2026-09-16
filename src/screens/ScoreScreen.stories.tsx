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
        layers: [],
      },
      {
        sex: 'M',
        layers: [],
      },
      {
        sex: 'F',
        layers: [],
      },
    ],
    onRestart: fn(),
    onGameEnd: fn(),
  },
} satisfies Meta<typeof ScoreScreen>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
