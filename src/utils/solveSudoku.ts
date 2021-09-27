// 链接：https://leetcode-cn.com/problems/sudoku-solver
/**
 Do not return anything, modify board in-place instead.
 */


function getNextPos(pos: [number, number], board: string[][]) {
    let nextPos: [number, number] = [...pos];
    while(nextPos[0] < board.length && nextPos[1] < board.length && board[nextPos[0]][nextPos[1]] !== ".") {
        if (nextPos[1] === board.length - 1) {
            nextPos[0] = nextPos[0] + 1;
            nextPos[1] = 0;
        } else {
            nextPos[1] = nextPos[1] + 1
        }
    }
    return nextPos
}

function track(board: string[][], path: [number, number][], pos: [number, number], rowSets: Set<string>[], colSets: Set<string>[], blockSets: Set<string>[]): string[][] {

    if (pos[0] === board.length || pos[1] === board.length) {
        return board
    }

    if (board[pos[0]][pos[1]] !== ".") {
        const result = track(board, path, getNextPos(pos, board), rowSets, colSets, blockSets);
        return result
    }

    for (let i = 0; i < board.length; i ++) {
        rowSets[pos[0]].has(i.toString());
        colSets[pos[1]].has(i.toString());
        const blockIndex = Math.floor(pos[0] / 3) * 3 + Math.floor(pos[1] / 3);
        const nStr = (i + 1).toString();
        if (rowSets[pos[0]].has(nStr) || colSets[pos[1]].has(nStr) || blockSets[blockIndex].has(nStr)) {
            continue
        }

        path.push([...pos]);
        rowSets[pos[0]].add(nStr);
        colSets[pos[1]].add(nStr);
        blockSets[blockIndex].add(nStr);
        board[pos[0]][pos[1]] = nStr;

        const result = track(board, path, getNextPos(pos, board), rowSets, colSets, blockSets);
        if (result) {
            return result
        } else {
            path.pop();
            rowSets[pos[0]].delete(nStr)
            colSets[pos[1]].delete(nStr)
            blockSets[blockIndex].delete(nStr)
            board[pos[0]][pos[1]] = "."
        }
    }
}



function solveSudoku(board: string[][]): void {
    
    const rowSets: Set<string>[] = [];
    const colSets: Set<string>[] = [];
    const blockSets: Set<string>[] = [];

    for (let i = 0; i < board.length; i ++) {
        rowSets.push(new Set());
        colSets.push(new Set());
        blockSets.push(new Set());
    }

    for (let i = 0; i < board.length; i ++) {
        for (let j = 0; j < board[i].length; j ++) {
            if (board[i][j] !== ".") {
                rowSets[i].add(board[i][j]);
                colSets[j].add(board[i][j]);
                const blockIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                blockSets[blockIndex].add(board[i][j]);
            }
        }
    }
    track(board, [], [0, 0], rowSets, colSets, blockSets)
};

export {
    solveSudoku
}

const board = [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
];

const expect = [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
solveSudoku(board)
console.log(JSON.stringify(board) === JSON.stringify(expect), board)
