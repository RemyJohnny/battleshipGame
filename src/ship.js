function Ship(name, len) {
  return {
    name: name,
    length: len,
    hits: 0,
    isSunk: false,
    location: [],

    Hit() {
      this.hits += 1;
      this.IsSunk();
    },
    IsSunk() {
      if (this.hits >= this.length) {
        this.isSunk = true;
      }
    },
    setLocation(cords) {
      this.location = cords;
    },
  };
}

module.exports = Ship;
