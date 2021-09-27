// https://leetcode-cn.com/problems/surrounded-regions/


function solve(board: string[][]): void {
    const h = board.length, w = board[0].length;
    if (h < 3 || w < 3) {
        return
    }

    const borders: [number, number][] = [];
    for (let i = 0; i < w; i ++) {
        borders.push([0, i], [h - 1, i])
    }
    for (let i = 1; i < h - 1; i ++) {
        borders.push([i, 0], [i, w - 1])
    }

    for (let i = 0; i < borders.length; i ++) {
        const [m, n] = borders[i];
        if (board[m][n] !== "O") {
            continue;
        }
        const queen = [borders[i]];
        while (queen.length) {
            const [p, k] = queen.shift();
            if (
                0 <= p && p < h && 0 <= k && k < w && board[p][k] === "O"
            ) {
                board[p][k] = "T";
                queen.push([p - 1, k])
                queen.push([p + 1, k])
                queen.push([p, k - 1])
                queen.push([p, k + 1])
            }
        }
    }

    for (let i = 0; i < h; i ++) {
        for (let j = 0; j < w; j ++) {
            if (board[i][j] === "O") {
                board[i][j] = "X"
            }
        }
    }

    for (let i = 0; i < h; i ++) {
        for (let j = 0; j < w; j ++) {
            if (board[i][j] === "T") {
                board[i][j] = "O"
            }
        }
    }
};

export {
    solve
}

const board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]];
solve(board)