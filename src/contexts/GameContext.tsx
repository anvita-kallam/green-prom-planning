import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, Choice, GameResult } from '../types/game';
import { GAME_PHASES, INITIAL_BUDGET, AVERAGE_STUDENT_CARBON_FOOTPRINT } from '../data/gameData';

interface GameContextType {
  gameState: GameState;
  makeChoice: (phaseId: string, choice: Choice) => void;
  undoChoice: () => void;
  resetGame: () => void;
  startGame: () => void;
  getCurrentPhase: () => typeof GAME_PHASES[0] | null;
  getGameResult: () => GameResult;
  isGameComplete: () => boolean;
  canUndo: () => boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

type GameAction = 
  | { type: 'MAKE_CHOICE'; payload: { phaseId: string; choice: Choice } }
  | { type: 'UNDO_CHOICE' }
  | { type: 'RESET_GAME' }
  | { type: 'START_GAME' };

// Extended state to include history
interface ExtendedGameState extends GameState {
  history: GameState[];
}

const initialState: ExtendedGameState = {
  currentPhase: GAME_PHASES[0].id,
  carbonFootprint: 0,
  popularityScore: 0,
  budgetRemaining: INITIAL_BUDGET,
  choices: {},
  completedPhases: [],
  hasStarted: false,
  history: []
};

function gameReducer(state: ExtendedGameState, action: GameAction): ExtendedGameState {
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
      
      const newState: GameState = {
        currentPhase: nextPhase ? nextPhase.id : 'results',
        carbonFootprint: newCarbonFootprint,
        popularityScore: newPopularityScore,
        budgetRemaining: newBudgetRemaining,
        choices: newChoices,
        completedPhases: newCompletedPhases,
        hasStarted: state.hasStarted
      };
      
      return {
        ...newState,
        history: [...state.history, {
          currentPhase: state.currentPhase,
          carbonFootprint: state.carbonFootprint,
          popularityScore: state.popularityScore,
          budgetRemaining: state.budgetRemaining,
          choices: state.choices,
          completedPhases: state.completedPhases,
          hasStarted: state.hasStarted
        }]
      };
    }
    case 'UNDO_CHOICE': {
      if (state.history.length === 0) {
        return state;
      }
      
      const previousState = state.history[state.history.length - 1];
      const newHistory = state.history.slice(0, -1);
      
      return {
        ...previousState,
        history: newHistory
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

  const undoChoice = () => {
    dispatch({ type: 'UNDO_CHOICE' });
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

  const canUndo = () => {
    return gameState.history.length > 0 && gameState.completedPhases.length > 0;
  };

  const getGameResult = (): GameResult => {
    const totalCost = INITIAL_BUDGET - gameState.budgetRemaining;
    const percentageReduction = ((AVERAGE_STUDENT_CARBON_FOOTPRINT - gameState.carbonFootprint) / AVERAGE_STUDENT_CARBON_FOOTPRINT) * 100;
    
    let reflectionMessage = '';
    if (percentageReduction >= 50) {
      reflectionMessage = `Amazing! You made incredibly thoughtful decisions and reduced your prom's impact by ${Math.round(percentageReduction)}% compared to the average student! You're a sustainability champion!`;
    } else if (percentageReduction >= 25) {
      reflectionMessage = `Great job! You made thoughtful decisions and reduced your prom's impact by ${Math.round(percentageReduction)}% compared to the average student. Remember that every choice matters!`;
    } else if (percentageReduction >= 0) {
      reflectionMessage = `Good effort! You reduced your prom's impact by ${Math.round(percentageReduction)}% compared to the average student. There's always room to improve!`;
    } else {
      reflectionMessage = `Your prom choices had a higher environmental impact than average. Consider more sustainable options next time, since every small change helps!`;
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
    undoChoice,
    resetGame,
    startGame,
    getCurrentPhase,
    getGameResult,
    isGameComplete,
    canUndo
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