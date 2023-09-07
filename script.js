let x_turn = true;

// Query of all buttons in the grid
let buttons = document.querySelectorAll("button.item");

// Display of whose turn it is
let currTurn = document.getElementById("current-turn");

/**
 * Disables the button after it has been ticked by the player, changes the current turn to the other player's, and changes the current turn display
 *
 * @param {*} gridItem Button. the button that has been ticked by the player
 */
function doTurn(gridItem) {
    if (x_turn) {
        gridItem.innerHTML = '<span class="material-icons md-48">close</span>';
        currTurn.innerText = "O";
        currTurn.style.color = "aquamarine";
    }

    if (!x_turn) {
        gridItem.innerHTML =
            '<span class="material-icons md-48">radio_button_unchecked</span>';
        currTurn.innerText = "X";
        currTurn.style.color = "crimson";
    }

    gridItem.disabled = true;

    checkWin(x_turn);

    x_turn = !x_turn;
}

/**
 * checks for the winning combinations on the grid. If a winning combination is found,
 * it disables all buttons in the grid, changes the background to red and text color to white of the line combination,
 * and shows an alert message stating that a player has won.
 *
 * @param x_turn boolean. TRUE if it is player X's turn, FALSE if not
 */
function checkWin(x_turn) {
    // Winning combinations
    const line_combinations = [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const lines of line_combinations) {
        let [first, second, third] = lines;

        let turn_symbol = x_turn ? "close" : "radio_button_unchecked";

        if (
            buttons[first].innerHTML.includes(turn_symbol) &&
            buttons[second].innerHTML.includes(turn_symbol) &&
            buttons[third].innerHTML.includes(turn_symbol)
        ) {
            buttons.forEach((button) => {
                button.disabled = true;
            });

            setWinnerStyles([first, second, third]);

            alert(x_turn ? "X is the winner" : "O is the winner");
            currTurn.style.visibility = "hidden";
            return;
        }
    }

    checkDraw();
}

/**
 * checks if all buttons in the grid have been ticked. If all buttons are ticked, then all buttons will be disabled and an alert stating that the match is a draw will appear.
 */
function checkDraw() {
    let total_tic_tac = 0;
    buttons.forEach((button) => {
        if (button.innerHTML !== null && button.innerHTML !== "") {
            total_tic_tac++;
        }
    });

    if (total_tic_tac === 9) {
        alert("The match is a draw");
        currTurn.style.visibility = "hidden";
    }
}

/**
 * sets the background color to red and text color to white of the winning line combination
 *
 * @param {*} indexes Array. a list of integers containing the indexes of the winning line combination.
 */
function setWinnerStyles(indexes) {
    indexes.forEach((index) => {
        buttons[index].style.backgroundColor = "crimson";
        buttons[index].style.color = "white";
    });
}
