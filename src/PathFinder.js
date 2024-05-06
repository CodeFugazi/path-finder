class PathFinder {
  constructor(matrix) {
    this.matrix = matrix;
    this.rows = matrix.length;
    this.cols = matrix[0].length;
    this.visited = new Array(this.rows)
      .fill(0)
      .map(() => new Array(this.cols).fill(false));
    this.queue = [];
  }

  isValidMove(row, col) {
    return (
      row >= 0 &&
      row < this.rows &&
      col >= 0 &&
      col < this.cols &&
      this.matrix[row][col] === 1 &&
      !this.visited[row][col]
    );
  }

  bfs(startRow, startCol) {
    const rowMoves = [-1, 1, 0, 0]; // left and right
    const colMoves = [0, 0, -1, 1]; // up and down

    this.queue.push([startRow, startCol]);
    this.visited[startRow][startCol] = true;

    while (this.queue.length > 0) {
      const [row, col] = this.queue.shift();

      for (let i = 0; i < 4; i++) {
        const newRow = row + rowMoves[i];
        const newCol = col + colMoves[i];
        if (this.isValidMove(newRow, newCol)) {
          this.queue.push([newRow, newCol]);
          this.visited[newRow][newCol] = true;
        }
      }
    }
  }

  isPathValid() {
    // Check top and bottom edges
    for (let i = 0; i < this.cols; i++) {
      if (this.matrix[0][i] === 1 && this.visited[0][i]) {
        if (this.bfsFromEdge(0, i)) return true;
      }
      if (
        this.matrix[this.rows - 1][i] === 1 &&
        this.visited[this.rows - 1][i]
      ) {
        if (this.bfsFromEdge(this.rows - 1, i)) return true;
      }
    }

    // Check left and right edges
    for (let i = 0; i < this.rows; i++) {
      if (this.matrix[i][0] === 1 && this.visited[i][0]) {
        if (this.bfsFromEdge(i, 0)) return true;
      }
      if (
        this.matrix[i][this.cols - 1] === 1 &&
        this.visited[i][this.cols - 1]
      ) {
        if (this.bfsFromEdge(i, this.cols - 1)) return true;
      }
    }

    return false;
  }

  bfsFromEdge(startRow, startCol) {
    this.queue = [];
    this.visited = new Array(this.rows)
      .fill(0)
      .map(() => new Array(this.cols).fill(false));
    this.bfs(startRow, startCol);

    // Check if the other edge is visited
    if (startRow === 0 || startRow === this.rows - 1) {
      for (let i = 0; i < this.cols; i++) {
        if (this.visited[this.rows - 1 - startRow][i]) return true;
      }
    } else {
      for (let i = 0; i < this.rows; i++) {
        if (this.visited[i][this.cols - 1 - startCol]) return true;
      }
    }

    return false;
  }

  findPath() {
    // Check top and bottom edges
    for (let i = 0; i < this.cols; i++) {
      if (this.matrix[0][i] === 1) {
        this.bfs(0, i);
      }
      if (this.matrix[this.rows - 1][i] === 1) {
        this.bfs(this.rows - 1, i);
      }
    }

    // Check left and right edges
    for (let i = 0; i < this.rows; i++) {
      if (this.matrix[i][0] === 1) {
        this.bfs(i, 0);
      }
      if (this.matrix[i][this.cols - 1] === 1) {
        this.bfs(i, this.cols - 1);
      }
    }

    // Check if all path cells are visited
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.matrix[i][j] === 1 && !this.visited[i][j]) {
          return []; // Not all path cells are visited
        }
      }
    }

    // Check if the path is valid
    if (!this.isPathValid()) {
      return []; // Path is not valid
    }

    return this.visited;
  }
}

export default PathFinder;
