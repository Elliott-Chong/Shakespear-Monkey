const DESIRED_PHRASE = "To be or not to be.";
const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ. ";
const POPULATION_SIZE = 200;
const MUTATION_RATE = 0.01;
let all_phrases = new Array(POPULATION_SIZE);

const best_phrase_elt = document.getElementById("best-phrase");

const getRandomChar = (CHARS) => {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
};

const compareObj = (o1, o2) => JSON.stringify(o1) == JSON.stringify(o2);

const weighted_choice = (arr) => {
  arr.sort((a, b) => a.fitness - b.fitness);
  let copy = arr.map((elt) => elt.fitness);
  copy = JSON.parse(JSON.stringify(copy));
  let weights = JSON.parse(JSON.stringify(copy));
  for (let i = 0; i < weights.length; i++) {
    for (let j = 0; j < i; j++) {
      weights[i] += copy[j];
    }
  }
  let rand = Math.random();
  for (let i = 0; i < weights.length; i++) {
    if (i == weights.length - 1) return arr[arr.length - 1];
    if (rand < weights[i]) return arr[i];
  }
};

const calculateFitness = (phrase) => {
  // calculates fintness by seeing how many chars matches the desired phrase
  let total = 0;
  for (let i = 0; i < DESIRED_PHRASE.length; i++) {
    if (phrase[i] === DESIRED_PHRASE[i]) {
      total++;
    }
  }
  return 2 ** total;
};
function softMax(arr) {
  let sum = 0;
  for (let elt of arr) {
    sum += Math.exp(elt.fitness);
  }
  for (let elt of arr) {
    elt.fitness = Math.exp(elt.fitness) / sum;
  }
  let cum = 0;
  for (let elt of arr) {
    cum += elt.fitness;
  }
}
// create a population with N elements, each with randomised DNA
for (let i = 0; i < POPULATION_SIZE; i++) {
  let res = { phrase: "", fitness: 0 };
  for (let j = 0; j < DESIRED_PHRASE.length; j++) {
    res.phrase += getRandomChar(CHARS);
  }
  res.fitness = calculateFitness(res.phrase);
  all_phrases[i] = res;
}

//step 2 - loop here

// calculate fitness for each and create mating pool
for (let i = 0; i < POPULATION_SIZE; i++) {
  all_phrases[i].fitness = calculateFitness(all_phrases[i].phrase);
}

// apply softmax on the mating pool to normalise it into a probablity distribution
let temp;
let BEST = "";
let BEST_FIT = 0;
for (let generation = 0; generation < 200; generation++) {
  softMax(all_phrases);

  temp = [];
  for (let i = 0; i < POPULATION_SIZE; i++) {
    let parent1 = weighted_choice(all_phrases).phrase;
    let parent2 = weighted_choice(all_phrases).phrase;
    while (compareObj(parent1, parent2)) {
      parent2 = weighted_choice(all_phrases).phrase;
    }
    // heredity
    let middleIndex = Math.floor(DESIRED_PHRASE.length * Math.random());
    let child = parent1.slice(0, middleIndex) + parent2.slice(middleIndex);
    for (let ll = 0; ll < child.length; ll++) {
      if (Math.random() <= MUTATION_RATE) {
        child = child.split("");
        child[ll] = getRandomChar(CHARS);
        child = child.join("");
      }
    }
    let res = { phrase: child, fitness: calculateFitness(child) };
    temp.push(res);
  }
  all_phrases = temp;
  if (generation % 50 == 0) {
    for (let elt of temp) {
      if (elt.fitness > BEST_FIT) {
        BEST = elt.phrase;
        BEST_FIT = elt.fitness;
      }
    }
  }
  setTimeout(() => {
    best_phrase_elt.innerText = BEST;
  }, 0);
  console.log(BEST);
}

console.log(temp);
