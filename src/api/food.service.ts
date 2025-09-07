import { sanityClient } from './sanity';

export async function getFoodItems() {
  const query = `*[_type == "foodItem"]|order(_createdAt desc){
    _id,
    name,
    description,
    calories,
    image{asset->}
  }`;
  return sanityClient.fetch(query);
}
