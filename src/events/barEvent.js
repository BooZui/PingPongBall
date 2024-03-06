export default class BarEvent {
  constructor() {
    this.keys = [];
  
    window.addEventListener("keydown", (event) => {
      if (
        (event.key === "a" || event.key === "d") &&
        this.keys.indexOf(event.key) === -1
      ) {
        this.keys.push(event.key);
      }
    });
  
    window.addEventListener("keyup", (event) => {
      if (event.key === "a" || event.key === "d") {
        this.keys.splice(this.keys.indexOf(event.key), 1);
      }
    });
  }
}
