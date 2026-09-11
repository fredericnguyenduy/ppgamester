import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import head0 from '../../../assets/body-parts/girl-head-0.png'
import head1 from '../../../assets/body-parts/girl-head-1.png'
import head2 from '../../../assets/body-parts/girl-head-2.png'
import { PartSelector } from './PartSelector'

const meta = {
  title: 'Components/PartSelector',
  component: PartSelector,
  decorators: [
    (Story) => (
      <div style={{ display: 'grid', placeItems: 'center', height: '100dvh' }}>
        <div style={{ position: 'relative', width: 'min(100vw, calc(100dvh * 16 / 9))', aspectRatio: '16 / 9' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  args: {
    images: [head0, head1, head2],
    onCancel: fn(),
    onOk: fn(),
  },
} satisfies Meta<typeof PartSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const SingleImage: Story = { args: { images: [head0] } }
export const Empty: Story = { args: { images: [] } }
