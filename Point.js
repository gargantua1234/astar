class Point {

    constructor(i, j, width, height, columnsNo, rowsNo) {
        this.i = i;
        this.j = j;
        this.columns = columnsNo;
        this.rows = rowsNo;
        this.width = width;
        this.height = height;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.neighbours = [];
        this.previous = undefined;
        this.wall = false;
        this.ending = false;

        this.createWall();
    }

    createWall() {
        if (random(1) < 0.3)
            this.wall = true;
    }

    addNeighbour(table) {
        let i = this.i;
        let j = this.j;
        if (i < this.columns - 1)
            this.neighbours.push(table[i + 1][j]);
        if (i > 0)
            this.neighbours.push(table[i - 1][j]);
        if (j < this.rows - 1)
            this.neighbours.push(table[i][j + 1]);
        if (j > 0)
            this.neighbours.push(table[i][j - 1]);
    }


    show(kolor) {
        fill(kolor)
        if (this.wall) {
            fill(0);
        }
        if (this.ending)
            fill(255, 255, 0);
        noStroke();
        rect(this.i * this.width, this.j * this.height, this.width - 1, this.height - 1);
    }


}