import { Gameboard } from "./gameboard.js";

class Player {
    constructor(type, name) {
        this.type = type;
        this.name = name;
        this.gameboard = new Gameboard(10, 10);
    }
}
export { Player };
