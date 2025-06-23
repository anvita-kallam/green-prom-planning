import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { ChoiceCard } from '../components/ChoiceCard';
import { GameStats } from '../components/GameStats';
import { Choice } from '../types/game';

export const ChoiceScene: React.FC = () => {
  const { gameState, makeChoice, getCurrentPhase } = useGame();
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentPhase = getCurrentPhase();

  if (!currentPhase) {
    return <div>Loading...</div>;
  }

  const handleChoiceSelect = (choice: Choice) => {
    setSelectedChoice(choice);
    setShowFeedback(true);
  };

  const handleConfirmChoice = () => {
    if (selectedChoice) {
      makeChoice(currentPhase.id, selectedChoice);
      setSelectedChoice(null);
      setShowFeedback(false);
    }
  };

  const handleBackToChoices = () => {
    setSelectedChoice(null);
    setShowFeedback(false);
  };

  if (showFeedback && selectedChoice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <GameStats />
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {currentPhase.title}
              </h1>
              <div className="w-16 h-1 bg-green-500 mx-auto rounded"></div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                🌱 Environmental Impact
              </h2>
              <p className="text-lg text-blue-700 leading-relaxed">
                {selectedChoice.environmentalImpact}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  +{selectedChoice.carbonFootprint}
                </div>
                <div className="text-sm text-gray-600">kg CO₂ added</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  +{selectedChoice.popularityScore}
                </div>
                <div className="text-sm text-gray-600">popularity points</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  -${selectedChoice.cost}
                </div>
                <div className="text-sm text-gray-600">from budget</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBackToChoices}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                ← Back to Choices
              </button>
              <button
                onClick={handleConfirmChoice}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Confirm Choice →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <GameStats />
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {currentPhase.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {currentPhase.prompt}
            </p>
            <div className="w-16 h-1 bg-green-500 mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPhase.choices.map((choice) => (
              <ChoiceCard
                key={choice.id}
                choice={choice}
                onSelect={handleChoiceSelect}
                isSelected={selectedChoice?.id === choice.id}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Click on a choice to see its environmental impact and confirm your decision.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 