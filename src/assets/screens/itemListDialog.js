import ROT from "rot-js";
import { h, app } from "hyperapp";
import Colors from "../colors";

class ItemListDialog {
  constructor(items, masterScreen) {
    this.items = items;
    this.masterScreen = masterScreen;
    this.display = document.createElement("div");
    this.actions = {
      inc: this.incSelectedItem.bind(this),
      dec: this.decSelectedItem.bind(this),
      getIndex: value => state => state.selectedItemIndex
    };
    this.state = { items: this.items, selectedItemIndex: 0 };
    this.functions = app(this.state, this.actions, this.view, this.display);
  }

  view({ items, selectedItemIndex }, actions) {
    return (
      <div class="item-list-dialog">
        <div style={{ borderBottom: "1px solid " + Colors.white }}>
          INVENTORY
        </div>
        {items.map((item, i) => {
          return (
            <div class={i == selectedItemIndex ? "selected" : ""}>
              {item.name}
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    document.body.appendChild(this.display);
  }

  incSelectedItem() {
    return ({ selectedItemIndex }) => ({
      selectedItemIndex: (selectedItemIndex + 1) % this.items.length
    });
  }
  decSelectedItem() {
    return ({ selectedItemIndex }) => {
      let newValue = selectedItemIndex - 1;
      if (newValue < 0) {
        newValue = this.items.length - 1;
      }

      return {
        selectedItemIndex: newValue
      };
    };
  }

  handleInput(inputData) {
    if (inputData.keyCode === ROT.VK_ESCAPE) {
      this.masterScreen.exitSubscreen();
      this.display.remove();
    } else if (inputData.keyCode === ROT.VK_RETURN) {
      // do thing on selected item
      const item = this.items[this.functions.getIndex()];
      console.log(item);
    } else if (
      inputData.keyCode === ROT.VK_J ||
      inputData.keyCode === ROT.VK_DOWN ||
      inputData.keyCode === ROT.VK_2
    ) {
      this.functions.inc();
    } else if (
      inputData.keyCode === ROT.VK_K ||
      inputData.keyCode ||
      ROT.VK_UP ||
      inputData.keyCode === ROT.VK_8
    ) {
      this.functions.dec();
    }
  }
}

export default ItemListDialog;
