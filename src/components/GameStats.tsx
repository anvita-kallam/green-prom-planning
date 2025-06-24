import React from 'react';
import { useGame } from '../contexts/GameContext';

interface GameStatsProps {
  showUndo?: boolean;
}

export const GameStats: React.FC<GameStatsProps> = ({ showUndo = true }) => {
  const { gameState, undoChoice, canUndo } = useGame();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Your Prom Stats</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600 mb-1">
            {gameState.carbonFootprint}
          </div>
          <div className="text-sm text-gray-600">kg CO₂</div>
          <div className="text-xs text-gray-500 mt-1">Carbon Footprint</div>
        </div>
        
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {gameState.popularityScore}
          </div>
          <div className="text-sm text-gray-600">/40</div>
          <div className="text-xs text-gray-500 mt-1">Popularity Score</div>
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600 mb-1">
            ${gameState.budgetRemaining}
          </div>
          <div className="text-sm text-gray-600">remaining</div>
          <div className="text-xs text-gray-500 mt-1">Budget</div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Progress:</span>
          <span className="font-semibold text-gray-800">
            {gameState.completedPhases.length} of 4 phases completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(gameState.completedPhases.length / 4) * 100}%` }}
          ></div>
        </div>
        {/* Undo Button */}
        {showUndo && canUndo() && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={undoChoice}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm font-medium"
              title="Undo your last choice"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
              Undo Last Choice
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; 