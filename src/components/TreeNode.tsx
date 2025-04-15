import React from 'react';
import { TreeNodeProps } from '../types/types';
import { getMarkerExpressionString, markerNameMap } from '../utils/treeLogic';

export const TreeNode: React.FC<TreeNodeProps> = ({ 
  node, 
  level, 
  onToggle, 
  selectedMarkers,
  onMarkerToggle,
  parentIsSatisfied
}) => {
  console.log(`TreeNode rendering: ID=${node.id}, Level=${level}, isVisible=${node.isVisible}, isExpanded=${node.isExpanded}, Children=${node.children.length}`);

  const paddingLeft = `${level * 2}rem`;
  // Node's own satisfaction state
  const isSatisfied = node.isSatisfied !== false; 
  
  // Determine disabling states based on new logic
  const shouldAppearGrey = !isSatisfied; // Visual grey based on own state
  const shouldDisableOwnCheckboxes = !parentIsSatisfied; // Own checkboxes disabled by parent state
  const shouldDisableExpandButton = !isSatisfied; // Expand button disabled by own state

  // Define styles based on these states
  const textClass = shouldAppearGrey ? 'text-gray-400' : 'text-gray-900';
  const phenotypeTextClass = shouldAppearGrey ? 'text-gray-400' : 'text-gray-500';
  const checkboxLabelClass = shouldDisableOwnCheckboxes ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 cursor-pointer';
  const buttonClass = shouldDisableExpandButton ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700';
  const checkboxLookClass = shouldDisableOwnCheckboxes ? 'text-gray-400 cursor-not-allowed' : 'text-primary-600 focus:ring-primary-500 cursor-pointer';
  const overallOpacityClass = shouldAppearGrey ? 'opacity-75' : ''; // Opacity based on own state

  // Function to render checkboxes
  const renderNodeSpecificMarkersAsCheckboxes = () => {
    if (!node.nodeSpecificMarkers?.length) return null;
    
    return (
      <div className="ml-2 flex items-center flex-wrap gap-x-3 gap-y-1">
        {node.nodeSpecificMarkers.map(({ markerId, expression }) => {
          const name = markerNameMap.get(markerId) || `ID ${markerId}`;
          const expressionSymbol = expression === 'positive' ? '⁺' : '⁻';
          const labelText = `${name}${expressionSymbol}`;
          const inputId = `node-${node.id}-marker-${markerId}`;

          return (
            <div key={markerId} className="flex items-center">
              <input
                type="checkbox"
                id={inputId}
                checked={selectedMarkers.has(markerId)}
                // Disable based on PARENT's satisfaction
                disabled={shouldDisableOwnCheckboxes} 
                onChange={(e) => {
                  e.stopPropagation(); 
                  // Toggle only if not disabled (attribute handles blocking click)
                  onMarkerToggle(markerId);
                }}
                className={`h-4 w-4 border-gray-300 rounded mr-1 ${checkboxLookClass}`}
              />
              <label 
                htmlFor={inputId} 
                className={`text-xs font-medium ${checkboxLabelClass}`}
                onClick={(e) => { 
                  e.stopPropagation(); 
                  // Toggle only if not disabled
                  if (!shouldDisableOwnCheckboxes) { 
                    onMarkerToggle(markerId);
                  }
                }}
              >
                {labelText}
              </label>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`my-1 ${overallOpacityClass}`}> 
      <div
        className="flex items-center p-2 hover:bg-gray-50 rounded"
        style={{ paddingLeft }}
      >
        {/* Expand/Collapse Button - Disable based on OWN satisfaction */}
        {node.children.length > 0 && (
          <button
            className={`mr-2 flex-shrink-0 ${buttonClass}`}
            aria-label={node.isExpanded ? 'Collapse' : 'Expand'}
            disabled={shouldDisableExpandButton} // Disable based on OWN state
            onClick={(e) => {
              e.stopPropagation();
              // Only toggle if button is not disabled (i.e., node is satisfied)
              if (!shouldDisableExpandButton) { 
                 onToggle(node.id);
              }
            }}
          >
            {node.isExpanded ? '▼' : '▶'}
          </button>
        )}
        {/* Content Area */}
        <div className="flex-1"> 
          {/* Name + Checkboxes Row */} 
          <div className="flex items-center flex-wrap mb-1">
            {/* Text color based on OWN satisfaction */} 
            <span className={`font-medium mr-1 ${textClass}`}>{node.name}</span>
            {renderNodeSpecificMarkersAsCheckboxes()} 
          </div>
          {/* Full Phenotype Row - Text color based on OWN satisfaction */} 
          <div className={`text-sm ${phenotypeTextClass}`}> 
            {getMarkerExpressionString(node.markers)}
          </div>
        </div>
      </div>
      
      {/* Children Rendering - Pass down THIS node's satisfaction state */}
      {node.isExpanded && node.children.length > 0 && (
        <div className="ml-4">
          {node.children.map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                level={level + 1}
                onToggle={onToggle}
                selectedMarkers={selectedMarkers} 
                onMarkerToggle={onMarkerToggle} 
                // Children are disabled based on this node's satisfaction
                parentIsSatisfied={isSatisfied} 
              />
          ))}
        </div>
      )}
    </div>
  );
}; 