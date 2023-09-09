function Ship(name, len) {
  return {
    name: name,
    length: len,
    hits: 0,
    isSunk: false,

    Hit() {
      this.hits += 1;
      this.IsSunk();
    },
    IsSunk() {
      if (this.hits >= this.length) {
        this.isSunk = true;
      }
    },
  };
}

module.exports = Ship;
