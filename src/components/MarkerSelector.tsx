import React from 'react';
import { MarkerSelectorProps } from '../types/types';

export const MarkerSelector: React.FC<MarkerSelectorProps> = ({
  markers,
  selectedMarkers,
  onMarkerToggle,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Markers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {markers.map((marker) => {
          return (
            <div
              key={marker.id}
              className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded"
            >
              <input
                type="checkbox"
                id={`marker-${marker.id}`}
                checked={selectedMarkers.has(marker.id)}
                onChange={() => onMarkerToggle(marker.id)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label
                htmlFor={`marker-${marker.id}`}
                className="flex flex-col cursor-pointer"
              >
                <span className="font-medium">{marker.name}</span>
                <span className="text-sm text-gray-500">{marker.fluorochrome}</span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 