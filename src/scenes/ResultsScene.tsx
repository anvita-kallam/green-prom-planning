import React from 'react';
import { useGame } from '../contexts/GameContext';
import { GAME_PHASES } from '../data/gameData';

export const ResultsScene: React.FC = () => {
  const { gameState, getGameResult, resetGame } = useGame();
  const result = getGameResult();

  const getCarbonRating = (carbonFootprint: number) => {
    if (carbonFootprint <= 20) return { rating: 'A+', color: 'text-green-600', bg: 'bg-green-100' };
    if (carbonFootprint <= 40) return { rating: 'A', color: 'text-green-600', bg: 'bg-green-100' };
    if (carbonFootprint <= 60) return { rating: 'B', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (carbonFootprint <= 80) return { rating: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { rating: 'D', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const carbonRating = getCarbonRating(result.totalCarbonFootprint);

  return (
    <div className="min-h-screen bg-trees p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🎉 Your Green Prom Results!
            </h1>
            <p className="text-xl text-gray-600">
              Here's how your choices impacted the environment
            </p>
          </div>

          {/* Overall Score */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-6 mb-8 text-white text-center">
            <div className="text-6xl font-bold mb-2">
              {carbonRating.rating}
            </div>
            <div className="text-xl">
              Environmental Impact Grade
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {result.totalCarbonFootprint}
              </div>
              <div className="text-sm text-gray-600">kg CO₂ Total</div>
              <div className="text-xs text-gray-500 mt-1">
                vs {result.averageStudentCarbonFootprint} kg average
              </div>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {result.totalPopularityScore}
              </div>
              <div className="text-sm text-gray-600">Popularity Points</div>
              <div className="text-xs text-gray-500 mt-1">
                out of 40 possible
              </div>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                ${result.totalCost}
              </div>
              <div className="text-sm text-gray-600">Total Spent</div>
              <div className="text-xs text-gray-500 mt-1">
                out of $500 budget
              </div>
            </div>
          </div>

          {/* Reflection Message */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              🌱 Your Impact
            </h2>
            <p className="text-lg text-blue-700 leading-relaxed">
              {result.reflectionMessage}
            </p>
          </div>

          {/* Choice Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              📋 Your Choices Summary
            </h2>
            <div className="space-y-4">
              {GAME_PHASES.map((phase) => {
                const choice = gameState.choices[phase.id];
                if (!choice) return null;
                
                return (
                  <div key={phase.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800">{phase.title}</h3>
                        <p className="text-gray-600">{choice.title}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-red-600 font-semibold">
                          +{choice.carbonFootprint} kg CO₂
                        </div>
                        <div className="text-sm text-purple-600">
                          +{choice.popularityScore} points
                        </div>
                        <div className="text-sm text-gray-600">
                          -${choice.cost}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Environmental Impact Comparison */}
          <div className="bg-green-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">
              🌍 Environmental Impact Comparison
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-red-600 mb-2">
                  {result.averageStudentCarbonFootprint}
                </div>
                <div className="text-sm text-gray-600">Average Student</div>
                <div className="text-xs text-gray-500">kg CO₂ per prom</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {result.totalCarbonFootprint}
                </div>
                <div className="text-sm text-gray-600">Your Prom</div>
                <div className="text-xs text-gray-500">kg CO₂ total</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="text-lg font-semibold text-green-700">
                {result.percentageReduction >= 0 ? 'You saved' : 'You used'} {Math.abs(Math.round(result.percentageReduction))}% {result.percentageReduction >= 0 ? 'less' : 'more'} CO₂ than average!
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetGame}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Play Again! 🌱
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Share your results and encourage friends to make sustainable choices!</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 