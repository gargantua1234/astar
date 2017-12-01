let columns = 25;
let rows = 25;
let board;
let algorithm;

function setup() {
    CanvasUtils.prepareCanvas(400, 400);
    board = new Board(columns, rows);
    board.fillTheBoard(width / columns, height / rows);
    board.addNeighbours();
    board.setStartAndEnd();
    algorithm = new AStar(board);
}

function draw() {
    algorithm.findShortestPath();
}