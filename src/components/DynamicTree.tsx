import React, { useState, useCallback, useEffect } from 'react';
import { MarkerSelector } from './MarkerSelector';
import { TreeNode } from './TreeNode';
import { markers } from '../data/markers';
import { buildCellTree } from '../data/cellPopulations';
import { updateNodeSatisfaction, toggleNodeExpansion } from '../utils/treeLogic';
import { TreeNode as TreeNodeType } from '../types/types';
import { TruncatedInfoPanel } from './TruncatedInfoPanel';

// Define the IDs for the truncated panel
const truncatedPanelMarkerIds = new Set([7, 19, 15, 16, 12, 17, 4, 2]);
const allMarkerIds = new Set(markers.map(m => m.id)); // Helper set for restoring

export const DynamicTree: React.FC = () => {
  const initialTreeData = buildCellTree();
  // Log the initial tree structure to the console for debugging
  console.log('Initial Tree Built:', JSON.stringify(initialTreeData, null, 2));
  const [treeNodes, setTreeNodes] = useState<TreeNodeType[]>(initialTreeData);
  const [selectedMarkers, setSelectedMarkers] = useState<Set<number>>(
    allMarkerIds // Start with all selected
  );
  const [isSimulatingTruncated, setIsSimulatingTruncated] = useState<boolean>(false); 
  // Store previous selections before simulation
  const [preSimulationSelections, setPreSimulationSelections] = useState<Set<number> | null>(null);

  // Effect to update tree satisfaction state whenever selectedMarkers changes
  useEffect(() => {
    console.log('Selected markers changed, updating tree satisfaction:', selectedMarkers);
    // Use functional update and the new satisfaction logic
    setTreeNodes(currentTree => 
      currentTree.map(node => updateNodeSatisfaction(node, selectedMarkers))
    );
  }, [selectedMarkers]); // Rerun satisfaction logic when selectedMarkers changes

  const handleMarkerToggle = useCallback(
    (markerId: number) => {
      if (isSimulatingTruncated) return;
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
    [isSimulatingTruncated]
  );
  
  const handleSimulationToggle = useCallback(() => {
    setIsSimulatingTruncated(prev => {
      const nextState = !prev;
      if (nextState) {
        // Entering simulation: store current state and apply truncated set
        setPreSimulationSelections(selectedMarkers);
        setSelectedMarkers(truncatedPanelMarkerIds);
      } else {
        // Exiting simulation: restore previous state (or all if none stored)
        setSelectedMarkers(preSimulationSelections || allMarkerIds);
        setPreSimulationSelections(null);
      }
      return nextState;
    });
  }, [selectedMarkers, preSimulationSelections]);

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
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full md:w-1/3 space-y-4">
        {/* Simulation Toggle - Updated onChange */}
        <div className="p-4 bg-white rounded-lg shadow-md flex items-center justify-between">
          <span className="text-lg font-semibold">Truncated Panel Simulation</span>
          <label htmlFor="simulateToggle" className="flex items-center cursor-pointer">
            <div className="relative">
              <input 
                type="checkbox" 
                id="simulateToggle" 
                className="sr-only" 
                checked={isSimulatingTruncated}
                onChange={handleSimulationToggle} // Use new handler
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${isSimulatingTruncated ? 'translate-x-6 bg-primary-600' : ''}`}></div>
            </div>
          </label>
        </div>
        
        {/* Pass only necessary props */}
        <MarkerSelector
          markers={markers}
          selectedMarkers={selectedMarkers} // This now changes during simulation
          onMarkerToggle={handleMarkerToggle}
          // isSimulatingTruncated prop removed
          // truncatedPanelMarkerIds prop removed
        />
      </div>
      <div className="w-full md:w-2/3 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Cell Population Tree</h2>
        
        {/* Keep the info panel for context */}
        {isSimulatingTruncated && <TruncatedInfoPanel onClose={handleSimulationToggle} />}
        
        <div className={`space-y-1 ${isSimulatingTruncated ? 'mt-4' : ''}`}> 
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