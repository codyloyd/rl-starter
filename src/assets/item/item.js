import DynamicGlyph from "../dynamicGlyph";

class Item extends DynamicGlyph {
  constructor({ name = "item" }) {
    super(...arguments);
    this.name = name;
  }
}

export default Item;
