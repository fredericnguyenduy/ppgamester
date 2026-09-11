# Project Memory and Agent Guide

Read this file at the start of every session before inspecting or changing the
project. Keep it current: update it in the same change whenever requirements,
architecture, workflows, or important constraints change. Record durable
context and decisions, not temporary progress notes.

## Project context

- Project name: Princess & Prince Gamester.
- Package name: `ppGamester`.
- Purpose: a lightweight browser game and foundation for future interactive
  graphics work.
- Status: initial scaffold, created 2026-08-16.
- Package manager: npm (`package-lock.json` is authoritative and committed).

## Requirements

- Use Vite as the development server and production bundler.
- Use React with TypeScript for UI and application composition.
- Use React-rendered HTML and CSS for scenes, interaction, and animation.
- Present only the active screen, with no surrounding application interface.
- Bootstrap the application with the title screen. It alternates between
  `assets/screens/title1.png` and `title2.png` every second, then signals the
  application to display the loading screen after five seconds.
- The loading screen displays `assets/screens/loading.png` for five seconds,
  then signals the application to bootstrap the main game.
- The reusable dialog displays `assets/dialog-frame.png`, accepts a prompt and
  two button labels, and reports activation of either button through separate
  callbacks. It is centered in the scene at 60% of the scene width, preserving
  the artwork's aspect ratio, and its text and hit zones remain aligned to the
  responsive artwork. Relative to the 1448x1086 source, the first button is at
  `(238, 708, 441, 142)` and the second is at `(772, 708, 441, 142)`, with each
  tuple representing `(x, y, width, height)`.
- The reusable control pad displays `assets/control-pad.png` in the bottom-right
  corner of the scene at one-sixth of the scene width. It exposes `onUp`,
  `onLeft`, `onRight`, and `onBottom` callback props wired to transparent hit
  zones normalized from the visible button artwork in the 1254x1254 source.
- The reusable `PartSelector` is centered at 25% of the scene width and displays
  `assets/part-selector.png`. It accepts an array of image URLs, `onCancel`, and
  `onOk(selectedIndex)`, with an internal zero-based index initially set to zero.
  Previous/next buttons display `selector-left.png` / `selector-right.png` only
  when movement is possible, and change the index by one without wrapping.
  Images fit inside the visually measured frame interiors without stretching.
  An empty array disables navigation and OK; a shorter array clamps selection.
  Bounds within the 1448x1086 artwork are: main interior `(482, 292, 484, 392)`,
  left/right interiors `(253, 459, 139, 134)` / `(1056, 459, 139, 134)`, and
  cancel/OK faces `(378, 766, 306, 106)` / `(766, 766, 302, 106)`.
- The main game owns a typed `CharacterChoice` object containing the nullable
  sex choice and integer indices for the selected head, body, and feet, and its
  own active-screen state. All indices initially start at zero.
- The castle screen displays `assets/screens/castle.png` and advances to the
  sex-choice screen when activated by pointer, touch, or keyboard.
- The sex-choice screen displays `assets/screens/sex-choice.png`. Its female
  hit zone is `(25.5383%, 45.6961%, 13.8158%, 40.3826%)` and selects `F`; its
  male hit zone is `(62.2009%, 45.6961%, 13.8158%, 40.3826%)`. Each tuple is
  `(left, top, width, height)` relative to the scene. It sends the selection to
  the main game before advancing to the `shopping` phase.
- The `shopping` phase renders `Shopping`, which owns the active shopping screen,
  character position, character rendering, control pad, and countdown timer.
  It initially displays `OutsideShops`. Entrance detection lives in `Shopping`
  and runs only while `outside-shops` is active. Entering `top <= 80` and
  `45 <= left <= 60` replaces that background with `ClothesShopScreen`.
  Detection fires once per entry and rearms after leaving the region or screen.
  The character, controls, and timer remain mounted across this transition,
  preserving position and continuing the countdown inside the shop.
- `Shopping` accepts `CharacterChoice` and `onTimerComplete`. Its character starts
  at bottom center with one-third scene height. The control pad moves it in
  five-percentage-point steps, clamped to 0–100 for `top` and `left`. The timer
  sits at top-right at one-tenth scene width and signals `MainGame` to advance
  to the fashion show at zero. The control pad sits at bottom-right.
- `OutsideShops` displays only `assets/screens/outside-shops.png`, accepts no
  props, and is memoized to skip rendering on character-position changes in
  `Shopping`. `Shopping` overlays the character, controls, and timer.
- `ClothesShopScreen` displays `assets/screens/clothes-shop.png` in a responsive
  16:9 scene, is previewable in Storybook, and opens when the player enters shop
  `1`. Transparent native buttons cover the left and right clothes shelves and
  fire required `onLeftShelfClick` and `onRightShelfClick` callbacks. Their
  visually identified bounds in the 1672x941 artwork are `(180, 48, 429, 576)`
  and `(1060, 48, 433, 576)` respectively, expressed as `(x, y, width, height)`
  and normalized in CSS. They support pointer, touch, and keyboard activation.
  `Shopping` supplies no-op handlers until shelf selection is implemented.
  It has no exit interaction yet.
- The fashion-show phase presents three consecutive fashion-show screens. Its
  contestant trio contains the player's `CharacterChoice` at a random position
  and two randomly generated choices whose sex and part indices use the
  available options. All three choices must be distinct; enforce uniqueness by
  tracking only the selected choice keys rather than enumerating every possible
  combination. Each screen displays `assets/screens/catwalk.png`, aligned to its
  top, scrolls it to the bottom over five seconds and back to the top over the
  following five seconds, and fires `onScrollComplete` when its round trip
  finishes. The next contestant then starts from a freshly mounted screen; the
  third completion advances to the score. Display each layered character at the
  bottom center using the same one-third-height sizing as the outside-shops screen.
