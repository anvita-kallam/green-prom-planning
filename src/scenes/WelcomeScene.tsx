import React from 'react';
import { useGame } from '../contexts/GameContext';

export const WelcomeScene: React.FC = () => {
  const { startGame } = useGame();

  const handleStartGame = () => {
    // Start game function - no console.log
    startGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              🌱 Green Prom Planner
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Plan your perfect prom while learning about environmental impact!
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="bg-green-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-green-800 mb-3">
                What You'll Learn
              </h2>
              <ul className="text-left space-y-2 text-green-700">
                <li className="flex items-center">
                  <span className="mr-2">🌿</span>
                  How your clothing choices affect the environment
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🚗</span>
                  The carbon footprint of different transportation options
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🍽️</span>
                  Sustainable dining and venue choices
                </li>
                <li className="flex items-center">
                  <span className="mr-2">💎</span>
                  Eco-friendly accessory alternatives
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Your Mission
              </h3>
              <p className="text-blue-700">
                Make thoughtful decisions to create an amazing prom experience while minimizing your environmental impact. 
                You'll see how each choice affects your carbon footprint, popularity score, and budget!
              </p>
            </div>
          </div>

          {/* Main start button */}
          <button
            onClick={handleStartGame}
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '16px 32px',
              border: 'none',
              borderRadius: '25px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              margin: '10px'
            }}
          >
            Start Planning My Green Prom! 🌟
          </button>

          <div className="mt-6 text-sm text-gray-500">
            <p>Budget: $500 | Goal: Minimize carbon footprint while having fun!</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 