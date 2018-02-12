import ROT from "rot-js";
import Colors from "./colors";
import startScreen from "./screens/startScreen";

class Game {
  constructor() {
    this.screenWidth = 80;
    this.screenHeight = 40;
    this.scheduler = new ROT.Scheduler.Speed();
    this.engine = new ROT.Engine(this.scheduler);
    this.display = new ROT.Display({
      width: this.screenWidth,
      height: this.screenHeight,
      fontFamily: "Courier, monospace",
      fg: Colors.white,
      bg: Colors.black
    });
    this.currentScreen;

    window.addEventListener("keydown", e => {
      if (this.currentScreen) {
        this.currentScreen.handleInput(e);
      }
    });
  }

  getScheduler() {
    return this.scheduler;
  }
  getEngine() {
    return this.engine;
  }
  getDisplay() {
    return this.display;
  }
  getScreenWidth() {
    return this.screenWidth;
  }
  getScreenHeight() {
    return this.screenHeight;
  }
  switchScreen(screen, options = {}) {
    if (this.currentScreen) {
      this.currentScreen.exit();
    }
    this.currentScreen = new screen(this, options);
    this.refresh();
  }
  refresh() {
    this.display.clear();
    this.currentScreen.render(this);
  }
}

export default Game;

window.onload = function() {
  if (!ROT.isSupported()) {
    alert("The rot.js library isn't supported by your browser.");
  } else {
    setTimeout(() => {
      const game = new Game();
      document.body.appendChild(game.getDisplay().getContainer());
      game.switchScreen(startScreen);
    }, 1000);
  }
};
