import React from 'react';
import { Choice } from '../types/game';

interface ChoiceCardProps {
  choice: Choice;
  onSelect: (choice: Choice) => void;
  isSelected?: boolean;
}

export const ChoiceCard: React.FC<ChoiceCardProps> = ({ choice, onSelect, isSelected = false }) => {
  const getCarbonColor = (carbonFootprint: number) => {
    if (carbonFootprint <= 5) return 'text-green-600';
    if (carbonFootprint <= 15) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPopularityColor = (popularityScore: number) => {
    if (popularityScore >= 8) return 'text-purple-600';
    if (popularityScore >= 6) return 'text-blue-600';
    return 'text-gray-600';
  };

  return (
    <div
      className={`
        relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg
        ${isSelected 
          ? 'border-green-500 bg-green-50 shadow-md' 
          : 'border-gray-200 bg-white hover:border-gray-300'
        }
      `}
      onClick={() => onSelect(choice)}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">✓</span>
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{choice.title}</h3>
      <p className="text-gray-600 mb-4">{choice.description}</p>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Carbon Footprint:</span>
          <span className={`font-semibold ${getCarbonColor(choice.carbonFootprint)}`}>
            {choice.carbonFootprint} kg CO₂
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Popularity:</span>
          <span className={`font-semibold ${getPopularityColor(choice.popularityScore)}`}>
            {choice.popularityScore}/10
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Cost:</span>
          <span className="font-semibold text-gray-800">
            ${choice.cost}
          </span>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Environmental Impact:</strong> {choice.environmentalImpact}
        </p>
      </div>
    </div>
  );
}; 