import React, { useState } from "react";
import PathFinder from "./PathFinder";

function PathFinderComponent() {
  const matrix = [
    [1, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 1, 1],
  ];

  const [visited, setVisited] = useState([]);
  const [pathFound, setPathFound] = useState(false);
  const findPath = () => {
    const pathFinder = new PathFinder(matrix);
    const path = pathFinder.findPath();
    // Check if any cells adjacent to the exit were visited
    const isValidPath = pathFinder.isPathValid();
    if (path.length === 0 || !isValidPath) {
      setPathFound(false);
      console.log("Path is not found!");
    } else {
      setPathFound(true);
      console.log("Path is found!");
    }
    setVisited(path);
  };

  return (
    <div className="path-finder">
      <button
        className="button"
        style={{ marginBottom: "20px" }}
        onClick={findPath}
      >
        Find Path
      </button>

      {pathFound ? (
        <div className="path-info">Path found!</div>
      ) : (
        <div className="path-info">Path not found!</div>
      )}
      <div className="grid">
        {matrix.map((row, i) => (
          <div key={i} className="row">
            {row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`cell ${matrix[j][i] === 1 ? "path" : ""} 
          ${pathFound && visited[i] && visited[j][i] ? "valid-path" : ""}
          ${pathFound && visited[i] && !visited[j][i] ? "obstacle" : ""}
          ${!pathFound && matrix[j][i] === 1 ? "invalid-path" : ""}
        `}
              >
                {matrix[j][i]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PathFinderComponent;
