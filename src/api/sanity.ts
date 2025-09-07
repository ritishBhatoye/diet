import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'arqvnvf5',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
});

interface FoodItem {
  _id: string;
  name: string;
  description?: string;
  calories?: number;
  image?: {
    asset?: { _ref: string };
    alt?: string;
  };
}

export async function fetchFoodItems(): Promise<FoodItem[]> {
  const query = `*[_type == "foodItem"]|order(_createdAt desc){
    _id,
    name,
    description,
    calories,
  }`;
  return sanityClient.fetch(query);
}
