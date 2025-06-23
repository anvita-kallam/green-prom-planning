import React, { useState, useRef, useEffect } from 'react';
import climateFacts from '../data/climateFacts.json';
import { useGame } from '../contexts/GameContext';

interface Message {
  sender: 'user' | 'tutor';
  text: string;
  followUpQuestions?: string[];
}

const EXAMPLES = [
  'What is the carbon footprint of a limousine?',
  'Why is synthetic glitter harmful to the environment?',
  'How can I reduce food waste at prom?',
  'What are sustainable prom dress options?',
  'How can I make prom decorations eco-friendly?'
];

// Follow-up questions for different topics
const FOLLOW_UP_QUESTIONS = {
  'limousine': [
    'What are some green transportation options for prom?',
    'How can I encourage carpooling to prom?',
    'Is public transportation a good option for prom?'
  ],
  'glitter': [
    'What are some alternatives to balloons for prom decor?',
    'How can I make prom decorations eco-friendly?',
    'What should I do with leftover prom decorations?'
  ],
  'food waste': [
    'How can I make the prom menu more sustainable?',
    'What are the benefits of a plant-based prom menu?',
    'How can I encourage recycling at prom?'
  ],
  'dress': [
    'Is it better to rent or buy prom attire?',
    'What is the environmental impact of fast fashion for prom?',
    'How can I make prom invitations eco-friendly?'
  ],
  'decorations': [
    'What should I do with leftover prom decorations?',
    'How can I reduce energy use at prom?',
    'Are there eco-friendly options for prom party favors?'
  ],
  'transportation': [
    'What is the carbon footprint of a limousine?',
    'How can I make prom more inclusive and accessible?',
    'How can I reduce energy use at prom?'
  ],
  'menu': [
    'How can I reduce food waste at prom?',
    'What are the benefits of a plant-based prom menu?',
    'How can I encourage recycling at prom?'
  ],
  'plastic': [
    'What is the impact of single-use plastics at prom?',
    'How can I encourage recycling at prom?',
    'Are there eco-friendly options for prom party favors?'
  ],
  'energy': [
    'How can I make prom decorations eco-friendly?',
    'What are some alternatives to balloons for prom decor?',
    'How can I make prom tickets more sustainable?'
  ],
  'default': [
    'What are some green transportation options for prom?',
    'How can I make prom decorations eco-friendly?',
    'What are sustainable prom dress options?'
  ]
};

function retrieveFact(question: string): string | null {
  const stopwords = new Set([
    'what', 'is', 'the', 'of', 'a', 'an', 'how', 'can', 'i', 'at', 'to', 'for', 'and', 'in', 'on', 'why', 'are', 'do', 'does', 'about', 'with', 'by', 'from', 'it', 'you', 'your', 'my', 'we', 'our', 'be', 'as', 'that', 'this', 'or', 'any', 'options', 'make', 'help', 'me', 'prom'
  ]);
  function keywords(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .split(' ')
      .filter(word => word && !stopwords.has(word));
  }
  const userKeywords = keywords(question);
  let bestMatch: { answer: string; score: number } | null = null;
  for (const fact of climateFacts as { question: string; answer: string }[]) {
    const factKeywords = keywords(fact.question);
    const overlap = userKeywords.filter(word => factKeywords.includes(word));
    const score = overlap.length;
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { answer: fact.answer, score };
    }
  }
  return bestMatch ? bestMatch.answer : null;
}

