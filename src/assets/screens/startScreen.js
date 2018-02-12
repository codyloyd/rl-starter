import ROT from "rot-js";
import playScreen from "./playScreen";

class startScreen {
  constructor(Game) {
    this.game = Game;
  }
  exit() {}
  handleInput(inputData) {
    if (inputData.keyCode == ROT.VK_RETURN) {
      this.game.switchScreen(playScreen);
    }
  }
  render(Game) {
    const display = Game.getDisplay();
    display.drawText(0, 0, "press enter to start");
  }
}

export default startScreen;
