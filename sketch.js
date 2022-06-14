const POPULATION_SIZE = 200;
const MUTATION_RATE = 0.008;
let all_phrases;
let generations = 0;

function setup() {
  noCanvas();
  all_phrases = new Population(POPULATION_SIZE, MUTATION_RATE);
  all_phrases.populate();
  //   frameRate(10);
  //   noLoop();
}

function draw() {
  all_phrases.calculateFitness();
  all_phrases.normalize();
  all_phrases.showAndEval();
  all_phrases.reproduce();
  select("#total-generations").html(++generations);
}
