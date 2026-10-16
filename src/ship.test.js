import { Ship } from "./ship.js";

let ship;
beforeEach(() => {
    ship = new Ship(4);
});

test("Ship class has length property", () => {
    expect(ship).toHaveProperty("length", 4);
});
test("Ship class has hits property", () => {
    expect(ship).toHaveProperty("hits", 0);
});
test("Ship class has sunk property", () => {
    expect(ship).toHaveProperty("sunk", false);
});
test("Ship hit incremented", () => {
    expect(ship.isSunk()).toBe(true);
});
