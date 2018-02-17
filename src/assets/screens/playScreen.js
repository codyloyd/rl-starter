import ROT from "rot-js";
import Colors from "../colors";
import Entity from "../entity/entity";
import gameOverScreen from "./gameOverScreen";
import ItemListDialog from "./itemListDialog";
import Confirmation from "./confirmation";
import HelpScreen from "./helpScreen";
import { MonsterTemplate, PlayerTemplate } from "../entity/entities";
import Level from "../level";

class playScreen {
  constructor(Game) {
    this.game = Game;
    this.level = new Level(this.game);
    this.map = this.level.getMap();
    this.subscreen = null;

    this.player = new Entity(
      Object.assign(PlayerTemplate, { map: this.map, Game: this.game })
    );

    const position = this.level.getRandomFloorPosition();
    this.player.setPosition(position.x, position.y);
    this.game.getScheduler().add(this.player, true);
    this.game.getEngine().start();
    console.log("enter play screen");
  }

  exit() {
    console.log("exit play screen");
  }

  handleInput(inputData) {
    if (this.subscreen) {
      this.subscreen.handleInput(inputData);
      return;
    }
    if (inputData.keyCode === ROT.VK_ESCAPE) {
      const exitFunction = () => {
        console.log(this);
        this.game.switchScreen(gameOverScreen);
      };
      this.enterSubscreen(
        new Confirmation(
          "Are you SURE you want to INSTA-LOSE?",
          exitFunction,
          this
        )
      );
    }
    //movement
    const move = function(dX, dY) {
      this.player.tryMove(
        this.player.getX() + dX,
        this.player.getY() + dY,
        this.level
      );
      this.game.getEngine().unlock();
    }.bind(this);
    if (
      inputData.keyCode === ROT.VK_H ||
      inputData.keyCode == ROT.VK_4 ||
      inputData.keyCode == ROT.VK_LEFT
    ) {
      move(-1, 0);
    } else if (
      inputData.keyCode === ROT.VK_L ||
      inputData.keyCode == ROT.VK_6 ||
      inputData.keyCode == ROT.VK_RIGHT
    ) {
      move(1, 0);
    } else if (
      inputData.keyCode === ROT.VK_K ||
      inputData.keyCode == ROT.VK_8 ||
      inputData.keyCode == ROT.VK_UP
    ) {
      move(0, -1);
    } else if (
      inputData.keyCode === ROT.VK_J ||
      inputData.keyCode == ROT.VK_2 ||
      inputData.keyCode == ROT.VK_DOWN
    ) {
      move(0, 1);
    } else if (
      inputData.keyCode === ROT.VK_Y ||
      inputData.keyCode == ROT.VK_7
    ) {
      move(-1, -1);
    } else if (
      inputData.keyCode === ROT.VK_U ||
      inputData.keyCode == ROT.VK_9
    ) {
      move(1, -1);
    } else if (
      inputData.keyCode === ROT.VK_B ||
      inputData.keyCode == ROT.VK_1
    ) {
      move(-1, 1);
    } else if (
      inputData.keyCode === ROT.VK_N ||
      inputData.keyCode == ROT.VK_3
    ) {
      move(1, 1);
    }
    // subscreens
    if (inputData.keyCode == ROT.VK_I) {
      this.enterSubscreen(new ItemListDialog(this.player.inventory, this));
    }
    if (inputData.keyCode == ROT.VK_SLASH) {
      this.enterSubscreen(new HelpScreen(this));
    }
  }

  enterSubscreen(subscreen) {
    this.subscreen = subscreen;
    this.game.refresh();
  }

  exitSubscreen() {
    this.subscreen = null;
    this.game.refresh();
  }

  render(Game) {
    const playerStatusDisplay = Game.playerStatusDisplay;
    const display = Game.getDisplay();
    const map = this.level.getMap();

    playerStatusDisplay.render({ name: this.player.name, hp: 40, maxHp: 40 });
    // autopickupitems
    const items = this.level.getItems();
    if (items[this.player.getX() + "," + this.player.getY()]) {
      const item = items[this.player.getX() + "," + this.player.getY()];
      if (item.canPickUp && this.player.addItem(item)) {
        this.level.removeItem(item);
        this.game.messageDisplay.add("you pick up " + item.describeA());
        console.log("you pick up " + item.describeA());
      } else {
        this.game.messageDisplay.add("you see " + item.describeA());
        console.log("you see " + item.describeA());
      }
    }
    const screenWidth = Game.getScreenWidth();
    const screenHeight = Game.getScreenHeight();
    let topLeftX = Math.max(0, this.player.getX() - screenWidth / 2);
    topLeftX = Math.min(topLeftX, this.level.width - screenWidth);

    let topLeftY = Math.max(0, this.player.getY() - screenHeight / 2);
    topLeftY = Math.min(topLeftY, this.level.height - screenHeight);

    const fov = new ROT.FOV.PreciseShadowcasting((x, y) => {
      if (map.getTile(x, y)) {
        return !map.getTile(x, y).blocksLight;
      }

      return false;
    });

    const visibleTiles = {};
    const exploredTiles = this.level.exploredTiles;
    fov.compute(this.player.getX(), this.player.getY(), 10, function(
      x,
      y,
      r,
      visibility
    ) {
      visibleTiles[x + "," + y] = true;
      exploredTiles[x + "," + y] = true;
    });

    for (var x = topLeftX; x < topLeftX + screenWidth; x++) {
      for (var y = topLeftY; y < topLeftY + screenHeight; y++) {
        const tile = map.getTile(x, y);
        if (visibleTiles[x + "," + y]) {
          display.draw(
            x - topLeftX,
            y - topLeftY,
            tile.getChar(),
            tile.getFg(),
            tile.getBg()
          );
        } else if (this.level.exploredTiles[x + "," + y]) {
          display.draw(
            x - topLeftX,
            y - topLeftY,
            tile.getChar(),
            Colors.darkBlue,
            Colors.black
          );
        }
      }
    }

    Object.keys(items).forEach(itemKey => {
      const [x, y] = itemKey.split(",");
      const item = items[itemKey];
      if (visibleTiles[x + "," + y]) {
        display.draw(
          parseInt(x) - topLeftX,
          parseInt(y) - topLeftY,
          item.getChar(),
          item.getFg(),
          item.getBg()
        );
      }
    });

    const entities = this.level.getEntities();
    Object.values(entities).forEach(entity => {
      if (visibleTiles[entity.getX() + "," + entity.getY()]) {
        display.draw(
          entity.getX() - topLeftX,
          entity.getY() - topLeftY,
          entity.getChar(),
          entity.getFg(),
          entity.getBg()
        );
      }
    });
    display.draw(
      this.player.getX() - topLeftX,
      this.player.getY() - topLeftY,
      this.player.getChar(),
      this.player.getFg(),
      this.player.getBg()
    );
    if (this.subscreen) {
      this.subscreen.render(Game);
      return;
    }
  }
}

export default playScreen;
