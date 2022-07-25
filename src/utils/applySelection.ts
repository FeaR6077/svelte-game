import type { Celebrity } from "../Components/types/game_data_type"
import type { GameCategory } from "../Components/types/game_category"
import type { GamePairs } from "../Components/types/game_pairs"

const filterByCategory = (subset: Array<Celebrity>, category: GameCategory) => {
  const filteredCelebs: Array<Celebrity> = [];
  subset.forEach((element) => {
    if (element.categories.includes(category.slug)) {
      filteredCelebs.push(element);
    }
  });
  createRandomGamePair(filteredCelebs);
  return filteredCelebs;
};

const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * (max + 1));
};


//TODO: no duplicates
// fetch similar celebs if possible as gamepair


const createRandomGamePair = (filteredCelebs: Array<Celebrity>) => {

  const filteredCelebPairs: Array<GamePairs>= [];

  for (let x = 0; x < 10; x++) {
    filteredCelebPairs.push({
      a: filteredCelebs[getRandomNumber(filteredCelebs.length)],
      b: filteredCelebs[getRandomNumber(filteredCelebs.length)],
    });
  }
  return filteredCelebPairs;
};

export { filterByCategory, createRandomGamePair };
