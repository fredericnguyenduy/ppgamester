import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import catalog from "../../../assets/character-parts/master.json";
import { PartSelector } from "./PartSelector";

const partUrls = import.meta.glob<string>(
  "../../../assets/character-parts/**/*.png",
  { eager: true, import: "default", query: "?url" },
);
function getPartImages(parts: { file: string }[]): string[] {
  return parts.map(({ file }) => {
    const url = partUrls[`../../../assets/character-parts/${file}`];
    if (url == null) {
      throw new Error(`Character-part asset not found: ${file}`);
    }
    return url;
  });
}

const girlsClothes = getPartImages(catalog.F.clothes);

const meta = {
  title: "Components/PartSelector",
  component: PartSelector,
  decorators: [
    (Story) => (
      <div style={{ display: "grid", placeItems: "center", height: "100dvh" }}>
        <div
          style={{
            position: "relative",
            width: "min(100vw, calc(100dvh * 16 / 9))",
            aspectRatio: "16 / 9",
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  args: {
    images: girlsClothes,
    onCancel: fn(),
    onOk: fn(),
  },
} satisfies Meta<typeof PartSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GirlsClothes: Story = { name: "Girls clothes" };
export const GirlsShoes: Story = {
  name: "Girls shoes",
  args: { images: getPartImages(catalog.F.shoes) },
};
export const GirlsHair: Story = {
  name: "Girls hair",
  args: { images: getPartImages(catalog.F.hair) },
};
export const BoysShoes: Story = {
  name: "Boys shoes",
  args: { images: getPartImages(catalog.M.shoes) },
};
export const BoysHair: Story = {
  name: "Boys hair",
  args: { images: getPartImages(catalog.M.hair) },
};
export const SingleImage: Story = { args: { images: girlsClothes.slice(0, 1) } };
export const Empty: Story = { args: { images: [] } };
