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
