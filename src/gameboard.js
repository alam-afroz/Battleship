import { Ship } from "./ship.js";

class Gameboard {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.grid = new Array(row);
        for (let i = 0; i < column; i++) {
            this.grid[i] = new Array(column).fill("");
        }
        this.missed = [];
        this.ships = [];
    }
    placeShip(ship, row, column, alignment) {
        if (alignment === "vertical") {
            for (let j = 0; j < ship.length; j++) {
                this.grid[row + j][column] = ship;
            }
        }
        if (alignment === "horizontal") {
            for (let k = 0; k < ship.length; k++) {
                this.grid[row][column + k] = ship;
            }
        }
        this.ships.push(ship);
    }
    receiveAttack(row, column) {
        if (this.grid[row][column] instanceof Ship) {
            this.grid[row][column].hit();
        }
        if (this.grid[row][column] === "") {
            this.missed.push([row, column]);
        }
    }
}

export { Gameboard };
