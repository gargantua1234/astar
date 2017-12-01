class AStar {
    constructor(table) {
        this.table = table;
        this.openSet = [];
        this.closedSet = [];
        this.shortestPath = [];
        this.openSet.push(this.table.board[0][0]);
        this.wanted = this.table.board[24][24];
    }

    findShortestPath() {
        if (this.arePointsToCheck()) {
            let current = this.findPointWithLowestF();

            this.checkIfEnd(current);
            this.markChecked(current);
            this.proceedNeighbours(current);
            this.updateShortestPath(current);
        } else {
            this.noPath();
        }

        this.showActualResults();
    }

    arePointsToCheck() {
        return this.openSet.length > 0;
    }

    findPointWithLowestF() {
        let indexOfLowest = 0;
        for (let i = 0; i < this.openSet.length; i++) {
            if (this.openSet[i].f < this.openSet[indexOfLowest].f)
                indexOfLowest = i;
        }

        return this.openSet[indexOfLowest];
    }

    checkIfEnd(point) {
        if (point === this.wanted) {
            noLoop();
            document.querySelector("#result").innerHTML = "Koniec";
        }

    }

    markChecked(point) {
        this.openSet = this.removeChecked(this.openSet, point);
        this.closedSet.push(point);
    }

    removeChecked(pool, element) {
        for (let i = pool.length - 1; i >= 0; i--) {
            if (pool[i] == element)
                pool.splice(i, 1);
        }
        return pool;
    }

    proceedNeighbours(point) {
        let neighbours = point.neighbours;
        for (let i = 0; i < neighbours.length; i++) {
            let neighbour = neighbours[i];
            if (this.isTransitive(neighbour)) {
                this.updateGValue(neighbour, point);
                this.calculateFValue(neighbour, point);
            }
        }
    }

    isTransitive(point) {
        return !this.closedSet.includes(point) && !point.wall;
    }

    updateGValue(neighbour, point) {
        let tempG = point.g + 1;
        if (this.openSet.includes(neighbour)) {
            if (tempG < neighbour.g)
                neighbour.g = tempG;
        } else {
            neighbour.g = tempG;
            this.openSet.push(neighbour);
        }
    }

    calculateFValue(neighbour, point) {
        neighbour.h = this.calculateDistance(neighbour, this.wanted);
        neighbour.f = neighbour.g + neighbour.h;
        neighbour.previous = point;
    }

    calculateDistance(a, b) {
        let d = abs(a.i - b.i) + abs(a.j - b.j);
        return d;
    }

    updateShortestPath(point) {
        this.shortestPath = [];
        let temp = point;
        this.shortestPath.push(temp);
        while (temp.previous) {
            this.shortestPath.push(temp.previous)
            temp = temp.previous;
        }
    }

    noPath() {
        document.querySelector("#result").innerHTML = "Brak ścieżki";
        noLoop();
    }

    showActualResults() {
        this.showUncheckedPoints();
        this.showCheckedPoints();
        this.showPointsWaitingToCheck();
        this.showPath();
    }

    showUncheckedPoints() {
        this.table.showPoints();
    }

    showCheckedPoints() {
        for (let i = 0; i < this.closedSet.length; i++)
            this.closedSet[i].show(color(255, 0, 0));
    }

    showPointsWaitingToCheck() {
        for (let i = 0; i < this.openSet.length; i++)
            this.openSet[i].show(color(0, 255, 0));
    }

    showPath() {
        for (let i = 0; i < this.shortestPath.length; i++) {
            this.shortestPath[i].show(color(0, 0, 255));
        }
    }

}