import DynamicGlyph from "../dynamicGlyph";

class Item extends DynamicGlyph {
  constructor({ name = "item", canPickUp = true }) {
    super(...arguments);
    this.name = name;
    this.canPickUp = canPickUp;
  }
}

export default Item;
