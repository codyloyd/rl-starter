import Glyph from "./glyph";
import Colors from "./colors";

class Tile extends Glyph {
  constructor({ isWalkable = false, blocksLight = false }) {
    super(...arguments);
    this.isWalkable = isWalkable;
    this.blocksLight = blocksLight;
  }
}

const floorTile = new Tile({
  char: ".",
  fg: Colors.darkGray,
  isWalkable: true
});

const wallTile = new Tile({
  char: "#",
  fg: Colors.brown,
  blocksLight: true
});

export { floorTile, wallTile };
