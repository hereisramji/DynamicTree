import { TreeNode, MarkerExpression } from '../types/types';
import { markers } from '../data/markers'; // Import marker data

// Create a lookup map for marker IDs to names for efficient access
export const markerNameMap = new Map<number, string>();
markers.forEach(marker => {
  markerNameMap.set(marker.id, marker.name);
});

// Renamed from updateNodeVisibility
export const updateNodeSatisfaction = (
  node: TreeNode,
  selectedMarkers: Set<number>
): TreeNode => {
  // Check if all markers required for THIS node (including inherited) are selected
  const hasRequiredMarkers = node.markers.every(({ markerId }) => 
    selectedMarkers.has(markerId)
  );

  // Recursively update children first
  const updatedChildren = node.children.map((child) =>
    updateNodeSatisfaction(child, selectedMarkers)
  );

  // Set the isSatisfied flag based on marker selection
  const isSatisfied = hasRequiredMarkers;

  return {
    ...node,
    isSatisfied, // Set the new flag
    isVisible: true, // Keep node technically visible
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