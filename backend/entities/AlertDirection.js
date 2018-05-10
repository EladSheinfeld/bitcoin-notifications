class  AlertDirection {
  constructor(direction){
    this.direction = direction;
  }

  toString() {
    return `${this.direction}`;
  }
}

AlertDirection.UP = new  AlertDirection("UP");
AlertDirection.DOWN = new  AlertDirection("DOWN");

module.exports = AlertDirection;
