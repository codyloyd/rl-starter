import Colors from "./colors";

class Glyph {
  constructor({ fg = Colors.white, bg = Colors.black, char = " " }) {
    this.fg = fg;
    this.bg = bg;
    this.char = char;
  }
  getFg() {
    return this.fg;
  }
  getBg() {
    return this.bg;
  }
  getChar() {
    return this.char;
  }
}

export default Glyph;
