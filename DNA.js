class DNA {
  constructor() {
    this.DESIRED_PHRASE = "Hello world, my name is Elliott!";
    this.CHARS =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-=_+[]{};':\",./<>?`~ ";
    this.fitness = null;
    this.genes = new Array(this.DESIRED_PHRASE.length);
    for (let i = 0; i < this.genes.length; i++) {
      this.genes[i] = this.getChar();
    }
  }

  getChar() {
    return this.CHARS[Math.floor(Math.random() * this.CHARS.length)];
  }

  calculateFitness() {
    let correct = 0;
    for (let i = 0; i < this.genes.length; i++) {
      if (this.genes[i] == this.DESIRED_PHRASE[i]) {
        correct++;
      }
    }
    this.fitness = correct;
  }

  equals(other) {
    return this.genes.join("") == other.genes.join("");
  }

  crossOver(other) {
    let child = new DNA();
    let middle = Math.floor(Math.random() * this.genes.length);
    for (let i = 0; i < child.genes.length; i++) {
      if (i < middle) {
        child.genes[i] = this.genes[i];
      } else {
        child.genes[i] = other.genes[i];
      }
    }
    return child;
  }

  mutate(MUTATION_RATE) {
    for (let i = 0; i < this.genes.length; i++) {
      if (Math.random() < MUTATION_RATE) {
        this.genes[i] = this.getChar();
      }
    }
  }

  evaluate() {
    for (let i = 0; i < this.genes.length; i++) {
      if (this.genes[i] !== this.DESIRED_PHRASE[i]) {
        return false;
      }
    }
    return true;
  }
}
