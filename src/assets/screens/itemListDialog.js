import ROT from "rot-js";
import Colors from "../colors";

class ItemListDialog {
  constructor(items, masterScreen) {
    this.items = items;
    this.masterScreen = masterScreen;
    this.selectedItemIndex = 0;
    this.display = document.createElement("div");
    Object.assign(this.display.style, {
      position: "absolute",
      top: "60px",
      left: "60px",
      padding: "15px",
      background: Colors.black,
      color: Colors.white,
      "font-family": "Courier, monospace",
      border: "1px solid " + Colors.white
    });
  }
  render() {
    this.display.innerHTML = "";
    if (this.items.length === 0) {
      const empty = document.createElement("div");
      empty.textContent = "no items!";
      this.display.appendChild(empty);
      document.body.appendChild(this.display);
      return;
    }
    const title = document.createElement("div");
    title.textContent = "INVENTORY";
    Object.assign(title.style, {
      "border-bottom": `1px solid ${Colors.white}`
    });
    this.display.appendChild(title);
    if (this.items.length === 0) {
      const empty = document.createElement("div");
      empty.textContent = "no items!";
      this.display.appendChild(empty);
    }
    this.items.forEach((item, i) => {
      const itemDiv = document.createElement("div");
      itemDiv.textContent = item.name;
      if (i == this.selectedItemIndex) {
        Object.assign(itemDiv.style, {
          color: Colors.black,
          background: Colors.white
        });
      }
      this.display.appendChild(itemDiv);
    });
    document.body.appendChild(this.display);
  }
  incSelectedItem() {
    this.selectedItemIndex = (this.selectedItemIndex + 1) % this.items.length;
  }
  decSelectedItem() {
    this.selectedItemIndex = this.selectedItemIndex - 1;
    if (this.selectedItemIndex < 0) {
      this.selectedItemIndex = this.items.length - 1;
    }
  }
  handleInput(inputData) {
    if (inputData.keyCode === ROT.VK_ESCAPE) {
      this.masterScreen.exitSubscreen();
      this.display.remove();
    } else if (inputData.keyCode === ROT.VK_RETURN) {
      // do thing on selected item
      const item = this.items[this.selectedItemIndex];
      console.log(item);
    } else if (
      inputData.keyCode === ROT.VK_J ||
      inputData.keyCode === ROT.VK_DOWN ||
      inputData.keyCode === ROT.VK_2
    ) {
      this.incSelectedItem();
      this.masterScreen.game.refresh();
    } else if (
      inputData.keyCode === ROT.VK_K ||
      inputData.keyCode ||
      ROT.VK_UP ||
      inputData.keyCode === ROT.VK_8
    ) {
      this.decSelectedItem();
      this.masterScreen.game.refresh();
    }
  }
}

export default ItemListDialog;
