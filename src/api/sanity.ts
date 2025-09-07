import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: 'arqvnvf5',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: any) =>
  builder.image(source).width(600).height(400).fit('crop').url();

interface FoodItemType {
  _id: string;
  name: string;
  description?: string;
  calories?: number;
  image?: {
    asset?: { _ref: string };
    alt?: string;
  };
}

export async function fetchFoodItems(): Promise<FoodItemType[]> {
  const query = `*[_type == "foodItem"]|order(_createdAt desc){
    _id,
    name,
    description,
    calories,
    image{
      asset->
    }
  }`;
  return sanityClient.fetch(query);
}
