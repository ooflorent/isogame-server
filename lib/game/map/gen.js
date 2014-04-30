module.exports = function(width, height, percentWalls) {
  var map = [];

  var row;
  var col;
  var wall;

  // Add walls
  for (row = 0; row < height; row++) {
    map[row] = [];
    for (col = 0; col < width; col++) {
      if (!row || !col || row === height - 1 || col === width - 1) {
        wall = 1;
      } else if (row === height / 2 | 0) {
        wall = 0;
      } else {
        wall = Math.random() < percentWalls ? 1 : 0;
      }

      map[row][col] = wall;
    }
  }

  // Add caves
  for (row = 0; row < height; row++) {
    for (col = 0; col < width; col++) {
      var numWalls = 0;
      for (var y = row - 1; y < row + 2; y++) {
        for (var x = col - 1; x < col + 2; x++) {
          if (y !== row || x !== col) {
            if (y < 0 || y >= height || x < 0 || x >= width || map[y][x]) {
              numWalls++;
            }
          }
        }
      }

      map[row][col] = (map[row][col] && numWalls > 3 || numWalls > 4) ? 1 : 0;
    }
  }

  return map;
};
