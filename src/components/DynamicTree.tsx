import React, { useState, useCallback, useEffect } from 'react';
import { TreeNode } from './TreeNode';
import { markers } from '../data/markers';
import { buildCellTree } from '../data/cellPopulations';
import { updateNodeSatisfaction, toggleNodeExpansion } from '../utils/treeLogic';
import { TreeNode as TreeNodeType } from '../types/types';

const allMarkerIds = new Set(markers.map(m => m.id));

export const DynamicTree: React.FC = () => {
  const initialTreeData = buildCellTree();
  console.log('Initial Tree Built:', JSON.stringify(initialTreeData, null, 2));
  const [treeNodes, setTreeNodes] = useState<TreeNodeType[]>(initialTreeData);
  const [selectedMarkers, setSelectedMarkers] = useState<Set<number>>(
    allMarkerIds 
  );

  useEffect(() => {
    console.log('Selected markers changed, updating tree satisfaction:', selectedMarkers);
    setTreeNodes(currentTree => 
      currentTree.map(node => updateNodeSatisfaction(node, selectedMarkers))
    );
  }, [selectedMarkers]);

  const handleMarkerToggle = useCallback(
    (markerId: number) => {
      setSelectedMarkers((currentSelected) => {
        const newSelectedMarkers = new Set(currentSelected);
        if (newSelectedMarkers.has(markerId)) {
          newSelectedMarkers.delete(markerId);
        } else {
          newSelectedMarkers.add(markerId);
        }
        return newSelectedMarkers;
      });
    },
    []
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

  console.log('Rendering DynamicTree with selectedMarkers:', selectedMarkers);

  return (
    <div className="flex p-4">
      <div className="w-full bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Cell Population Tree</h2>
        
        <div className="space-y-1"> 
          {treeNodes.map((node) => (
               <TreeNode
                 key={node.id}
                 node={node}
                 level={0} 
                 onToggle={handleNodeToggle}
                 selectedMarkers={selectedMarkers}
                 onMarkerToggle={handleMarkerToggle} 
                 parentIsSatisfied={true}
               />
          ))}
        </div>
      </div>
    </div>
  );
}; 