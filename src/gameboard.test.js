import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
let gameboard;
let ship;
beforeEach(() => {
    gameboard = new Gameboard(10, 10);
    ship = new Ship(3);
});

test("Gameboard has property row", () => {
    expect(gameboard).toHaveProperty("row", 10);
});
test("Gameboard has property column", () => {
    expect(gameboard).toHaveProperty("column", 10);
});
test("Gameboard grid has 10 rows", () => {
    expect(gameboard.grid.length).toBe(10);
});
test("Every row in grid has column of length 10", () => {
    expect(gameboard.grid[1].length).toBe(10);
});
test("every box is an empty string at beginning", () => {
    expect(gameboard.grid[1][1]).toBe("");
});
test("placeShip() places ships vertically on place", () => {
    gameboard.placeShip(ship, 1, 3, "vertical");
    for (let i = 0; i < 3; i++) {
        expect(gameboard.grid[1 + i][3]).toEqual(new Ship(3));
    }
});
test("placeShip() places ships horizotally on place", () => {
    gameboard.placeShip(ship, 1, 3, "horizontal");
    for (let i = 0; i < 3; i++) {
        expect(gameboard.grid[1][3 + 1]).toEqual(new Ship(3));
    }
});
test("placeShip() updates ships property in Gameboard", () => {
    gameboard.placeShip(ship, 1, 3, "horizontal");
    for (let i = 0; i < 3; i++) {
        expect(gameboard.ships).toEqual([new Ship(3)]);
    }
});
test("receiveAttack() works when a ship is hit", () => {
    gameboard.placeShip(ship, 1, 3, "horizontal");
    gameboard.receiveAttack(1, 3);
    expect(ship.hits).toEqual(1);
});
test("receiveAttack() works when there is a miss", () => {
    gameboard.placeShip(ship, 1, 3, "horizontal");
    gameboard.receiveAttack(2, 3);
    expect(gameboard.missed).toEqual([[2, 3]]);
});
