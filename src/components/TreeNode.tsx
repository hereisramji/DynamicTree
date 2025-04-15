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
  
  // Determine disabling / appearance states
  const shouldAppearGrey = !isSatisfied;             // Grey based on own satisfaction
  const shouldBeDisabled = !parentIsSatisfied;       // Controls disabled based on PARENT satisfaction

  // Define styles
  const textClass = shouldAppearGrey ? 'text-gray-400' : 'text-gray-900';
  const phenotypeTextClass = shouldAppearGrey ? 'text-gray-400' : 'text-gray-500';
  const findingClass = shouldAppearGrey ? 'text-italic text-gray-400' : 'text-italic text-gray-600';
  // Styles based on whether controls should be disabled
  const checkboxLabelClass = shouldBeDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 cursor-pointer';
  const buttonClass = shouldBeDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700';
  const checkboxLookClass = shouldBeDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-primary-600 focus:ring-primary-500 cursor-pointer';
  // Opacity based on own satisfaction
  const overallOpacityClass = shouldAppearGrey ? 'opacity-75' : ''; 

  // Function to render checkboxes
  const renderLcaMarkerCheckboxes = () => {
    if (!node.lcaMarkerIds?.size) return null;
    const lcaIdsArray = Array.from(node.lcaMarkerIds);
    lcaIdsArray.sort((a, b) => a - b);
    
    return (
      <div className="ml-2 flex items-center flex-wrap gap-x-3 gap-y-1">
        {lcaIdsArray.map((markerId) => {
          const name = markerNameMap.get(markerId) || `ID ${markerId}`;
          const markerInfo = node.markers.find(m => m.markerId === markerId);
          const expressionSymbol = markerInfo ? (markerInfo.expression === 'positive' ? '⁺' : '⁻') : ''; 
          const labelText = `${name}${expressionSymbol}`;
          const inputId = `node-${node.id}-marker-${markerId}`;

          return (
            <div key={markerId} className="flex items-center">
              <input
                type="checkbox"
                id={inputId}
                checked={selectedMarkers.has(markerId)}
                // Disable based on PARENT's satisfaction
                disabled={shouldBeDisabled} 
                onChange={(e) => {
                  e.stopPropagation(); 
                  // Toggle allowed only if not disabled
                  if (!shouldBeDisabled) { onMarkerToggle(markerId); }
                }}
                className={`h-4 w-4 border-gray-300 rounded mr-1 ${checkboxLookClass}`}
              />
              <label 
                htmlFor={inputId} 
                className={`text-xs font-medium ${checkboxLabelClass}`}
                onClick={(e) => { 
                  e.stopPropagation(); 
                  // Toggle allowed only if not disabled
                  if (!shouldBeDisabled) { onMarkerToggle(markerId); }
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

  // --- Logic to determine satisfaction state to pass down --- 
  let satisfyStateToPassDown = isSatisfied; // Start with own satisfaction
  // If node is satisfied, check if all LCA markers it displays are also selected
  if (isSatisfied && node.lcaMarkerIds && node.lcaMarkerIds.size > 0) {
      const allLcaMarkersSelected = Array.from(node.lcaMarkerIds).every(id => selectedMarkers.has(id));
      if (!allLcaMarkersSelected) {
          satisfyStateToPassDown = false; // If any displayed LCA marker is off, children are unsatisfied
      }
  }
  // --- End logic --- 

  // Common rendering logic for the node content (excluding finding for special case)
  const renderNodeContent = () => (
    <>
      <div
        className="flex items-start p-2 hover:bg-gray-50 rounded"
        style={{ paddingLeft }}
      >
        {/* Expand/Collapse Button Area */} 
        <div className="pt-1"> 
          {node.children.length > 0 && (
            <button
              className={`mr-2 flex-shrink-0 ${buttonClass}`}
              aria-label={node.isExpanded ? 'Collapse' : 'Expand'}
              // Disable expand based on PARENT satisfaction now
              disabled={shouldBeDisabled} 
              onClick={(e) => {
                e.stopPropagation();
                // Toggle allowed only if not disabled
                if (!shouldBeDisabled) { onToggle(node.id); }
              }}
            >
              {node.isExpanded ? '▼' : '▶'}
            </button>
          )}
        </div>
        {/* Content Area */}
        <div className="flex-1 ml-2"> 
          {/* Name + LCA Checkboxes Row */} 
          <div className="flex items-center flex-wrap mb-1">
            <span className={`font-medium mr-1 ${textClass}`}>{node.name}</span>
            {renderLcaMarkerCheckboxes()} 
          </div>
          {/* Full Phenotype Row */} 
          <div className={`text-sm mb-1 ${phenotypeTextClass}`}> 
            {getMarkerExpressionString(node.markers)}
          </div>
          {/* Render finding text HERE only for non-special case nodes */} 
          {node.findingText && node.id !== 'tcr-gamma-delta' && (
            <div className={`text-sm mt-1 ${findingClass}`}> 
              {node.findingText}
            </div>
          )}
        </div>
      </div>
      
      {/* Children Rendering - Remove parentIsSatisfied */}
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
                // Pass down the calculated satisfaction state
                parentIsSatisfied={satisfyStateToPassDown} 
              />
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className={`my-1 ${overallOpacityClass}`}> 
      {/* Special layout for tcr-gamma-delta with finding */}
      {node.id === 'tcr-gamma-delta' && node.findingText ? (
        <div className="flex items-start"> {/* Use flexbox for side-by-side */} 
          {/* Node content takes available space */} 
          <div className="flex-grow"> 
            {renderNodeContent()}
          </div>
          {/* Finding text in a styled box to the right */} 
          <div className={`ml-4 p-2 bg-gray-50 rounded border border-gray-200 text-sm italic ${findingClass}`} style={{ minWidth: '200px', maxWidth: '300px' }}>
            {node.findingText}
          </div>
        </div>
      ) : (
        // Standard rendering for all other nodes
        renderNodeContent()
      )}
    </div>
  );
}; 