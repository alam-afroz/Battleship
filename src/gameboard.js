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
            this.grid[row][column] = "hit";
        }
        if (this.grid[row][column] === "") {
            this.missed.push([row, column]);
            this.grid[row][column] = "miss";
        }
    }
    checkAllSunk() {
        let sunked = 0;
        for (let i = 0; i < this.ships.length; i++) {
            if (this.ships[i].isSunk() === true) {
                sunked++;
            }
        }
        console.log("sunked", sunked);
        if (sunked === this.ships.length) {
            return true;
        }
        return false;
    }
    checkBox(row, column) {
        if (this.grid[row][column] === "") {
            return "empty";
        }
        if (this.grid[row][column] === "miss") {
            return "miss";
        }
        if (this.grid[row][column] === "hit") {
            return "hit";
        }
        if (this.grid[row][column] instanceof Ship) {
            return "ship";
        }
    }
}

export { Gameboard };
