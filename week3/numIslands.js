// https://leetcode.com/problems/number-of-islands/
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  let count = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!visited[row][col] && grid[row][col] === "1") {
        dfs(grid, visited, row, col);
        count++;
      }
    }
  }
  console.log(count);
  return count;
};

const dfs = (grid, visited, row, col) => {
  const rows = grid.length;
  const cols = grid[0].length;
  if (row < 0 || col < 0 || row >= rows || col >= cols) return;
  if (visited[row][col] || grid[row][col] === "0") return;
  visited[row][col] = true;
  dfs(grid, visited, row, col + 1);
  dfs(grid, visited, row - 1, col);
  dfs(grid, visited, row + 1, col);
  dfs(grid, visited, row, col - 1);
};

numIslands([
  ["1", "1", "0", "0", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"],
]);