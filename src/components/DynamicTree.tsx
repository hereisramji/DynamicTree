import React, { useState, useCallback, useEffect } from 'react';
import { MarkerSelector } from './MarkerSelector';
import { TreeNode } from './TreeNode';
import { markers } from '../data/markers';
import { buildCellTree } from '../data/cellPopulations';
import { updateNodeVisibility, toggleNodeExpansion } from '../utils/treeLogic';
import { TreeNode as TreeNodeType } from '../types/types';

export const DynamicTree: React.FC = () => {
  const initialTreeData = buildCellTree();
  // Log the initial tree structure to the console for debugging
  console.log('Initial Tree Built:', JSON.stringify(initialTreeData, null, 2));
  const [treeNodes, setTreeNodes] = useState<TreeNodeType[]>(initialTreeData);
  const [selectedMarkers, setSelectedMarkers] = useState<Set<number>>(
    new Set(markers.map((m) => m.id))
  );

  // Initialize tree visibility on mount
  useEffect(() => {
    // Log the tree state before visibility update
    console.log('Tree before visibility update:', JSON.stringify(treeNodes, null, 2));
    const updatedTree = treeNodes.map((node) =>
      updateNodeVisibility(node, selectedMarkers)
    );
    // Log the tree state after visibility update
    console.log('Tree after visibility update:', JSON.stringify(updatedTree, null, 2));
    setTreeNodes(updatedTree);
    // It's generally better practice to include dependencies, 
    // but for initial setup based on static data, an empty array is common.
    // However, let's add selectedMarkers to be safe, although it shouldn't change the initial render.
  }, [selectedMarkers]); 

  const handleMarkerToggle = useCallback(
    (markerId: number) => {
      const newSelectedMarkers = new Set(selectedMarkers);
      if (newSelectedMarkers.has(markerId)) {
        newSelectedMarkers.delete(markerId);
      } else {
        newSelectedMarkers.add(markerId);
      }
      setSelectedMarkers(newSelectedMarkers);

      // Use a functional update to ensure we're working with the latest state
      setTreeNodes(currentTreeNodes => {
        const updatedTree = currentTreeNodes.map(node =>
          updateNodeVisibility(node, newSelectedMarkers)
        );
        console.log('Tree after marker toggle:', JSON.stringify(updatedTree, null, 2));
        return updatedTree;
      });
    },
    [selectedMarkers] // Removed treeNodes dependency to avoid potential loops if update logic causes re-renders
  );

  const handleNodeToggle = useCallback(
    (nodeId: string) => {
      setTreeNodes((currentTreeNodes) => {
        const updatedTree = toggleNodeExpansion(currentTreeNodes, nodeId);
        console.log('Tree after node toggle:', JSON.stringify(updatedTree, null, 2));
        return updatedTree;
      });
    },
    []
  );

  console.log('Rendering DynamicTree with treeNodes:', JSON.stringify(treeNodes, null, 2));

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full md:w-1/3">
        <MarkerSelector
          markers={markers}
          selectedMarkers={selectedMarkers}
          onMarkerToggle={handleMarkerToggle}
        />
      </div>
      <div className="w-full md:w-2/3 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Cell Population Tree</h2>
        <div className="space-y-1">
          {/* Render top-level nodes; TreeNode component handles recursion */}
          {treeNodes.map((node) => {
             console.log(`DynamicTree: Mapping node ${node.id} at level 0`); // Log node being mapped
             return (
               <TreeNode
                 key={node.id}
                 node={node}
                 level={0} // Start top-level nodes at level 0
                 onToggle={handleNodeToggle}
               />
             );
          })}
        </div>
      </div>
    </div>
  );
}; 