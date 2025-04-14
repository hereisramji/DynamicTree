import React from 'react';
import { TreeNodeProps } from '../types/types';
import { getMarkerExpressionString } from '../utils/treeLogic';

export const TreeNode: React.FC<TreeNodeProps> = ({ node, level, onToggle }) => {
  console.log(`TreeNode rendering: ID=${node.id}, Level=${level}, isVisible=${node.isVisible}, isExpanded=${node.isExpanded}, Children=${node.children.length}`);

  if (!node.isVisible) {
    console.log(`TreeNode ${node.id}: Not rendering because isVisible is false.`);
    return null;
  }

  const paddingLeft = `${level * 2}rem`;
  console.log(`TreeNode ${node.id}: Applying paddingLeft=${paddingLeft}`);

  return (
    <div className="my-1">
      <div
        className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
        style={{ paddingLeft }}
        onClick={() => {
          console.log(`TreeNode ${node.id}: Clicked, calling onToggle.`);
          onToggle(node.id);
        }}
      >
        {node.children.length > 0 && (
          <button
            className="mr-2 text-gray-500 hover:text-gray-700"
            aria-label={node.isExpanded ? 'Collapse' : 'Expand'}
            onClick={(e) => {
              // Prevent toggle when clicking the button itself if needed
              e.stopPropagation();
              console.log(`TreeNode ${node.id}: Expand/collapse button clicked.`);
              onToggle(node.id);
            }}
          >
            {node.isExpanded ? '▼' : '▶'}
          </button>
        )}
        <div className="flex-1">
          <div className="font-medium">{node.name}</div>
          <div className="text-sm text-gray-500">
            {getMarkerExpressionString(node.markers)}
          </div>
        </div>
      </div>
      {node.isExpanded && node.children.length > 0 && (
        <div className="ml-4">
          {/* Log before mapping children */}
          {(() => {
            console.log(`TreeNode ${node.id}: Rendering children.`);
            return null; // Return null so it doesn't affect rendering
          })()}
          {node.children.map((child) => {
            console.log(`TreeNode ${node.id}: Mapping child ${child.id}`);
            return (
              <TreeNode
                key={child.id}
                node={child}
                level={level + 1}
                onToggle={onToggle}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}; 