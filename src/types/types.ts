export interface Marker {
  id: number;
  name: string;
  fluorochrome: string;
  isSelected: boolean;
}

export interface MarkerExpression {
  markerId: number;
  expression: 'positive' | 'negative';
}

export interface TreeNode {
  id: string;
  name: string;
  markers: MarkerExpression[];
  children: TreeNode[];
  isExpanded?: boolean;
  isVisible?: boolean;
}

export interface TreeState {
  nodes: TreeNode[];
  selectedMarkers: Set<number>;
}

export interface MarkerSelectorProps {
  markers: Marker[];
  selectedMarkers: Set<number>;
  onMarkerToggle: (markerId: number) => void;
}

export interface TreeNodeProps {
  node: TreeNode;
  level: number;
  onToggle: (nodeId: string) => void;
} 