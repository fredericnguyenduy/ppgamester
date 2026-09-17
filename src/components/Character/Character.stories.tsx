import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import type { CharacterLayer } from "../../types/CharacterChoice";
import { Character, type CharacterProps } from "./Character";

const partFiles = Object.keys(
  import.meta.glob("../../../assets/character-parts/**/*"),
)
  .map((path) => path.replace("../../../assets/character-parts/", ""))
  .sort();

const layerFields = ["x", "y", "size", "zIndex"] as const;

function CharacterEditor() {
  const [args, updateArgs] = useArgs<CharacterProps>();
  const { characterChoice } = args;

  function updateLayers(layers: CharacterLayer[]) {
    updateArgs({ characterChoice: { ...characterChoice, layers } });
  }

  function updateLayer(index: number, patch: Partial<CharacterLayer>) {
    updateLayers(
      characterChoice.layers.map((layer, i) =>
        i === index ? { ...layer, ...patch } : layer,
      ),
    );
  }

  return (
    <div
      style={{
        height: "100dvh",
        display: "grid",
        gridTemplateColumns: "minmax(0, 3fr) minmax(300px, 2fr)",
        overflow: "auto",
        background: "#eef0f4",
        color: "#202530",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "grid",
          placeItems: "center",
          minWidth: 0,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "min(100%, calc(100dvh * 16 / 9))",
            aspectRatio: "16 / 9",
            background: "#d9dee7",
          }}
        >
          <Character {...args} />
        </div>
      </div>
      <section
        aria-label="Character editor"
        style={{ padding: 20, minWidth: 0, minHeight: 0, overflow: "auto" }}
      >
        <h2>Character</h2>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <label>
            Sex{" "}
            <select
              value={characterChoice.sex ?? ""}
              onChange={(event) =>
                updateArgs({
                  characterChoice: {
                    ...characterChoice,
                    sex:
                      event.target.value === "M"
                        ? "M"
                        : event.target.value === "F"
                          ? "F"
                          : null,
                  },
                })
              }
            >
              <option value="">None</option>
              <option value="F">F</option>
              <option value="M">M</option>
            </select>
          </label>
          {(["size", "top", "left"] as const).map((field) => (
            <label key={field}>
              {field} (%){" "}
              <input
                type="number"
                step="any"
                value={args[field]}
                style={{ width: 80 }}
                onChange={(event) => {
                  const value = event.target.valueAsNumber;
                  if (Number.isFinite(value)) updateArgs({ [field]: value });
                }}
              />
            </label>
          ))}
        </div>
        <h3>Layers</h3>
        <p>
          Files are relative to assets/character-parts. x and y position the
          image center (%); size is its height (%). The template has z-index 0.
        </p>
        {characterChoice.layers.map((layer, index) => (
          <fieldset key={index} style={{ marginBottom: 12 }}>
            <legend>Layer {index + 1}</legend>
            <div
              style={{
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <label>
                file{" "}
                <select
                  value={layer.file}
                  onChange={(event) =>
                    updateLayer(index, { file: event.target.value })
                  }
                >
                  {partFiles.map((file) => (
                    <option key={file} value={file}>
                      {file}
                    </option>
                  ))}
                </select>
              </label>
              {layerFields.map((field) => (
                <label key={field}>
                  {field}{" "}
                  <input
                    type="number"
                    step={field === "zIndex" ? 1 : "any"}
                    value={layer[field]}
                    style={{ width: 80 }}
                    onChange={(event) => {
                      const value = event.target.valueAsNumber;
                      if (Number.isFinite(value))
                        updateLayer(index, { [field]: value });
                    }}
                  />
                </label>
              ))}
              <button
                type="button"
                onClick={() =>
                  updateLayers(
                    characterChoice.layers.filter((_, i) => i !== index),
                  )
                }
              >
                Remove layer {index + 1}
              </button>
            </div>
          </fieldset>
        ))}
        <button
          type="button"
          disabled={partFiles.length === 0}
          onClick={() =>
            updateLayers([
              ...characterChoice.layers,
              { file: partFiles[0], x: 50, y: 50, size: 50, zIndex: 1 },
            ])
          }
        >
          Add layer
        </button>
      </section>
    </div>
  );
}

const meta = {
  title: "Components/Character",
  component: Character,
  args: {
    characterChoice: { sex: "F", layers: [] },
    size: 100,
    top: 100,
    left: 50,
  },
  argTypes: {
    characterChoice: { control: "object" },
    size: { control: "number" },
    top: { control: "number" },
    left: { control: "number" },
  },
  render: CharacterEditor,
} satisfies Meta<typeof Character>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Boy: Story = {
  args: {
    size: 100,
    top: 100,
    left: 50,
    characterChoice: {
      sex: "M",
      layers: [
        { file: "boy-costume-1.png", x: 50, y: 52.5, size: 63.75, zIndex: 2 },
        { file: "boy-face-1.png", x: 50, y: 11.75, size: 8.5, zIndex: 1 },
        { file: "boy-feet-1.png", x: 50, y: 88.5, size: 29, zIndex: 1 },
        { file: "boy-hair-1.png", x: 50, y: 4.5, size: 22, zIndex: 1 },
      ],
    },
  },
};

export const Girl: Story = {
  args: {
    size: 100,
    top: 100,
    left: 50,
    characterChoice: {
      sex: "F",
      layers: [
        { file: "girl-dress-1.png", x: 50, y: 52.5, size: 59, zIndex: 0 },
        { file: "girl-face-1.png", x: 50, y: 11.75, size: 8.5, zIndex: 1 },
        { file: "girl-hair-1.png", x: 50, y: 8, size: 23, zIndex: 2 },
        { file: "girl-shoes-1.png", x: 50, y: 97, size: 12.5, zIndex: 1 },
      ],
    },
  },
};
