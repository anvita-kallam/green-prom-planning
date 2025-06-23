import { GamePhase } from '../types/game';

export const GAME_PHASES: GamePhase[] = [
  {
    id: 'clothing',
    title: 'What will you wear to prom?',
    prompt: 'Choose your prom outfit and discover its environmental impact!',
    choices: [
      {
        id: 'new-synthetic-dress',
        title: 'Buy a new synthetic dress',
        description: 'A beautiful new dress from a fast fashion store',
        carbonFootprint: 32,
        popularityScore: 8,
        cost: 150,
        environmentalImpact: 'Synthetic fabrics like polyester are made from petroleum and release microplastics when washed. This choice contributes to 32 kg of CO₂ emissions.'
      },
      {
        id: 'thrifted-dress',
        title: 'Find a dress at a thrift store',
        description: 'A unique vintage dress with character',
        carbonFootprint: 2,
        popularityScore: 7,
        cost: 25,
        environmentalImpact: 'Thrifting extends the life of existing clothing, reducing waste and the need for new production. This choice saves 30 kg of CO₂ compared to buying new!'
      },
      {
        id: 'borrow-dress',
        title: 'Borrow from a friend or family',
        description: 'Wear a dress that\'s been worn before',
        carbonFootprint: 0,
        popularityScore: 6,
        cost: 0,
        environmentalImpact: 'Borrowing creates zero new emissions and strengthens community bonds. This is the most sustainable choice!'
      }
    ]
  },
  {
    id: 'transportation',
    title: 'How will you get to prom?',
    prompt: 'Select your transportation method and learn about its carbon footprint!',
    choices: [
      {
        id: 'limo',
        title: 'Rent a limousine',
        description: 'Arrive in style with a luxury limo',
        carbonFootprint: 45,
        popularityScore: 9,
        cost: 300,
        environmentalImpact: 'Limos are gas-guzzling vehicles that emit 45 kg of CO₂ for a typical prom night. While stylish, they have the highest environmental impact.'
      },
      {
        id: 'car-pool',
        title: 'Carpool with friends',
        description: 'Share a ride with your prom group',
        carbonFootprint: 8,
        popularityScore: 7,
        cost: 15,
        environmentalImpact: 'Carpooling reduces emissions per person by sharing the ride. This choice cuts emissions by 82% compared to individual cars!'
      },
      {
        id: 'public-transit',
        title: 'Take public transportation',
        description: 'Use buses or trains to get there',
        carbonFootprint: 3,
        popularityScore: 5,
        cost: 5,
        environmentalImpact: 'Public transportation is one of the most efficient ways to travel. This choice reduces emissions by 93% compared to driving alone!'
      }
    ]
  },
  {
    id: 'food-venue',
    title: 'Where will you celebrate?',
    prompt: 'Choose your prom venue and dining options!',
    choices: [
      {
        id: 'fancy-restaurant',
        title: 'Fancy restaurant with imported food',
        description: 'Elegant dining with premium ingredients',
        carbonFootprint: 28,
        popularityScore: 8,
        cost: 200,
        environmentalImpact: 'Imported ingredients and luxury dining have high carbon footprints due to transportation and food waste. This choice adds 28 kg of CO₂.'
      },
      {
        id: 'local-restaurant',
        title: 'Local restaurant with seasonal menu',
        description: 'Support local businesses with fresh ingredients',
        carbonFootprint: 12,
        popularityScore: 7,
        cost: 120,
        environmentalImpact: 'Local and seasonal food reduces transportation emissions and supports sustainable farming. This choice cuts emissions by 57%!'
      },
      {
        id: 'home-catering',
        title: 'Home-cooked meal with friends',
        description: 'Prepare a special meal together',
        carbonFootprint: 6,
        popularityScore: 6,
        cost: 40,
        environmentalImpact: 'Home cooking with local ingredients minimizes waste and transportation. This is the most sustainable dining choice!'
      }
    ]
  },
  {
    id: 'accessories',
    title: 'What accessories will you choose?',
    prompt: 'Complete your look with sustainable accessories!',
    choices: [
      {
        id: 'new-jewelry',
        title: 'Buy new jewelry and accessories',
        description: 'Sparkling new jewelry to match your outfit',
        carbonFootprint: 18,
        popularityScore: 8,
        cost: 100,
        environmentalImpact: 'New jewelry production involves mining, processing, and transportation. This choice contributes 18 kg of CO₂ emissions.'
      },
      {
        id: 'borrowed-accessories',
        title: 'Borrow jewelry from family',
        description: 'Wear meaningful family heirlooms',
        carbonFootprint: 0,
        popularityScore: 9,
        cost: 0,
        environmentalImpact: 'Family jewelry has sentimental value and zero new emissions. This choice creates beautiful memories without environmental cost!'
      },
      {
        id: 'thrifted-accessories',
        title: 'Find accessories at thrift stores',
        description: 'Unique vintage pieces with character',
        carbonFootprint: 1,
        popularityScore: 7,
        cost: 20,
        environmentalImpact: 'Thrifted accessories give new life to existing items. This choice reduces waste and saves 17 kg of CO₂!'
      }
    ]
  }
];

export const INITIAL_BUDGET = 500;
export const AVERAGE_STUDENT_CARBON_FOOTPRINT = 120; // kg CO2 for a typical prom night 