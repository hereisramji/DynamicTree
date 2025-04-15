import { TreeNode, MarkerExpression } from '../types/types';
import { markers as allMarkers } from '../data/markers'; // Get full marker list

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

// Keep track of the original markers defined for each node ID
const originalNodeMarkersMap = new Map<string, MarkerExpression[]>();
Object.entries(cellPopulations).forEach(([id, node]) => {
  originalNodeMarkersMap.set(id, [...node.markers]); 
});

// Keep track of which nodes originally define each marker ID
const markerDefiningNodesMap = new Map<number, string[]>();
allMarkers.forEach(marker => markerDefiningNodesMap.set(marker.id, [])); // Initialize
Object.entries(cellPopulations).forEach(([nodeId, node]) => {
  // Use the original definition to map defining nodes
  const originalMarkers = originalNodeMarkersMap.get(nodeId) || []; 
  originalMarkers.forEach(({ markerId }) => {
    markerDefiningNodesMap.get(markerId)?.push(nodeId);
  });
});

// Helper function to propagate parent markers AND calculate nodeSpecificMarkers
function processNodeMarkers(node: TreeNode, parentMarkers: MarkerExpression[] = []) {
  const originalMarkers = originalNodeMarkersMap.get(node.id) || [];
  const combinedMarkerMap = new Map<number, MarkerExpression>();
  parentMarkers.forEach(marker => combinedMarkerMap.set(marker.markerId, marker));
  originalMarkers.forEach(marker => combinedMarkerMap.set(marker.markerId, marker)); 
  node.markers = Array.from(combinedMarkerMap.values());
  const parentMarkerIds = new Set(parentMarkers.map(m => m.markerId));
  node.nodeSpecificMarkers = originalMarkers.filter(
    marker => !parentMarkerIds.has(marker.markerId) 
  );
  node.children.forEach(child => processNodeMarkers(child, node.markers));
}

// --- LCA Calculation Helpers ---

// Helper to get all ancestors of a node up to the root
function getAncestors(nodeId: string, parentMap: Map<string, string>): string[] {
  const ancestors: string[] = [];
  let currentId: string | undefined = nodeId;
  while (currentId && parentMap.has(currentId)) { 
    const parentId: string = parentMap.get(currentId)!; 
    ancestors.push(parentId);
    currentId = parentId;
  }
  return ancestors.reverse(); // root first
}

// REVISED Helper to find LCA for a set of node IDs
function findLCA(nodeIds: string[], parentMap: Map<string, string>): string | null {
  if (!nodeIds || nodeIds.length === 0) return null;
  if (nodeIds.length === 1) return nodeIds[0]; // LCA of one node is itself

  // Helper to get the full path from root to node
  const getPath = (id: string): string[] => {
    const ancestors = getAncestors(id, parentMap); // ['root', 'parent', ...]
    // If node itself has no ancestors in the map, it might be the root
    if (ancestors.length === 0 && !parentMap.has(id)) { 
      return [id]; // Path is just the node itself if it's a root
    }
    return [...ancestors, id]; // Path from root to node: ['root', ..., 'parent', 'id']
  };

  const paths = nodeIds.map(getPath);

  // Check for empty paths (could indicate orphaned nodes not linked from root)
  if (paths.some(p => p.length === 0)) {
      console.warn("Found empty path during LCA calculation for nodes:", nodeIds);
      return null; 
  }

  // Find the shortest path length to determine comparison limit
  const minLength = Math.min(...paths.map(p => p.length));

  let lca: string | null = null;
  // Iterate from root (level 0) downwards
  for (let level = 0; level < minLength; level++) {
    const ancestorAtLevel = paths[0][level]; // Get potential common ancestor from the first path
    
    // Check if all other paths have the same ancestor at this level
    if (paths.every(p => p[level] === ancestorAtLevel)) {
      lca = ancestorAtLevel; // It's a common ancestor, update LCA to this deeper node
    } else {
      break; // Paths diverged, the LCA was the common ancestor from the previous level
    }
  }

  return lca; // Return the deepest common ancestor found
}

