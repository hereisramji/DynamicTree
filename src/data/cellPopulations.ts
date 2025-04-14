import { TreeNode, MarkerExpression } from '../types/types';

// Define all cell populations from the Van Zelm panel
// Ensure the keys match the node IDs
export const cellPopulations: { [key: string]: TreeNode } = {
  'root': {
    id: 'root',
    name: 'CD45⁺ Leukocytes',
    markers: [
      { markerId: 16, expression: 'positive' },  // Correct: CD45+ (ID 16)
      { markerId: 2, expression: 'negative' }    // Viability-
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  'b-cells': {
    id: 'b-cells',
    name: 'B Cells',
    markers: [
      // Inherits CD45+, Viability-
      { markerId: 7, expression: 'negative' },  // CD3-
      { markerId: 4, expression: 'positive' }   // CD19+
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  'nk-cells': {
    id: 'nk-cells',
    name: 'NK Cells',
    markers: [
      // Inherits CD45+, Viability-
      { markerId: 7, expression: 'negative' },   // CD3-
      { markerId: 4, expression: 'negative' },   // CD19-
      { markerId: 10, expression: 'positive' }   // Correct: Simplified CD16/CD56+ to CD16+ (ID 10)
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  't-cells': {
    id: 't-cells',
    name: 'T Cells',
    markers: [
      // Inherits CD45+, Viability-
      { markerId: 7, expression: 'positive' },  // CD3+
      { markerId: 4, expression: 'negative' }  // CD19-
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  'tcr-gamma-delta': {
    id: 'tcr-gamma-delta',
    name: 'TCRγδ⁺',
    markers: [
      // Inherits T cell markers (CD45+, Viability-, CD3+, CD19-)
      { markerId: 17, expression: 'positive' }  // Correct: TCRγδ+ (ID 17)
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  'tcr-alpha-beta': {
    id: 'tcr-alpha-beta',
    name: 'TCRαβ⁺',
    markers: [
      // Inherits T cell markers (CD45+, Viability-, CD3+, CD19-)
      { markerId: 17, expression: 'negative' }  // Correct: TCRγδ- (ID 17)
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  'double-negative-t-cells': {
    id: 'double-negative-t-cells',
    name: 'Double Negative T Cells (CD4⁻CD8⁻)',
    markers: [
      // Inherits TCRαβ markers (CD45+, Viability-, CD3+, CD19-, TCRγδ-)
      { markerId: 19, expression: 'negative' },  // Correct: CD4- (ID 19)
      { markerId: 15, expression: 'negative' }   // Correct: CD8- (ID 15)
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  'cd4-t-cells': {
    id: 'cd4-t-cells',
    name: 'CD4⁺ T Cells',
    markers: [
      // Inherits TCRαβ markers (CD45+, Viability-, CD3+, CD19-, TCRγδ-)
      { markerId: 19, expression: 'positive' },  // Correct: CD4+ (ID 19)
      { markerId: 15, expression: 'negative' }   // Correct: CD8- (ID 15)
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  'treg': {
    id: 'treg',
    name: 'Treg',
    markers: [
      // Inherits CD4+ T cell markers (CD45+, Viability-, CD3+, CD19-, TCRγδ-, CD4+, CD8-)
      { markerId: 22, expression: 'positive' },  // Correct: CD25+ (ID 22)
      { markerId: 26, expression: 'negative' }   // Correct: CD127- (representing lo) (ID 26)
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  'not-treg': {
    id: 'not-treg',
    name: 'NOT Treg',
    markers: [
      // Inherits CD4+ T cell markers (CD45+, Viability-, CD3+, CD19-, TCRγδ-, CD4+, CD8-)
      // Represents CD25+/lo and CD127+/- contrast to Treg (CD25+, CD127-)
      { markerId: 22, expression: 'positive' }, // Simplified from CD25+/lo (ID 22)
      { markerId: 26, expression: 'positive' }  // Simplified from CD127+/- (ID 26)
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  'naive-stem-like-cd4': {
    id: 'naive-stem-like-cd4',
    name: 'Naive/stem-like CD4',
    markers: [
      // Inherits Not Treg markers (... CD25+, CD127+)
      { markerId: 3, expression: 'positive' },   // Correct: CD45RA+ (ID 3)
      { markerId: 12, expression: 'positive' }   // Correct: CCR7+ (ID 12)
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  'tnaive-cd4': {
    id: 'tnaive-cd4',
    name: 'Tnaive CD4',
    markers: [
      // Inherits Naive/stem-like CD4 markers (... CD45RA+, CCR7+)
      { markerId: 20, expression: 'negative' }  // Correct: CD95- (ID 20)
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  'tscm-cd4': {
    id: 'tscm-cd4',
    name: 'Tscm CD4',
    markers: [
      // Inherits Naive/stem-like CD4 markers (... CD45RA+, CCR7+)
      { markerId: 20, expression: 'positive' }   // Correct: CD95+ (ID 20)
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  'tcm-cd4': {
    id: 'tcm-cd4',
    name: 'Tcm CD4',
    markers: [
      // Inherits Not Treg markers (... CD25+, CD127+)
      { markerId: 3, expression: 'negative' },   // Correct: CD45RA- (ID 3)
      { markerId: 12, expression: 'positive' }   // Correct: CCR7+ (ID 12)
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  'temro-cd4': {
    id: 'temro-cd4',
    name: 'TemRO CD4',
    markers: [
      // Inherits Not Treg markers (... CD25+, CD127+)
      { markerId: 3, expression: 'negative' },   // Correct: CD45RA- (ID 3)
      { markerId: 12, expression: 'negative' }   // Correct: CCR7- (ID 12)
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  'temra-cd4': {
    id: 'temra-cd4',
    name: 'TemRA CD4',
    markers: [
      // Inherits Not Treg markers (... CD25+, CD127+)
      { markerId: 3, expression: 'positive' },   // Correct: CD45RA+ (ID 3)
      { markerId: 12, expression: 'negative' }   // Correct: CCR7- (ID 12)
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  'tfh-cd4': {
    id: 'tfh-cd4',
    name: 'Tfh CD4',
    markers: [
      // Inherits Not Treg markers (... CD25+, CD127+)
      { markerId: 3, expression: 'negative' },   // Correct: CD45RA- (ID 3)
      { markerId: 11, expression: 'positive' }   // Correct: CXCR5+ (ID 11)
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  'cd8-t-cells': {
    id: 'cd8-t-cells',
    name: 'CD8⁺ T Cells',
    markers: [
      // Inherits TCRαβ markers (CD45+, Viability-, CD3+, CD19-, TCRγδ-)
      { markerId: 19, expression: 'negative' },  // Correct: CD4- (ID 19)
      { markerId: 15, expression: 'positive' }   // Correct: CD8+ (ID 15)
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  'naive-stem-like-cd8': {
    id: 'naive-stem-like-cd8',
    name: 'Naive/stem-like CD8',
    markers: [
      // Inherits CD8+ T cell markers (... CD4-, CD8+)
      { markerId: 3, expression: 'positive' },   // Correct: CD45RA+ (ID 3)
      { markerId: 12, expression: 'positive' }   // Correct: CCR7+ (ID 12)
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  'tnaive-cd8': {
    id: 'tnaive-cd8',
    name: 'Tnaive CD8',
    markers: [
      // Inherits Naive/stem-like CD8 markers (... CD45RA+, CCR7+)
      { markerId: 20, expression: 'negative' }   // Correct: CD95- (ID 20)
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  'tscm-cd8': {
    id: 'tscm-cd8',
    name: 'Tscm CD8',
    markers: [
      // Inherits Naive/stem-like CD8 markers (... CD45RA+, CCR7+)
      { markerId: 20, expression: 'positive' }   // Correct: CD95+ (ID 20)
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  'tcm-cd8': {
    id: 'tcm-cd8',
    name: 'Tcm CD8',
    markers: [
      // Inherits CD8+ T cell markers (... CD4-, CD8+)
      { markerId: 3, expression: 'negative' },   // Correct: CD45RA- (ID 3)
      { markerId: 12, expression: 'positive' }   // Correct: CCR7+ (ID 12)
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  'temro-cd8': {
    id: 'temro-cd8',
    name: 'TemRO CD8',
    markers: [
      // Inherits CD8+ T cell markers (... CD4-, CD8+)
      { markerId: 3, expression: 'negative' },   // Correct: CD45RA- (ID 3)
      { markerId: 12, expression: 'negative' }   // Correct: CCR7- (ID 12)
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  },
  'temra-cd8': {
    id: 'temra-cd8',
    name: 'TemRA CD8',
    markers: [
      // Inherits CD8+ T cell markers (... CD4-, CD8+)
      { markerId: 3, expression: 'positive' },   // Correct: CD45RA+ (ID 3)
      { markerId: 12, expression: 'negative' }   // Correct: CCR7- (ID 12)
    ],
    isExpanded: true,
    isVisible: true,
    children: []
  }
};

// Define the relationships between cell populations
export const cellRelationships = [
  { parentId: 'root', childId: 'b-cells' },
  { parentId: 'root', childId: 'nk-cells' },
  { parentId: 'root', childId: 't-cells' },
  { parentId: 't-cells', childId: 'tcr-gamma-delta' },
  { parentId: 't-cells', childId: 'tcr-alpha-beta' },
  { parentId: 'tcr-alpha-beta', childId: 'cd4-t-cells' },
  { parentId: 'tcr-alpha-beta', childId: 'cd8-t-cells' },
  { parentId: 'tcr-alpha-beta', childId: 'double-negative-t-cells' },
  // CD4 Subsets
  { parentId: 'cd4-t-cells', childId: 'treg' },
  { parentId: 'cd4-t-cells', childId: 'not-treg' },
  { parentId: 'not-treg', childId: 'naive-stem-like-cd4' },
  { parentId: 'not-treg', childId: 'tcm-cd4' },
  { parentId: 'not-treg', childId: 'temro-cd4' },
  { parentId: 'not-treg', childId: 'temra-cd4' },
  { parentId: 'not-treg', childId: 'tfh-cd4' },
  { parentId: 'naive-stem-like-cd4', childId: 'tnaive-cd4' },
  { parentId: 'naive-stem-like-cd4', childId: 'tscm-cd4' },
  // CD8 Subsets
  { parentId: 'cd8-t-cells', childId: 'naive-stem-like-cd8' },
  { parentId: 'cd8-t-cells', childId: 'tcm-cd8' },
  { parentId: 'cd8-t-cells', childId: 'temro-cd8' },
  { parentId: 'cd8-t-cells', childId: 'temra-cd8' },
  { parentId: 'naive-stem-like-cd8', childId: 'tnaive-cd8' },
  { parentId: 'naive-stem-like-cd8', childId: 'tscm-cd8' }
];

// Helper function for buildCellTree to propagate parent markers
function propagateParentMarkers(node: TreeNode, parentMarkers: MarkerExpression[] = []) {
  // Combine parent markers and the node's own specific markers
  // Use a Map to handle potential overrides or duplicates, prioritizing the node's own definition if IDs clash
  const combinedMarkerMap = new Map<number, MarkerExpression>();
  parentMarkers.forEach(marker => combinedMarkerMap.set(marker.markerId, marker));
  node.markers.forEach(marker => combinedMarkerMap.set(marker.markerId, marker));
  
  // Update the node's markers with the full combined list
  node.markers = Array.from(combinedMarkerMap.values());
  
  // Recursively process children
  node.children.forEach(child => propagateParentMarkers(child, node.markers));
}

// Function to build the tree from the cell populations and relationships
export function buildCellTree(): TreeNode[] {
  // Create a working copy of populations to avoid modifying the original export
  const populations: { [key: string]: TreeNode } = JSON.parse(JSON.stringify(cellPopulations));
  const nodeMap = new Map<string, TreeNode>();

  // Populate the map and ensure children array is initialized
  for (const id in populations) {
    populations[id].children = []; // Ensure children array is empty initially
    nodeMap.set(id, populations[id]);
  }

  // Establish parent-child relationships
  for (const { parentId, childId } of cellRelationships) {
    const parent = nodeMap.get(parentId);
    const child = nodeMap.get(childId);

    if (parent && child) {
      // Check if child is already present to avoid duplicates
      if (!parent.children.some(c => c.id === childId)) {
         parent.children.push(child);
      }
    } else {
      console.warn(`Relationship error: Parent (${parentId}) or Child (${childId}) not found.`);
    }
  }

  // Find the root node(s) and propagate markers
  const tree: TreeNode[] = [];
  const childIds = new Set(cellRelationships.map(r => r.childId));
  for (const id in populations) {
    if (!childIds.has(id)) {
      const rootNode = populations[id];
      propagateParentMarkers(rootNode); // Start marker propagation from the root
      tree.push(rootNode);
    }
  }

  // Return the processed tree structure
  if (tree.length === 1 && tree[0].id === 'root') {
      return [tree[0]];
  } else if (tree.length > 0) {
      console.warn("Multiple root nodes found or root node is not named 'root'. Returning all top-level nodes.", tree);
      return tree; // Fallback: return all found top-level nodes
  } else {
      console.error("Could not build tree structure. No root node found.");
      return []; // Return empty if no root is found
  }
} 