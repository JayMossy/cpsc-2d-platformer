var game = document.getElementById("game");

var rows = 120;
var cols = 160;

for (var row = 0; row < rows; row++) {
    for (var col = 0; col < cols; col++) {

        var tile = document.createElement("div");
        tile.classList.add("tile");

        // Defaults everything to sky first
        tile.classList.add("sky");

        // Basic Walls, copy and paste for more walls, adjust row/col numbers as needed

            // ----- VERTICAL WALL -----

            if (col == 0 && row >= 0 && row <= 160) {
                tile.classList.remove("sky");
                tile.classList.add("wall");
            }

            // ----- horizontal WALL -----

            if (row == 160 && col >= 0 && col <= 120) {
                tile.classList.remove("sky");
                tile.classList.add("wall");
            }
    

        // ----- INSIDE FILL AREA -----
        if (
            row > 0 && row < 120 &&
            col > 0 && col < 160
        ) {

            // Avoid replacing walls
            if (!tile.classList.contains("wall")) {

                // Add grass
                tile.classList.remove("sky");
                tile.classList.add("grass");

                // Add dirt path area
                if (row > 45 && row < 55) {
                    tile.classList.remove("grass");
                    tile.classList.add("dirt");
                }

                // Random flowers
                var random = Math.floor(Math.random() * 100);
                if (random < 2) {
                    tile.classList.remove("grass");
                    tile.classList.add("flower");
                }
            }
        }

        game.appendChild(tile);
    }
}