import { Player } from "../player.js";
import { game } from "../game.js";

const formPlayer1 = document.getElementById("player1_form");
const formPlayer2 = document.getElementById("player2_form");
const humanBtn = document.getElementById("human");
const botBtn = document.getElementById("bot");
const container = document.querySelector(".container");
function takeUserInput() {
    formPlayer1.addEventListener("submit", (e) => {
        e.preventDefault();
        //extracting player1name
        const player1Name = Object.fromEntries(
            new FormData(formPlayer1)
        ).player1;
        console.log(player1Name);
        // changing input box style after filling up
        document.getElementById("player1").style.outline =
            "3px solid var(--success-dark)";
        document.getElementById("player1").style.border = "none";
        document.getElementById("player1").style.textAlign = "center";
        document.getElementById("player1").style.borderRadius = "12px ";
        // changing command to fill opponent details
        document.getElementById("command").textContent = "Choose Opponent";
        // choosed bot
        botBtn.addEventListener("click", () => {
            document.getElementById("opponent").style.textAlign = "center";
            document.getElementById("opponent").style.outline =
                "2px solid var(--success-dark)";
            document.getElementById("opponent").style.color = "black";
            document.getElementById("opponent").style.border = "none";
            document.getElementById("opponent").disabled = true;
            document.getElementById("command").textContent =
                "Opponent is selected";
            document.getElementById("command").style.color =
                "var(--success-dark)";
            //submit form
            formPlayer2.addEventListener("submit", (e) => {
                e.preventDefault();
                //extracting player1name

                document.getElementById("opponent").value = "Bot";

                let player2 = document.getElementById("opponent").value;

                // replace content of .container
                container.replaceChildren();
                //start game, place ships
                game(player1Name, player2);
            });
        });
    });
}

function promptUserToFillPlayerFirst() {
    botBtn.addEventListener("click", () => {
        document.getElementById("command").textContent =
            "Enter Player Name First";
        document.getElementById("command").style.color = "var(--error)";
    });
    humanBtn.addEventListener("click", () => {
        document.getElementById("command").textContent =
            "Enter Player Name First";
        document.getElementById("command").style.color = "var(--error)";
    });
}
function promptUserToSelectPlayer2() {
    formPlayer2.addEventListener("submit", (e) => {
        e.preventDefault();
        document.getElementById("command").textContent = "Select the opponent";
        document.getElementById("command").style.color = "var(--error)";
    });
}

export {
    takeUserInput,
    promptUserToFillPlayerFirst,
    promptUserToSelectPlayer2,
};