- The score screen displays `assets/screens/score.png` only while the main
  game's active screen state is `score`. It accepts the same three
  `CharacterChoice` objects used for the fashion shows, shuffled into a new
  random order, and displays them at the configured podium positions, each at
  one-third of the scene height. After the score has displayed for ten seconds,
  display the reusable dialog asking `もういっかいしますか？`; `はい` requests
  a restart and `いいえ` ends the game while leaving the score displayed.
  Both responses propagate through `MainGame` to `App`; declining invokes the
  `onGameEnd` handler, which enters an empty `end` application phase. The
  application remounts `MainGame` for a restart so gameplay state resets
  without replaying the title and loading screens.
- Lay out every scene at a 16:9 aspect ratio. Scale its DOM container to the
  largest size that fits the viewport and use page-background padding
  (letterboxing or pillarboxing) when the display has a different aspect ratio.
- Keep the scene responsive and usable with pointer and touch input.
- Prevent every rendered image from being dragged or selected.
- Keep `npm run lint` and `npm run build` passing.

## Architecture decisions

- React owns the full-viewport frame and screen composition.
- Keep `App.tsx` small: it owns the application phase (`title`, `loading`,
  `game`, or `end`). Screens signal completion through callback props instead
  of changing the browser URL. It renders the main game only for the explicit
  `game` phase and renders nothing during `end` or for an unknown phase.
- `MainGame.tsx` owns both the typed persistent `CharacterChoice` object and the
  active gameplay screen. Gameplay progresses from castle to sex choice, shopping,
  fashion show, and score through screen callback events. It reports restart
  requests to `App`, which remounts it with a new key.
- React renders scene artwork and interactive elements as DOM elements. CSS
  performs aspect-ratio containment and uniformly scales the 16:9 scene. Do not
  stretch non-uniformly or crop the scene to fill other ratios.
- Express object positions, clickable zones, and hit areas as percentages or
  other relative measures within the 16:9 scene so they remain aligned at every
  display size.
- `Character` owns its scene-relative placement. Its numeric `size`, `top`, and
  `left` props are percentages: `size` is the character height, while `top` and
  `left` locate its bottom-center point from the scene's top-left corner.
- The browser transparently scales each scene uniformly to the largest 16:9
  rectangle that fits the viewport. Pointer and touch input must remain aligned
  at every display size; any remaining viewport area is letterboxed or
  pillarboxed and is not part of the scene.
- Keep scene code local until its responsibilities warrant extraction, and keep
  screen-specific rendering and styles together under `src/screens/`.
- Prefer CSS primitives or locally owned assets. Screen images live under the
  project-level `assets/screens/` directory and are imported by their screen
  modules so Vite includes hashed copies in production output.

## Current structure

- `src/main.tsx`: React entry point and Strict Mode boundary.
- `src/App.tsx`: application bootstrap state and title/loading/game composition.
- `src/MainGame.tsx`: gameplay screen state and persistent `CharacterChoice`.
- `src/Shopping.tsx`: shopping-screen state and navigation from `OutsideShops`
  to `ClothesShopScreen`, plus persistent character placement, controls, and timer.
- `src/types/CharacterChoice.ts`: shared persistent character-choice model.
- `src/types/CharacterPosition.ts`: shared scene-relative character position.
- `src/types/BodyPart.ts`: shared body-part key type.
- `src/components/Character/`: reusable layered character assembled from head,
  body, and feet image assets listed by sex in `assets/body-parts.json`. Part
  indices wrap around their corresponding asset arrays. Its current sizing,
  overlap, and label are internal constants except for its scene-relative
  height and position; it accepts the current choice and renders noninteractive
  parts without click callbacks.
- `src/components/Timer/`: reusable timer artwork with a percentage-positioned
  countdown display that starts at 100 and stops at zero.
- `src/components/Dialog/`: reusable dialog-frame artwork with a centered,
  wrapping prompt and two responsive native-button hit zones.
- `src/components/ControlPad/`: reusable bottom-right control-pad artwork with
  four responsive native-button hit zones.
- `src/components/PartSelector/`: reusable image selector with bounded navigation,
  cancel/confirm callbacks, and default, single-image, and empty Storybook previews.
- `src/screens/`: screen components and their local styles.
- `src/index.css`: global full-viewport reset and letterbox background.
- `assets/screens/`: source screen artwork imported through Vite.

## Commands

- `npm run dev`: start the Vite development server.
- `npm run build`: type-check and create a production build.
- `npm run lint`: run Oxlint.
- `npm run storybook`: start Storybook for isolated screen previews.
- `npm run build-storybook`: create a static Storybook build.
- `npm run preview`: serve the production build locally.

## Working conventions

- Read this file first in every session.
- Do not edit generated `dist/` output or dependencies in `node_modules/`.
- Use functional React components and explicit TypeScript types where inference
  is not clear.
- Keep types used by more than one module under `src/types/` as their canonical
  definitions. Keep component prop types colocated with their components.
- Clean up timers, animations, and event handlers in React effect teardown.
- Storybook uses `@storybook/react-vite`, loads stories from
  `src/**/*.stories.tsx`, and keeps screen stories colocated with screen
  components. Whenever a screen is added, add a colocated `.stories.tsx` file
  with a default preview in the same change.
- Update this file when a dependency choice, directory boundary, data flow,
  rendering strategy, command, or product requirement changes.
