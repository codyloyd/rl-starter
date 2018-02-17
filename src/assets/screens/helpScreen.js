import { h, app } from "hyperapp";
import ROT from "rot-js";

class HelpScreen {
  constructor(masterScreen) {
    this.masterScreen = masterScreen;
    this.display = document.createElement("div");
    this.screens = ["movement", "otherKeys"];
    this.actions = {
      switchScreen: value => state => ({
        screen: value
      })
    };
    this.app = app(
      { screen: this.screens[0] },
      this.actions,
      this.view.bind(this),
      this.display
    );
  }

  view({ screen }) {
    switch (screen) {
      case "movement":
        return <this.movementScreen />;
      case "otherKeys":
        return <this.otherKeys />;
      default:
        return <div>error</div>;
    }
  }

  otherKeys() {
    return (
      <div class="help-screen">
        HELP - OTHER KEYS <br /> <br />i - inventory <br />ESC - lose
        immediately!
      </div>
    );
  }

  movementScreen() {
    const movement = `
  y k u    7 8 9
   \\|/      \\|/
  h- -l    4- -6
   /|\\      /|\\
  b j m    1 2 3
 `;
    return (
      <div class="help-screen">
        HELP - MOVEMENT
        <pre style={{ margin: 0 }}>
          You can move your character with the arrow keys, <br />
          the num-pad or 'vi-keys' as seen below.
          {movement}
        </pre>
      </div>
    );
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
    if (inputData.keyCode === ROT.VK_PERIOD) {
      console.log(this.screens);
      this.screens.push(this.screens.shift());
      this.app.switchScreen(this.screens[0]);
    }
  }
}

export default HelpScreen;
