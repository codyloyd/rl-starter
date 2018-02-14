import Colors from "./colors";

class PlayerStatusDisplay {
  constructor(width = 800) {
    this.playerStatus = document.createElement("div");
    Object.assign(this.playerStatus.style, {
      width: "800px",
      "font-size": "15px",
      "letter-spacing": "1px",
      background: Colors.black,
      color: Colors.white,
      "font-family": "Courier, monospace",
      height: "18px",
      overflow: "hidden"
    });

    this.playerStatus.textContent = "  ";
  }
  getDisplay() {
    return this.playerStatus;
  }

  render({ name = "Player Name", hp, maxHp }) {
    this.playerStatus.innerHTML = "";
    this.playerStatus.innerHTML = `${name} ♥${hp}/${maxHp}`;
  }
}

export default PlayerStatusDisplay;
