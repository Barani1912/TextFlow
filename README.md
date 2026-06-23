# TypeMotion - Text Animation Tool

A modern, highly customizable text animation and marquee tool. Build stunning, dynamic text scrollers with live preview and deep typography controls.

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the tool in action.

## 🛠️ How to Use

The interface is divided into a **Live Preview Viewport** and a **Control Drawer** at the bottom.

### 1. The Control Drawer
The controls are located in a slide-up drawer at the bottom of the screen. 
**Pro Tip:** The drawer automatically hides itself after 10 seconds of inactivity to give you a clean, distraction-free preview. Simply move your mouse, scroll, or click the bottom toggle button to reveal it again.

### 2. Edit & Controls
- **Input Text:** Type the text, numbers, or symbols you want to animate.
- **Save Text:** Click this to apply your new text to the animation track.
- **Animate/Pause:** Play or pause the marquee animation.

### 3. Font Styling
Customize the typography of your text:
- **Font Family:** Choose from curated fonts like modern geometric (Outfit), clean sans-serif (Inter), developer tech (Geist Mono), elegant serif (Playfair), or system fonts.
- **Font Weight:** Adjust the thickness (Normal, Bold, Black).
- **Font Size:** Scale the text size up or down smoothly.
- **Text Color:** Pick any custom hex color or use the quick-select color palette (e.g., Neon Cyan, Matrix Green, etc.).

### 4. Track & Animations
Fine-tune how the text moves and behaves across the screen:
- **Scroll Speed:** Adjust the velocity from Level 1 (slow/ambient) to Level 10 (fast/energetic).
- **Gap Distance:** Control the spacing between the repeating text segments.
- **Direction:** Set the animation to flow horizontally (Right → Left, Left → Right) or vertically (Bottom ↑ Top, Top ↓ Bottom).
- **Loop Count:** Choose whether the animation runs infinitely or stops after a specific number of repetitions.
- **Track Background:** Set the background color of the viewport using the color picker or provided dark/light presets.
- **Border Style:** Frame your viewport with solid, dashed, double, or no borders.
- **Pause Hover:** Toggle this on to make the text stop moving when you hover your mouse over it.

### 5. Fullscreen Mode
Click the **Fullscreen** icon in the viewport to enter presentation mode. The controls will be hidden, and the animation will take over your entire screen. Press `Escape` to exit.

## 💻 Built With
- [Next.js](https://nextjs.org) - React Framework
- Vanilla CSS Modules - For performant, jank-free CSS keyframe animations
