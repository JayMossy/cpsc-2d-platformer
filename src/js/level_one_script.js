var game = document.getElementById("game");

var rows = 120;
var cols = 160;

for (var row = 0; row < rows; row++) {
    for (var col = 0; col < cols; col++) {

        var tile = document.createElement("div");
        tile.classList.add("tile");

        // Defaults everything to sky first
        tile.classList.add("sky");

            // ----- VERTICAL WALL 1 -----

            if (col == 10 && row >= 5 && row <= 100) {
                tile.classList.remove("sky");
                tile.classList.add("wall");
            }

            // ----- VERTICAL WALL 2 -----

            if (col == 20 && row >= 5 && row <= 70) {
                tile.classList.remove("sky");
                tile.classList.add("wall");
            }

            // ----- VERTICAL WALL 3 -----

            if (col == 80 && row >= 5 && row <= 70) {
                tile.classList.remove("sky");
                tile.classList.add("wall");
            }

            // ----- VERTICAL WALL 4 -----

            if (col == 90 && row >= 5 && row <= 40) {
                tile.classList.remove("sky");
                tile.classList.add("wall");
            }

            // ----- VERTICAL WALL 5 -----

            if (col == 110 && row >= 70 && row <= 100) {
                tile.classList.remove("sky");
                tile.classList.add("wall");
            }

            // ----- VERTICAL WALL 6 -----

            if (col == 140 && row >= 40 && row <= 70) {
                tile.classList.remove("sky");
                tile.classList.add("wall");
            }

            // ----- horizontal WALL 1 -----

            if (row == 5 && col >= 10 && col <= 20) {
                tile.classList.remove("sky");
                tile.classList.add("wall");
            }

            // ----- horizontal WALL 2 -----

            if (row == 5 && col >= 80 && col <= 90) {
                tile.classList.remove("sky");
                tile.classList.add("wall");
            }

            // ----- horizontal WALL 2 -----

            if (row == 5 && col >= 80 && col <= 90) {
                tile.classList.remove("sky");
                tile.classList.add("wall");
            }

            // ----- horizontal WALL 3 -----

            if (row == 40 && col >= 90 && col <= 140) {
                tile.classList.remove("sky");
                tile.classList.add("wall");
            }

            // ----- horizontal WALL 4 -----

            if (row == 70 && col >= 20 && col <= 80) {
                tile.classList.remove("sky");
                tile.classList.add("wall");
            }

            // ----- horizontal WALL 5 -----

            if (row == 70 && col >= 110 && col <= 140) {
                tile.classList.remove("sky");
                tile.classList.add("wall");
            }

            // ----- horizontal WALL 5 -----

            if (row == 100 && col >= 10 && col <= 110) {
                tile.classList.remove("sky");
                tile.classList.add("wall");
            }

        game.appendChild(tile);
    }
}