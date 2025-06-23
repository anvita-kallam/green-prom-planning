import React from 'react';
import { GameProvider, useGame } from './contexts/GameContext';
import { WelcomeScene } from './scenes/WelcomeScene';
import { ChoiceScene } from './scenes/ChoiceScene';
import { ResultsScene } from './scenes/ResultsScene';
import AskTheEarthTutor from './components/AskTheEarthTutor';
import './App.css';

function GameApp() {
  const { gameState, isGameComplete } = useGame();

  // Show welcome screen only if the game hasn't been started yet
  if (!gameState.hasStarted) {
    return <WelcomeScene />;
  }

  // Show results if game is complete
  if (isGameComplete()) {
    return <ResultsScene />;
  }

  // Show current choice phase
  return <ChoiceScene />;
}

function App() {
  return (
    <div className="bg-trees min-h-screen">
      <GameProvider>
        <div className="App">
          <GameApp />
          <AskTheEarthTutor />
        </div>
      </GameProvider>
    </div>
  );
}

export default App;
