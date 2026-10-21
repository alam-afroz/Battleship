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
    giveCommand(player1);
    // for (let i = 0; i < player1.gameboard.ships.length; i++) {
    //     while (player1.gameboard.ships[i].isSunk() === false) {
    //         player1.gameboard.ships[i].hit();
    //     }
    // }
    attackHandler(player1, player2);
}

function attackHandler(player1, player2) {
    let board1 = document.querySelector(".board");
    let board2 = document.querySelector(".board2");
    // below is a fix for latest work in the commit
    board2.style.pointerEvents = "none";
    board1.addEventListener("click", (e) => {
        let box = e.target;

        let r = box.dataset.row;
        let c = box.dataset.column;

        // land attack
        // giveCommand(player1);
        landAttack(box, player1, r, c, board1, board2, player2);

        // change board1 to board

        // change command

        //rerender board
        // check win condition

        //board2 event
    });
    board2.addEventListener("click", (e) => {
        let box = e.target;
        // console.log(box, "box");
        // return;
        let r = box.dataset.row;
        let c = box.dataset.column;

        // land attack
        // giveCommand(player1);

        changeTurn(box, player1, r, c, board1, board2, player2);
        // change board1 to board

        // change command

        //rerender board
        // check win condition

        //board2 event
    });
}

function checkForFleetSunk(player1, player2) {
    let over = false;
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
                if (gameboard.grid[i][j] instanceof Ship) {
                    box.classList.add("ship");
                }
                if (gameboard.grid[i][j] === "") {
                    box.classList.add("box");
                }
                for (let k = 0; k < gameboard.missed.length; k++) {
                    if (
                        gameboard.missed[k][0] == i &&
                        gameboard.missed[k][1] == j
                    ) {
                        console.log("r", i, gameboard.missed[k][0]);

                        box.className = "";
                        box.classList.add("miss");
                    }
                }

                for (let c = 0; c < gameboard.allHits.length; c++) {
                    if (
                        gameboard.allHits[c][0] == i &&
                        gameboard.allHits[c][1] == j
                    ) {
                        box.className = "";

                        box.classList.add("hit");
                    }
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
                if (gameboard.grid[i][j] instanceof Ship) {
                    box_opp.classList.add("ship_opp");
                }
                if (gameboard.grid[i][j] === "") {
                    box_opp.classList.add("box_opp");
                }
                for (let k = 0; k < gameboard.missed.length; k++) {
                    if (
                        gameboard.missed[k][0] == i &&
                        gameboard.missed[k][1] == j
                    ) {
                        box_opp.className = "";
                        box_opp.classList.add("miss_opp");
                    }
                }

                for (let c = 0; c < gameboard.allHits.length; c++) {
                    if (
                        gameboard.allHits[c][0] == i &&
                        gameboard.allHits[c][1] == j
                    ) {
                        box_opp.className = "";

                        box_opp.classList.add("hit_opp");
                    }
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

function giveCommand(player1) {
    let command = document.createElement("p");
    command.id = "command";
    document.getElementById("game_area").appendChild(command);
    document.getElementById("command").textContent = `${player1.name}'s Turn`;
}

//functions for attackhandler

function landAttack(box, player1, r, c, board1, board2, player2) {
    if (box.classList.contains("miss") || box.classList.contains("hit")) {
        document.getElementById("command").textContent =
            "Where you clicking, bro ?";
        return;
    }

    if (box.classList.contains("box")) {
        player1.gameboard.receiveAttack(r, c);
        updateCommand(player1);
    }
    if (box.classList.contains("ship")) {
        player1.gameboard.receiveAttack(r, c);
        updateCommand(player1);
    }

    boardChange(board1, board2, player1);
    updateCommand(player2);
    // if (!playerIsOne) updateCommand(player2);
    reRenderGameboard(player1.gameboard, true);
    // if (!playerIsOne) reRenderGameboard(player1.gameboard, false);
    if (checkForWin(player1, board1)) return;

    return;
}
function removeDuplicates(array) {
    const temp = new Set();

    return array.filter((item) => {
        const key = JSON.stringify(item);
        if (temp.has(key)) {
            return false;
        }
        temp.add(key);
        return true;
    });
}

function changeTurn(box, player1, r, c, board1, board2, player2) {
    // const box = e.target;
    // const r = box.dataset.row;
    // const c = box.dataset.column;
    if (
        box.classList.contains("miss_opp") ||
        box.classList.contains("hit_opp")
    ) {
        document.getElementById("command").textContent =
            "Where you clicking, bro ?";
        return;
    }
    if (box.classList.contains("box_opp")) {
        player2.gameboard.receiveAttack(r, c);
        updateCommand(player2);
    }
    if (box.classList.contains("ship_opp")) {
        player2.gameboard.receiveAttack(r, c);
        updateCommand(player2);
    }
    boardChange(board2, board1, player2);
    updateCommand(player1);
    reRenderGameboard(player2.gameboard, false);
    let temp = removeDuplicates(player2.gameboard.allHits);
    player2.gameboard.allHits = temp;
    if (checkForWin(player2, board2)) return;
    return;
}
function boardChange(currBoard, nextBoard, player) {
    // player parameter is only used for console.log() after the game is finished remove it.
    currBoard.style.pointerEvents = "none";
    currBoard.style.cursor = "not-allowed";
    nextBoard.style.pointerEvents = "auto";
    nextBoard.style.cursor = "pointer";
    consoleBoard(player);
}
function updateCommand(player) {
    document.getElementById("command").textContent = `${player.name}'s Turn`;
}

function checkForWin(player, board) {
    if (player.gameboard.checkAllSunk() === true) {
        board.style.pointerEvents = "none";
        document.getElementById("command").textContent = `${player.name} Won`;
        return true;
    }
}

// consoleBoard function is only used for console.log(gameboard) after the game is finished remove it.
function consoleBoard(player) {
    console.clear();
    console.table(player.gameboard.grid);
}

export { game };
