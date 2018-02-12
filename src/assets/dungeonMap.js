import ROT from "rot-js";
import { floorTile, wallTile } from "./tile";

class DungeonMap {
  constructor({ width = 40, height = 20 }) {
    this.width = width;
    this.height = height;
    this.tiles = new Array(width);

    for (let w = 0; w < width; w++) {
      this.tiles[w] = new Array(height);
    }

    const generator = new ROT.Map.Digger(width, height, {
      roomWidth: [6, 12],
      roomHeight: [6, 12],
      dugPercentage: 0.3
    });

    generator.create(
      function(x, y, value) {
        this.tiles[x][y] = value == 1 ? wallTile : floorTile;
      }.bind(this)
    );
  }

  getTiles() {
    return this.tiles;
  }

  getTile(x, y) {
    try {
      return this.tiles[x][y];
    } catch (e) {}
  }
}

export default DungeonMap;
