import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { FashionShowScreen } from './FashionShowScreen'

const meta = {
  title: 'Screens/FashionShowScreen',
  component: FashionShowScreen,
  args: {
    characterChoice: {
      sex: 'M',
      headIndex: 1,
      bodyIndex: 0,
      feetIndex: 0,
    },
    onScrollComplete: fn(),
  },
} satisfies Meta<typeof FashionShowScreen>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
