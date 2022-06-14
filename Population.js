class Population {
  constructor(POPULATION_SIZE, MUTATION_RATE) {
    this.POPULATION_SIZE = POPULATION_SIZE;
    this.population = new Array(this.POPULATION_SIZE);
    this.MUTATION_RATE = MUTATION_RATE;
    select("#mutation-rate").html(this.MUTATION_RATE * 100);
    select("#total-population").html(this.POPULATION_SIZE);
  }

  populate() {
    for (let i = 0; i < this.POPULATION_SIZE; i++) {
      this.population[i] = new DNA();
    }
  }

  calculateFitness() {
    for (let i = 0; i < this.POPULATION_SIZE; i++) {
      this.population[i].calculateFitness();
    }
  }

  normalize() {
    let sum = 0;
    for (let i = 0; i < this.POPULATION_SIZE; i++) {
      sum += Math.exp(this.population[i].fitness);
    }
    for (let i = 0; i < this.POPULATION_SIZE; i++) {
      this.population[i].fitness = Math.exp(this.population[i].fitness) / sum;
    }
  }

  static weightedChoice(population) {
    let choice = population[Math.floor(Math.random() * population.length)];
    let r = Math.random();
    while (r > choice.fitness) {
      choice = population[Math.floor(Math.random() * population.length)];
      r = Math.random();
    }
    return choice;
  }

  reproduce() {
    let tempPool = [];
    for (let i = 0; i < this.POPULATION_SIZE; i++) {
      let p1 = Population.weightedChoice(this.population);
      let p2 = Population.weightedChoice(this.population);
      while (p2.equals(p1)) {
        p2 = Population.weightedChoice(this.population);
      }

      let child = p1.crossOver(p2);
      child.mutate(this.MUTATION_RATE);
      if (Math.random() < 0.01) {
        let childElt = createSpan();
        childElt.elt.classList.add("phrase");
        childElt.html(child.genes.join(""));
        select("#phrases-container").child(childElt);
      }

      tempPool.push(child);
    }
    this.population = tempPool;
  }

  showAndEval() {
    let best;
    let best_fitness = 0;
    for (let elt of this.population) {
      if (elt.fitness > best_fitness) {
        best = elt;
        best_fitness = elt.fitness;
      }
    }
    select("#best-phrase").html(best.genes.join(""));
    if (best.evaluate()) {
      noLoop();
    }
  }
}
