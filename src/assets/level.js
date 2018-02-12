import DungeonMap from "./dungeonMap";
import Entity from "./entity/entity";
import { MonsterTemplate, PlayerTemplate } from "./entity/entities";
import { floorTile, wallTile } from "./tile";

class Level {
  constructor(Game) {
    this.game = Game;
    this.width = this.game.getScreenWidth();
    this.height = this.game.getScreenHeight();
    this.entities = {};
    this.map = new DungeonMap({
      width: this.width,
      height: this.height
    });
    this.exploredTiles = {};

    // add Entities to Map
    for (let i = 0; i < 10; i++) {
      this.addEntityAtRandomPosition(
        new Entity(Object.assign(MonsterTemplate, { level: this }))
      );
    }
  }

  getEntities() {
    return this.entities;
  }

  getRandomFloorPosition() {
    const x = Math.floor(Math.random() * this.width);
    const y = Math.floor(Math.random() * this.height);
    if (this.map.getTile(x, y) === floorTile && !this.getEntityAt(x, y)) {
      return { x, y };
    } else {
      return this.getRandomFloorPosition();
    }
  }

  addEntityAtRandomPosition(entity) {
    const coords = this.getRandomFloorPosition();
    entity.setPosition(coords.x, coords.y);
    this.addEntity(entity);
  }

  getEntityAt(x, y) {
    return this.entities[x + "," + y];
  }

  updateEntityPosition(oldX, oldY, newX, newY) {
    this.entities[newX + "," + newY] = this.entities[oldX + "," + oldY];
    delete this.entities[oldX + "," + oldY];
  }

  addEntity(entity) {
    this.entities[entity.getX() + "," + entity.getY()] = entity;
    if (entity.hasMixin("Actor")) {
      this.game.getScheduler().add(entity, true);
    }
  }

  getMap() {
    return this.map;
  }
}

export default Level;
