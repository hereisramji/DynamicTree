import { TreeNode, MarkerExpression } from '../types/types';
import { markers } from '../data/markers'; // Import marker data

// Create a lookup map for marker IDs to names for efficient access
const markerNameMap = new Map<number, string>();
markers.forEach(marker => {
  markerNameMap.set(marker.id, marker.name);
});

export const updateNodeVisibility = (
  node: TreeNode,
  selectedMarkers: Set<number>
): TreeNode => {
  // Check if all markers required for THIS node's definition are selected in the panel
  // This includes markers inherited from parents.
  const hasRequiredMarkers = node.markers.every(({ markerId }) => 
    selectedMarkers.has(markerId)
  );

  // Update children first, recursively applying the same logic
  const updatedChildren = node.children.map((child) =>
    updateNodeVisibility(child, selectedMarkers)
  );

  // Node is visible if its own required markers are selected in the panel.
  // Children visibility is determined by their own marker requirements.
  const isVisible = hasRequiredMarkers;

  return {
    ...node,
    isVisible,
    children: updatedChildren,
  };
};

export const toggleNodeExpansion = (
  nodes: TreeNode[],
  nodeId: string
): TreeNode[] => {
  return nodes.map((node) => {
    if (node.id === nodeId) {
      return { ...node, isExpanded: !node.isExpanded };
    }
    if (node.children.length > 0) {
      return {
        ...node,
        children: toggleNodeExpansion(node.children, nodeId),
      };
    }
    return node;
  });
};

// Updated function to use marker names
export const getMarkerExpressionString = (
  markerExpressions: MarkerExpression[]
): string => {
  return markerExpressions
    .map(({ markerId, expression }) => {
      const name = markerNameMap.get(markerId) || `ID ${markerId}`; // Fallback to ID if name not found
      return `${name}${expression === 'positive' ? '⁺' : '⁻'}`;
    })
    .join(', ');
}; 