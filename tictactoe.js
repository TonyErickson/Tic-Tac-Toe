// Elements and variables
const PlayerX = 'X';
const PlayerO = 'O';
const tiles = document.querySelectorAll(".tile");
let isX=true;
let turn = PlayerX;
const boardState = Array(tiles.length);
boardState.fill(null);

const line = document.getElementById("line");
const gameResults = document.getElementById("game-results");
const gameStatus = document.getElementById("game-status");
const gameRestart = document.getElementById("game-restart");

gameRestart.addEventListener("click", newGame);

// this function shows whos turn it is
function whoseTurn(){
    let temp = isX;
    if(isX){
        temp="X";  
        $(`#whosTurn`).text(`Team O's Turn`);
    } else {
        temp="O";
        $(`#whosTurn`).text(`Team X's Turn`);
    }
    isX=!isX;
    return temp;
}

tiles.forEach((tile) => tile.addEventListener("click", tileClick));
// this allows users to see their X or O in the tile box before the select it
function setHoverTile() {
    tiles.forEach((tile) => {
        tile.classList.remove("x-hover");
        tile.classList.remove("o-hover");
    });
    const hoverClass = `${turn.toLowerCase()}-hover`;

    tiles.forEach((tile) => {
        if(tile.innerText == "") {
            tile.classList.add(hoverClass);
        }
    });
}

setHoverTile();

// this is the function that allows a player to select a tile and put their X or O in it
function tileClick(event){
    if (gameResults.classList.contains("visible")) {
        return;
    }
    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if(tile.innerText != "") {
        return;
    }
    
    if(turn === PlayerX) {
        tile.innerText= PlayerX;
        boardState[tileNumber -1] = PlayerX;
        turn = PlayerO;
    } else {
        tile.innerText = PlayerO;
        boardState[tileNumber - 1] = PlayerO;
        turn = PlayerX
    }
    setHoverTile();
    whoseTurn();
    whoWon();
}
// the options for how a player can win and the red line that shows the 3 in a row
const winnerOptions = [
    {combo: [1,2,3], lineClass: "line-row-1"},
    {combo: [4,5,6], lineClass: "line-row-2"},
    {combo: [7,8,9], lineClass: "line-row-3"},

    {combo: [1,4,7], lineClass: "line-column-1"},
    {combo: [2,5,8], lineClass: "line-column-2"},
    {combo: [3,6,9], lineClass: "line-column-3"},

    {combo: [1,5,9], lineClass: "line-diagonal-right"},
    {combo: [3,5,7], lineClass: "line-diagonal-left"},
]
// Checking to see if X or O won or if its a tie //
function whoWon() {

    for (const winnerOption of winnerOptions) {
    
    const { combo, lineClass } = winnerOption;
    const tileValue1 = boardState[combo[0] - 1];
    const tileValue2 = boardState[combo[1] - 1];
    const tileValue3 = boardState[combo[2] - 1];

    if(tileValue1!= null && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
            line.classList.add(lineClass);
            gameOver(tileValue1);
            whoseTurn();
            return;
        }
    }       
    const allTileFilled = boardState.every((tile) => tile !== null);
    if (allTileFilled) {
        gameOver(null);
        whoseTurn();
    }
}
// this function clears the baord and restarts the game
function newGame () {
    line.className = 'line';
    gameResults.className = 'hidden';
    boardState.fill(null);
    tiles.forEach((tile) => (tile.innerText = ""));
    turn = PlayerX;
    setHoverTile();
    location.reload();
     
}
// displaying who won the game and the button to restart the game and play again
function gameOver (winnerMessage){
    let message = "It's a Tie!"
    if (winnerMessage != null) {
        message = `Winner is ${winnerMessage}!`;
    }
    gameResults.className = "visible";
    gameStatus.innerText = message;
}

