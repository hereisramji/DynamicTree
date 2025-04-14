import React from 'react';

interface TruncatedInfoPanelProps {
  onClose: () => void;
}

export const TruncatedInfoPanel: React.FC<TruncatedInfoPanelProps> = ({ onClose }) => {
  return (
    <div className="p-4 mb-4 bg-yellow-100 border border-yellow-300 rounded-lg relative">
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 text-yellow-700 hover:text-yellow-900 text-2xl font-bold"
        aria-label="Close simulation info"
      >
        &times; 
      </button>
      <h3 className="text-lg font-semibold text-yellow-800 mb-2">Truncated Panel Simulation Active</h3>
      <p className="text-yellow-700">
        If you used a truncated panel, this is what your lineage tree would look like.
      </p>
      <p className="text-yellow-700 mt-1">
        With this limited panel, findings dependent on excluded markers like <strong className="font-semibold">CD57</strong> and <strong className="font-semibold">EOMES</strong> would be missed. You couldn't make the observation that melanoma patient γδT cells show increased expression of CD57 and EOMES.
      </p>
    </div>
  );
}; 