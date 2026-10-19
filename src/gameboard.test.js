import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
let gameboard;
let ship;
beforeEach(() => {
    gameboard = new Gameboard(10, 10);
    ship = new Ship(3);
});

test("checkBox() return empty", () => {
    expect(gameboard.checkBox(1, 2)).toBe("empty");
});
test("checkBox() return miss", () => {
    gameboard.receiveAttack(2, 3);
    expect(gameboard.checkBox(2, 3)).toEqual("miss");
});
test("checkBox() return ship", () => {
    gameboard.placeShip(ship, 1, 3, "horizontal");
    expect(gameboard.checkBox(1, 5)).toEqual("ship");
});
