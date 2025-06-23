import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, Choice, GameResult } from '../types/game';
import { GAME_PHASES, INITIAL_BUDGET, AVERAGE_STUDENT_CARBON_FOOTPRINT } from '../data/gameData';

interface GameContextType {
  gameState: GameState;
  makeChoice: (phaseId: string, choice: Choice) => void;
  resetGame: () => void;
  startGame: () => void;
  getCurrentPhase: () => typeof GAME_PHASES[0] | null;
  getGameResult: () => GameResult;
  isGameComplete: () => boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

type GameAction = 
  | { type: 'MAKE_CHOICE'; payload: { phaseId: string; choice: Choice } }
  | { type: 'RESET_GAME' }
  | { type: 'START_GAME' };

const initialState: GameState = {
  currentPhase: GAME_PHASES[0].id,
  carbonFootprint: 0,
  popularityScore: 0,
  budgetRemaining: INITIAL_BUDGET,
  choices: {},
  completedPhases: [],
  hasStarted: false
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'MAKE_CHOICE': {
      const { phaseId, choice } = action.payload;
      const newChoices = { ...state.choices, [phaseId]: choice };
      const newCarbonFootprint = state.carbonFootprint + choice.carbonFootprint;
      const newPopularityScore = state.popularityScore + choice.popularityScore;
      const newBudgetRemaining = state.budgetRemaining - choice.cost;
      const newCompletedPhases = [...state.completedPhases, phaseId];
      
      // Find next phase
      const currentPhaseIndex = GAME_PHASES.findIndex(phase => phase.id === phaseId);
      const nextPhase = GAME_PHASES[currentPhaseIndex + 1];
      
      return {
        ...state,
        currentPhase: nextPhase ? nextPhase.id : 'results',
        carbonFootprint: newCarbonFootprint,
        popularityScore: newPopularityScore,
        budgetRemaining: newBudgetRemaining,
        choices: newChoices,
        completedPhases: newCompletedPhases
      };
    }
    case 'START_GAME':
      return {
        ...initialState,
        hasStarted: true
      };
    case 'RESET_GAME':
      const newState = {
        ...initialState,
        choices: {},
        completedPhases: [],
        hasStarted: true
      };
      return newState;
    default:
      return state;
  }
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  const makeChoice = (phaseId: string, choice: Choice) => {
    dispatch({ type: 'MAKE_CHOICE', payload: { phaseId, choice } });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  const startGame = () => {
    dispatch({ type: 'START_GAME' });
  };

  const getCurrentPhase = () => {
    return GAME_PHASES.find(phase => phase.id === gameState.currentPhase) || null;
  };

  const isGameComplete = () => {
    return gameState.completedPhases.length === GAME_PHASES.length;
  };

  const getGameResult = (): GameResult => {
    const totalCost = INITIAL_BUDGET - gameState.budgetRemaining;
    const percentageReduction = ((AVERAGE_STUDENT_CARBON_FOOTPRINT - gameState.carbonFootprint) / AVERAGE_STUDENT_CARBON_FOOTPRINT) * 100;
    
    let reflectionMessage = '';
    if (percentageReduction >= 50) {
      reflectionMessage = `Amazing! You made incredibly thoughtful decisions and reduced your prom's impact by ${Math.round(percentageReduction)}% compared to the average student! You're a sustainability champion!`;
    } else if (percentageReduction >= 25) {
      reflectionMessage = `Great job! You made thoughtful decisions and reduced your prom's impact by ${Math.round(percentageReduction)}% compared to the average student. Every choice matters!`;
    } else if (percentageReduction >= 0) {
      reflectionMessage = `Good effort! You reduced your prom's impact by ${Math.round(percentageReduction)}% compared to the average student. There's always room to improve!`;
    } else {
      reflectionMessage = `Your prom choices had a higher environmental impact than average. Consider more sustainable options next time - every small change helps!`;
    }

    return {
      totalCarbonFootprint: gameState.carbonFootprint,
      totalPopularityScore: gameState.popularityScore,
      totalCost,
      averageStudentCarbonFootprint: AVERAGE_STUDENT_CARBON_FOOTPRINT,
      percentageReduction,
      reflectionMessage
    };
  };

  const value: GameContextType = {
    gameState,
    makeChoice,
    resetGame,
    startGame,
    getCurrentPhase,
    getGameResult,
    isGameComplete
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
} 