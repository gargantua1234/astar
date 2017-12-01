class Board {
    constructor(columns, rows) {
        this.columns = columns;
        this.rows = rows;
        this.board = this.createTwoDimensionalBoard(columns, rows);
    }

    createTwoDimensionalBoard(columns, rows) {
        let result = new Array(columns);

        for (let i = 0; i < result.length; i++)
            result[i] = new Array(rows);

        return result;
    }

    fillTheBoard(width, height) {
        for (let i = 0; i < this.board.length; i++)
            for (let j = 0; j < this.board[i].length; j++)
                this.board[i][j] = new Point(i, j, width, height, this.columns, this.rows);
    }

    addNeighbours() {
        for (let i = 0; i < this.board.length; i++)
            for (let j = 0; j < this.board[i].length; ++j) {
                this.board[i][j].addNeighbour(this.board);
            }
    }

    setStartAndEnd() {
        this.board[0][0].wall = false;
        this.board[this.columns - 1][this.rows - 1].wall = false;
        this.board[this.columns - 1][this.rows - 1].ending = true;
    }

    showPoints() {
        for (let i = 0; i < this.board.length; ++i)
            for (let j = 0; j < this.board[i].length; ++j)
                this.board[i][j].show(color(255));
    }

}