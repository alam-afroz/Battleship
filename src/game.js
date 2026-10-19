import { Player } from "./player.js";
import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

function game(player1Name, player2Name) {
    let player1 = new Player("human", player1Name);
    let player2;
    if (player2 != "Bot") {
        player2 = new Player("human", player2Name);
    }
    player2 = new Player("bot", "bot");
    renderGameboard1(player1.gameboard);
    renderGameboard2(player2.gameboard);
    setShips(player1);
    setShips(player2);
    reRenderGameboard(player1.gameboard, true);
    reRenderGameboard(player2.gameboard, false);
    // for (let i = 0; i < player1.gameboard.ships.length; i++) {
    //     while (player1.gameboard.ships[i].isSunk() === false) {
    //         player1.gameboard.ships[i].hit();
    //     }
    // }
}
function checkForFleetSunk(player1, player2) {
    let over = false;
    // console.log(player1.gameboard.checkAllSunk());
    if (
        player1.gameboard.checkAllSunk() === true ||
        player2.gameboard.checkAllSunk() === true
    ) {
        over = true;
    }
    return over;
}

// this function should be deleted later and a better system should be implemented

function setShips(player) {
    let ship2 = new Ship(2);
    let ship3 = new Ship(3);
    let ship4 = new Ship(4);
    let ship5 = new Ship(5);
    player.gameboard.placeShip(ship2, 1, 2, "vertical");
    player.gameboard.placeShip(ship3, 2, 3, "vertical");

    player.gameboard.placeShip(ship4, 4, 4, "vertical");
    player.gameboard.placeShip(ship5, 5, 6, "vertical");

    reRenderGameboard(player.gameboard);

    // return { player };
}

function reRenderGameboard(gameboard, player1) {
    if (player1 === true) {
        document.querySelector(".board").replaceChildren();
        for (let i = 0; i < gameboard.grid.length; i++) {
            for (let j = 0; j < gameboard.grid[i].length; j++) {
                const box = document.createElement("div");
                if (gameboard.grid[i][j] != "") {
                    box.classList.add("ship");
                } else {
                    box.classList.add("box");
                }
                box.dataset.row = i;
                box.dataset.column = j;
                document.querySelector(".board").appendChild(box);
            }
        }
    } else {
        document.querySelector(".board2").replaceChildren();
        for (let i = 0; i < gameboard.grid.length; i++) {
            for (let j = 0; j < gameboard.grid[i].length; j++) {
                const box_opp = document.createElement("div");
                if (gameboard.grid[i][j] != "") {
                    box_opp.classList.add("ship_opp");
                } else {
                    box_opp.classList.add("box_opp");
                }
                box_opp.dataset.row = i;
                box_opp.dataset.column = j;
                document.querySelector(".board2").appendChild(box_opp);
            }
        }
    }
}

const gameArea = document.createElement("div");
gameArea.id = "game_area";
function renderGameboard1(gameboard) {
    document.querySelector(".container").appendChild(gameArea);

    const board = document.createElement("div");
    board.classList.add("board");
    gameArea.appendChild(board);

    for (let i = 0; i < gameboard.grid.length; i++) {
        for (let j = 0; j < gameboard.grid[i].length; j++) {
            const box = document.createElement("div");

            box.classList.add("box");

            box.dataset.row = i;
            box.dataset.column = j;
            document.querySelector(".board").appendChild(box);
        }
    }
}
function renderGameboard2(gameboard) {
    const board2 = document.createElement("div");
    board2.classList.add("board2");
    gameArea.appendChild(board2);

    for (let i = 0; i < gameboard.grid.length; i++) {
        for (let j = 0; j < gameboard.grid[i].length; j++) {
            const boxOpp = document.createElement("div");

            boxOpp.classList.add("box_opp");

            boxOpp.dataset.row = i;
            boxOpp.dataset.column = j;
            document.querySelector(".board2").appendChild(boxOpp);
        }
    }
}

export { game };
