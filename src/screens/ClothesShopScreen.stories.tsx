import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { ClothesShopScreen } from './ClothesShopScreen'

const meta = {
  title: 'Screens/ClothesShopScreen',
  component: ClothesShopScreen,
  args: {
    onLeftShelfClick: fn(),
    onRightShelfClick: fn(),
  },
} satisfies Meta<typeof ClothesShopScreen>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
