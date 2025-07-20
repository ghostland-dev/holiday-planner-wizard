import { toast } from "sonner";

interface GeminiRequestBody {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
  generationConfig: {
    temperature: number;
    topK: number;
    topP: number;
    maxOutputTokens: number;
  };
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

interface PlanningRequest {
  destination: string;
  budget: string;
  people: number;
  duration: number;
  preferences: string[];
}

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  cost: number;
  isFree: boolean;
  duration: string;
  category: string;
  rating: number;
  location?: string;
  tips?: string;
}

interface DayPlan {
  day: number;
  date: string;
  activities: Activity[];
  totalCost: number;
  weather?: string;
  transportTips?: string;
}

export class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private createPrompt(request: PlanningRequest): string {
    const { destination, budget, people, duration, preferences } = request;
    
    const budgetRanges = {
      economy: "30-50€ par personne par jour",
      standard: "50-100€ par personne par jour", 
      premium: "100-200€ par personne par jour"
    };

    return `En tant qu'expert en planification de voyage, créez un plan de voyage détaillé et personnalisé pour :

**Destination :** ${destination}
**Budget :** ${budget} (${budgetRanges[budget as keyof typeof budgetRanges]})
**Nombre de personnes :** ${people}
**Durée :** ${duration} jour(s)
**Préférences :** ${preferences.join(", ")}

**Instructions importantes :**
1. Privilégiez TOUJOURS les activités gratuites (au moins 50% du programme)
2. Proposez des expériences authentiques et locales
3. Incluez des recommandations pratiques (transport, horaires)
4. Respectez strictement le budget par personne
5. Variez les types d'activités selon les préférences

**Format de réponse requis (JSON valide uniquement) :**
{
  "plan": [
    {
      "day": 1,
      "date": "date au format français",
      "weather": "météo prévue",
      "transportTips": "conseils transport du jour",
      "activities": [
        {
          "id": "1-1",
          "time": "09:00",
          "title": "Titre de l'activité",
          "description": "Description détaillée (2-3 phrases)",
          "cost": 0,
          "isFree": true,
          "duration": "1h30",
          "category": "culture|food|nature|entertainment|shopping|sports",
          "rating": 4.5,
          "location": "Adresse ou zone précise",
          "tips": "Conseil pratique spécifique"
        }
      ],
      "totalCost": 0
    }
  ],
  "summary": {
    "totalBudget": 0,
    "freeActivitiesCount": 0,
    "averageRating": 4.7,
    "highlights": ["point fort 1", "point fort 2", "point fort 3"]
  }
}

Répondez UNIQUEMENT avec le JSON, sans texte supplémentaire.`;
  }

  async generateTravelPlan(request: PlanningRequest): Promise<DayPlan[]> {
    try {
      const prompt = this.createPrompt(request);
      
      const requestBody: GeminiRequestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 64,
          topP: 0.95,
          maxOutputTokens: 8192
        }
      };

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API Error:', errorData);
        throw new Error(`Erreur API Gemini: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('Aucune réponse générée par Gemini');
      }

      const generatedText = data.candidates[0].content.parts[0].text;
      
      // Nettoyer le texte pour extraire le JSON
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Format de réponse invalide de Gemini');
      }

      const parsedResponse = JSON.parse(jsonMatch[0]);
      
      if (!parsedResponse.plan || !Array.isArray(parsedResponse.plan)) {
        throw new Error('Structure de plan invalide');
      }

      // Convertir au format attendu par l'application
      return parsedResponse.plan.map((day: any) => ({
        ...day,
        activities: day.activities.map((activity: any, index: number) => ({
          ...activity,
          id: activity.id || `${day.day}-${index + 1}`
        }))
      }));

    } catch (error) {
      console.error('Erreur lors de la génération du plan:', error);
      toast.error("Erreur lors de la génération du plan avec Gemini");
      throw error;
    }
  }

  async validateApiKey(): Promise<boolean> {
    try {
      const testRequest: GeminiRequestBody = {
        contents: [
          {
            parts: [
              {
                text: "Test de connexion. Répondez simplement 'OK'."
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          topK: 1,
          topP: 0.1,
          maxOutputTokens: 10
        }
      };

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testRequest)
      });

      return response.ok;
    } catch (error) {
      console.error('Erreur de validation de la clé API:', error);
      return false;
    }
  }
}