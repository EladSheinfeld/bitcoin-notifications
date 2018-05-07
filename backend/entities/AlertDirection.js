class  AlertDirection {
  constructor(direction){
    this.direction = direction;
  }

  toString() {
    return `Color.${this.name}`;
  }
}

AlertDirection.UP = new  AlertDirection("UP");
AlertDirection.DOWN = new  AlertDirection("DOWN");

module.exports = AlertDirection;
