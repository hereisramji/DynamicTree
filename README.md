# DynamicTree

An interactive visualization of a hierarchical cell type tree based on flow cytometry markers. This widget allows users to dynamically show or hide parts of the tree by selecting or deselecting markers, simulating the gating strategies used in flow cytometry analysis.

## Features

- Interactive marker selection
- Dynamic tree visualization
- Expandable/collapsible tree nodes
- Marker expression display
- Responsive design
- Based on the Van Zelm panel and gating scheme

## Technology Stack

- React
- TypeScript
- Tailwind CSS
- Modern web development tools

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
src/
├── components/
│   ├── DynamicTree.tsx
│   ├── MarkerSelector.tsx
│   └── TreeNode.tsx
├── types/
│   └── types.ts
├── data/
│   └── markers.ts
├── utils/
│   └── treeLogic.ts
└── styles/
    └── index.css
```

