import ROT from "rot-js";
import startScreen from "./startScreen";

class gameOverScreen {
  constructor(Game) {
    this.game = Game;
  }
  exit() {}
  handleInput(inputData) {
    if (inputData.keyCode == ROT.VK_RETURN) {
      this.game.switchScreen(startScreen);
    }
  }
  render(Game) {
    const display = Game.getDisplay();
    display.drawText(0, 0, "game over!");
  }
}
export default gameOverScreen;
