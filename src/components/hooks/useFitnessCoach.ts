import { GoogleGenerativeAI } from '@google/generative-ai';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';

const GEMINI_KEY = Constants.expoConfig?.extra?.EXPO_PUBLIC_GEMINI_KEY;

// 🔹 Helper function to fetch AI response
const getFitnessMessage = async (dailyStats: any, apiKey: string) => {
  console.log('GEMINI_KEY ', GEMINI_KEY);
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'models/gemini-1.5-flash',
    });

    const prompt = `
      You are a friendly fitness coach. Based on these stats:
      - Calories: ${dailyStats.calories.consumed}/${dailyStats.calories.target}
      - Protein: ${dailyStats.protein.consumed}/${dailyStats.protein.target}g
      - Carbs: ${dailyStats.carbs.consumed}/${dailyStats.carbs.target}g
      - Water: ${dailyStats.water.consumed}/${dailyStats.water.target} cups
      
      Give a short 1-line positive and motivating message like:
      "Hey Ritish 👋 You're doing great! You're 60% towards your protein goal."
      Keep it friendly, motivational, and personalized.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('AI message fetch failed');
  }
};

// 🔹 Hook
export const useFitnessCoach = (dailyStats: any) => {
  const [message, setMessage] = useState<string>(
    'Fetching your AI motivation...'
  );

  useEffect(() => {
    const fetchAIMessage = async () => {
      if (!GEMINI_KEY) {
        console.warn('No Gemini API key found!');
        setMessage('Hey Ritish 👋 Keep going strong — progress is progress!');
        return;
      }

      try {
        const aiMessage = await getFitnessMessage(dailyStats, GEMINI_KEY);
        setMessage(aiMessage);
      } catch {
        setMessage('Hey Ritish 👋 Keep going strong — progress is progress!');
      }
    };

    fetchAIMessage();
  }, [dailyStats]);

  return message;
};
