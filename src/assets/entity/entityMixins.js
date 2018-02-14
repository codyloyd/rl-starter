export class PlayerActor {
  constructor() {
    this.name = "PlayerActor";
    this.groupName = "Actor";
    this.act = this._act;
  }
  _act() {
    const Game = this.getGame();
    Game.refresh();
    Game.getEngine().lock();
  }
}

export class Destructible {
  constructor({ maxHp = 10, hp }) {
    this.name = "Destructible";
    this.maxHp = maxHp;
    this.hp = hp || this.maxHp;
    this.takeDamage = this._takeDamage;
  }

  _takeDamage(damage) {
    this.hp -= damage;
  }
}

export class InventoryHolder {
  constructor({ inventorySize = 10 }) {
    this.inventorySize = inventorySize;
    this.inventory = [];
    this.addItem = this._addItem;
    this.removeItem = this._removeItem;
  }
  _addItem(item) {
    if (this.inventory.length < this.inventorySize) {
      this.inventory.push(item);
      return true;
    }
    return false;
  }
  _removeItem(itemToRemove) {
    this.inventory = this.inventory.filter(item => item !== itemToRemove);
  }
}

export class MonsterActor {
  constructor() {
    this.name = "MonsterActor";
    this.groupName = "Actor";
    this.act = this._act;
  }
  _act() {
    const dX = Math.floor(Math.random() * 3) - 1;
    const dY = Math.floor(Math.random() * 3) - 1;
    this.tryMove(this.getX() + dX, this.getY() + dY, this.getLevel());
  }
}

export class Movable {
  constructor() {
    this.name = "Movable";
    this.tryMove = this._tryMove;
  }
  _tryMove(x, y, level) {
    const tile = level.getMap().getTile(x, y);

    const target = level.getEntityAt(x, y);
    if (target) return false;

    if (tile.isWalkable) {
      this.setPosition(x, y);
      return true;
    }
    return false;
  }
}
