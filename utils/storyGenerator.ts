interface StoryPrompt {
  universe: string;
  character: string;
  age: number;
  educationalFocus?: string;
}

interface StorySegment {
  content: string;
  choices?: StoryChoice[];
  quiz?: QuizQuestion;
}

interface StoryChoice {
  text: string;
  nextPrompt: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const generateStorySegment = async (prompt: StoryPrompt, context: string = ''): Promise<StorySegment> => {  const systemPrompt = `Tu es un conteur pour enfants spécialisé dans la création d'histoires éducatives interactives.
Crée, en t'appuyant sur les principes de LangChain pour une logique chain-of-thought, une histoire cohérente dans l'univers "${prompt.universe}" pour un enfant de ${prompt.age} ans.
Le personnage principal est "${prompt.character}" et le focus éducatif est "${prompt.educationalFocus || 'général'}".
${context ? `Context précédent: ${context}` : ''}
Fournis ta réponse sous forme d'un objet JSON respectant le format suivant :
{
  "content": "Le segment d'histoire",
  "choices": [
    {"text": "Option 1", "nextPrompt": "Description pour la suite"},
    {"text": "Option 2", "nextPrompt": "Description pour la suite"}
  ],
  "quiz": {
    "question": "Question liée à l'histoire",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correctAnswer": 0,
    "explanation": "Explication de la réponse"
  }
}`;

  try {    // Utilisation de l'API Groq avec une logique de chain-of-thought pour des récits cohérents
    const response = await fetch('https://api.a0.dev/ai/groq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: 'Génère une histoire interactive et éducative en utilisant une logique chain-of-thought inspirée de LangChain.' }
        ]
      })
    });

    const data = await response.json();
    const parsedResponse = JSON.parse(data.completion);
    return parsedResponse;
  } catch (error) {
    console.error('Erreur lors de la génération de l\'histoire:', error);
    return {
      content: "Une erreur est survenue lors de la génération de l'histoire.",
      choices: [
        { text: "Réessayer", nextPrompt: "Réessayer la génération" }
      ]
    };
  }
};