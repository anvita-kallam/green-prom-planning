# 🌱 Prompact: A Climate Decision Game

An educational React.js game that teaches elementary through high school students about environmental impact through interactive prom planning decisions.

## 🎯 About

Prompact is a single-page application (SPA) that guides players through planning their prom night while learning about the environmental consequences of their choices. Each decision affects:

- **Carbon Footprint** – Environmental impact in kg of CO₂
- **Popularity Score** – Social appeal of choices (1–10 scale)
- **Budget** – Cost management ($500 starting budget)

It also features a GPT-powered **Ask the Earth** tutor that uses a Retrieval-Augmented Generation (RAG) system to answer player questions with real climate facts relevant to prom decisions.

[🌿 Play Prompact](https://green-prom-planning.vercel.app/)

---

## 🚀 Features

### Game Phases
1. **Clothing Selection** – Choose between new, thrifted, or borrowed outfits
2. **Transportation** – Select from limo, carpool, or public transit
3. **Food & Venue** – Pick dining options from fancy restaurants to home cooking
4. **Accessories** – Choose jewelry and accessories with sustainability in mind

### Educational Elements
- Real-time environmental impact feedback after each choice
- Detailed explanations of carbon footprint calculations
- Comparison with average student impact
- Final results with sustainability grade and reflection
- **Ask the Earth GPT Tutor** – In-game AI assistant that answers climate-related questions using a custom RAG pipeline

### Technical Features
- React functional components with Hooks
- TypeScript for type safety
- Tailwind CSS for modern, responsive styling
- Context API for state management
- GPT-4 compatible “Ask the Earth” component with:
  - Embedded climate facts (`climateFacts.json`)
  - RAG-based fact injection into system prompts
  - Mock GPT response handler for local dev/testing
- Modular, expandable architecture

---

## 🎮 How to Play

1. **Start the Game** - Click "Start Planning My Green Prom!" on the welcome screen
2. **Make Choices** - For each phase, click on a choice to see its environmental impact
3. **Learn** - Read the educational message about your choice's environmental consequences
4. **Confirm** - Click "Confirm Choice" to proceed to the next phase
5. **See Results** - View your final environmental impact grade and comparison with average students

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ChoiceCard.tsx   # Individual choice display
│   └── GameStats.tsx    # Progress and stats display
├── contexts/            # React context providers
│   └── GameContext.tsx  # Game state management
├── data/                # Game data and configuration
│   └── gameData.ts      # Phases, choices, and constants
├── scenes/              # Main game screens
│   ├── WelcomeScene.tsx # Introduction screen
│   ├── ChoiceScene.tsx  # Decision-making interface
│   └── ResultsScene.tsx # Final results display
├── types/               # TypeScript type definitions
│   └── game.ts          # Game-related interfaces
└── App.tsx              # Main application component
```


