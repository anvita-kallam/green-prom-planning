export interface Choice {
  id: string;
  title: string;
  description: string;
  carbonFootprint: number;
  popularityScore: number;
  cost: number;
  environmentalImpact: string;
}

export interface GamePhase {
  id: string;
  title: string;
  prompt: string;
  choices: Choice[];
}

export interface GameState {
  currentPhase: string;
  carbonFootprint: number;
  popularityScore: number;
  budgetRemaining: number;
  choices: Record<string, Choice>;
  completedPhases: string[];
  hasStarted: boolean;
}

export interface GameResult {
  totalCarbonFootprint: number;
  totalPopularityScore: number;
  totalCost: number;
  averageStudentCarbonFootprint: number;
  percentageReduction: number;
  reflectionMessage: string;
} 