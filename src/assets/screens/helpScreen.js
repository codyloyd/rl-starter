import ROT from "rot-js";

class HelpScreen {
  constructor(masterScreen) {
    this.masterScreen = masterScreen;
    this.display = document.createElement("div");
    this.display.classList.add("help-screen");
    const title = document.createElement("div");
    title.textContent = "HELP";
    this.display.appendChild(title);
    const movement = document.createElement("pre");
    movement.textContent = `You can move your character using the arrow keys,
the num-pad or vi-keys as follows.

y k u    7 8 9
 \\|/      \\|/
h- -l    4- -6
 /|\\      /|\\
b j m    1 2 3
 `;
    this.display.appendChild(movement);
    const otherKeys = document.createElement("pre");
    otherKeys.textContent = `OTHER KEYS:
i - View Inventory
ESC - Lose Game Instantly`;
    this.display.appendChild(otherKeys);
  }

  render() {
    this.display.remove();
    document.body.appendChild(this.display);
  }

  handleInput(inputData) {
    if (inputData.keyCode === ROT.VK_ESCAPE) {
      this.masterScreen.exitSubscreen();
      this.display.remove();
    }
  }
}

export default HelpScreen;
