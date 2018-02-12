import DynamicGlyph from "../dynamicGlyph";

class Entity extends DynamicGlyph {
  constructor({
    x = 0,
    y = 0,
    name = " ",
    level = null,
    Game = null,
    speed = 1000
  }) {
    super(...arguments);
    this.x = x;
    this.y = y;
    this.name = name;
    this.level = level;
    this.game = Game;
    this.speed = speed;
  }
  getSpeed() {
    return this.speed;
  }
  getGame() {
    return this.game;
  }
  getLevel() {
    return this.level;
  }
  setMap(newLevel) {
    this.level = newLevel;
  }
  getName() {
    return this.name;
  }
  setName(newName) {
    this.name = newName;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  setX(newX) {
    this.x = newX;
  }
  setY(newY) {
    this.y = newY;
  }
  setPosition(newX, newY) {
    if (this.level) {
      this.level.updateEntityPosition(this.x, this.y, newX, newY);
    }
    this.x = newX;
    this.y = newY;
  }
}

export default Entity;
