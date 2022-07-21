const filterByCategory = (subset, category) => {
  const filteredCelebs = [];

  subset.forEach((element) => {
    if (element.categories.includes(category.slug)) {
      filteredCelebs.push(element);
    }
  });
  createRandomGamePair(filteredCelebs);
  return filteredCelebs;
};

const getRandomNumber = (max) => {
  return Math.floor(Math.random() * (max + 1));
};


//TODO: no duplicates
// fetch similar celebs if possible as gamepair


const createRandomGamePair = (filteredCelebs) => {
  const filteredCelebPairs = [];

  for (let x = 0; x < 10; x++) {
    filteredCelebPairs.push({
      a: filteredCelebs[getRandomNumber(filteredCelebs.length)],
      b: filteredCelebs[getRandomNumber(filteredCelebs.length)],
    });
  }
  return filteredCelebPairs;
};

export { filterByCategory, createRandomGamePair };
