import type { Meta, StoryObj } from '@storybook/react-vite'
import { OutsideShops } from './OutsideShops'

const meta = {
  title: 'Screens/OutsideShops',
  component: OutsideShops,
} satisfies Meta<typeof OutsideShops>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