// --- End LCA Helpers ---

// Function to build the tree
export function buildCellTree(): TreeNode[] {
  const populations: { [key: string]: TreeNode } = JSON.parse(JSON.stringify(cellPopulations)); 
  const nodeMap = new Map<string, TreeNode>();
  const parentMap = new Map<string, string>(); // childId -> parentId

  // Initialize nodes and clear children/LCA set
  for (const id in populations) {
    populations[id].children = [];
    // Ensure lcaMarkerIds is initialized as a Set
    populations[id].lcaMarkerIds = new Set<number>(); 
    nodeMap.set(id, populations[id]);
  }

  // Build tree structure and parent map
  for (const { parentId, childId } of cellRelationships) {
    const parent = nodeMap.get(parentId);
    const child = nodeMap.get(childId);
    if (parent && child) {
      if (!parent.children.some(c => c.id === childId)) {
         parent.children.push(child);
         parentMap.set(childId, parentId);
      }
    } else {
      console.warn(`Relationship error: Parent (${parentId}) or Child (${childId}) not found.`);
    }
  }

  // Find root nodes
  const tree: TreeNode[] = [];
  const childIds = new Set(cellRelationships.map(r => r.childId));
  const rootIds: string[] = []; // Keep track of root IDs
  for (const id in populations) {
    if (!childIds.has(id)) { 
      rootIds.push(id);
      const rootNode = populations[id];
      processNodeMarkers(rootNode); 
      tree.push(rootNode);
    }
  }

  // Step 2: Calculate LCA for each marker and assign to the LCA node
  console.log("Calculating LCAs for markers..."); // Log start
  markerDefiningNodesMap.forEach((nodeIdsDefiningMarker, markerId) => {
    if (nodeIdsDefiningMarker.length > 0) {
      const markerName = allMarkers.find(m => m.id === markerId)?.name || `ID ${markerId}`;
      console.log(`  Marker: ${markerName} (ID ${markerId}), Defined by: [${nodeIdsDefiningMarker.join(', ')}]`); // Log marker and defining nodes
      const lcaNodeId = findLCA(nodeIdsDefiningMarker, parentMap);
      console.log(`    Calculated LCA Node ID: ${lcaNodeId}`); // Log calculated LCA ID
      if (lcaNodeId) {
        const lcaNode = nodeMap.get(lcaNodeId);
        if (lcaNode) {
           if (!lcaNode.lcaMarkerIds) {
             lcaNode.lcaMarkerIds = new Set<number>();
           }
           lcaNode.lcaMarkerIds.add(markerId);
           console.log(`    Added marker ${markerId} to LCA node: ${lcaNode.name} (ID ${lcaNodeId})`); // Log successful addition
        } else {
           console.warn(`    LCA node ID ${lcaNodeId} not found in nodeMap for marker ${markerId}`);
        }
      } else {
        console.warn(`    Could not find LCA for marker ${markerId} (nodes: ${nodeIdsDefiningMarker.join(', ')})`);
      }
    } else {
        // Optional: Log markers that are not defined by any node
        // const markerName = allMarkers.find(m => m.id === markerId)?.name || `ID ${markerId}`;
        // console.log(`  Marker: ${markerName} (ID ${markerId}) is not defined by any node.`);
    }
  });
  console.log("Finished calculating LCAs."); // Log end

  // Log the final state of a few key nodes for inspection
  console.log("Root LCA Markers:", nodeMap.get('root')?.lcaMarkerIds);
  console.log("T-Cells LCA Markers:", nodeMap.get('t-cells')?.lcaMarkerIds);
  console.log("TCRab LCA Markers:", nodeMap.get('tcr-alpha-beta')?.lcaMarkerIds);

  // Return the processed tree structure
  if (tree.length === 1 && tree[0].id === 'root') {
      return [tree[0]];
  } else if (tree.length > 0) {
      console.warn("Multiple root nodes found or root node is not named 'root'. Returning all top-level nodes.", tree);
      return tree;
  } else {
      console.error("Could not build tree structure. No root node found.");
      return [];
  }
} 