function getFollowUpQuestions(question: string): string[] {
  const lowerQ = question.toLowerCase();
  let followUps: string[] = [];
  
  if (lowerQ.includes('limousine') || lowerQ.includes('car') || lowerQ.includes('transport')) {
    followUps = FOLLOW_UP_QUESTIONS.transportation;
  } else if (lowerQ.includes('glitter') || lowerQ.includes('decor')) {
    followUps = FOLLOW_UP_QUESTIONS.glitter;
  } else if (lowerQ.includes('food') || lowerQ.includes('waste') || lowerQ.includes('menu')) {
    followUps = FOLLOW_UP_QUESTIONS['food waste'];
  } else if (lowerQ.includes('dress') || lowerQ.includes('attire') || lowerQ.includes('fashion')) {
    followUps = FOLLOW_UP_QUESTIONS.dress;
  } else if (lowerQ.includes('plastic') || lowerQ.includes('single-use')) {
    followUps = FOLLOW_UP_QUESTIONS.plastic;
  } else if (lowerQ.includes('energy') || lowerQ.includes('light')) {
    followUps = FOLLOW_UP_QUESTIONS.energy;
  } else {
    followUps = FOLLOW_UP_QUESTIONS.default;
  }
  
  // Filter out the current question from follow-ups
  return followUps.filter(followUp => 
    followUp.toLowerCase() !== question.toLowerCase()
  );
}

export const AskTheEarthTutor: React.FC = () => {
  const { gameState } = useGame();
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'tutor', text: 'Hi! I\'m your Earth Tutor 🌎. Ask me anything about climate-friendly prom planning!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (open) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  // Don't render if game hasn't started
  if (!gameState.hasStarted) {
    return null;
  }

  const handleExample = (example: string) => {
    setInput(example);
  };

  const handleFollowUp = (question: string) => {
    setInput(question);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    const question = input.trim();
    setMessages(msgs => [...msgs, { sender: 'user', text: question }]);
    setInput('');
    setLoading(true);
    const ragFact = retrieveFact(question);
    const answer = ragFact || "I'm not sure, but that's a great question! Try rephrasing or ask about another prom sustainability topic.";
    const followUpQuestions = getFollowUpQuestions(question);
    setMessages(msgs => [...msgs, { sender: 'tutor', text: answer, followUpQuestions }]);
    setLoading(false);
  };

  if (!open) {
    return (
      <button
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-3 rounded-full shadow-lg flex items-center gap-2 transition"
        onClick={() => setOpen(true)}
        aria-label="Open Ask the Earth chat"
      >
        <span className="text-2xl">🌱</span>
        <span className="hidden sm:inline">Ask the Earth</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 max-w-full bg-white shadow-2xl rounded-2xl border border-green-200 flex flex-col h-[32rem] animate-fade-in">
      <div className="flex items-center gap-2 px-4 py-3 bg-green-100 rounded-t-2xl border-b border-green-200 relative">
        <span className="text-2xl">🌱</span>
        <span className="font-bold text-green-800 text-lg">Ask the Earth</span>
        <button
          className="absolute right-2 top-2 text-green-700 hover:text-green-900 p-1 rounded transition"
          onClick={() => setOpen(false)}
          aria-label="Minimize chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-green-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-3 py-2 rounded-xl max-w-[80%] text-sm ${msg.sender === 'user' ? 'bg-green-200 text-green-900' : 'bg-white text-green-800 border border-green-200'}`}>
              {msg.text}
              {msg.followUpQuestions && (
                <div className="mt-2 space-y-1">
                  <div className="text-xs text-green-600 font-medium">Follow-up questions:</div>
                  {msg.followUpQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      className="block text-xs text-green-700 hover:text-green-900 hover:bg-green-50 px-2 py-1 rounded transition text-left w-full"
                      onClick={() => handleFollowUp(q)}
                      disabled={loading}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="px-4 py-2 border-t border-green-200 bg-white">
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            className="flex-1 rounded-lg border border-green-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-900 bg-green-50"
            placeholder="Ask a climate question..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading}
            aria-label="Ask a climate question"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg transition"
            disabled={loading}
          >
            {loading ? '...' : 'Ask'}
          </button>
        </form>
        <div className="mt-2 flex flex-wrap gap-2">
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              className="text-xs bg-green-100 hover:bg-green-200 text-green-800 px-2 py-1 rounded transition border border-green-200"
              onClick={() => handleExample(ex)}
              type="button"
              disabled={loading}
            >
              {ex}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AskTheEarthTutor;