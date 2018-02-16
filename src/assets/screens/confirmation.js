class Confirmation {
  constructor(func) {
    this.function = func;
    this.display = document.createElement;
  }
  render() {
    document.body.appendChild(this.display);
  }
}
