
// https://leetcode-cn.com/problems/word-search/

function track (board: string[][], word: string, point: number, pos: [number, number], path: [number, number][], accessedTable: boolean[][]): [number, number][] {
    if (board[pos[0]][pos[1]] !== word[point]) {
        return
    }

    accessedTable[pos[0]][pos[1]] = true;
    path.push([pos[0], pos[1]]);

    if (point === word.length - 1) {
        return path
    }

    const arround: [number, number][] = [
        [pos[0] + 1, pos[1]],
        [pos[0] - 1, pos[1]],
        [pos[0], pos[1] + 1],
        [pos[0], pos[1] - 1],
    ];
    for (let i = 0; i < arround.length; i ++) {
        const [m, n] = arround[i];
        if (0 <= m && m < board.length && 0 <= n && n < board[m].length && accessedTable[m][n] === false ) {
            const result = track(board, word, point + 1, [m, n], path, accessedTable);
            if (result) {
                return result
            } 
        }
    }

    accessedTable[pos[0]][pos[1]] = false;
    path.pop();

    return
}


function exist(board: string[][], word: string): boolean {
    const path: [number, number][] = [];

    const accessedTable: boolean[][] = [];
    for (let i = 0; i < board.length; i ++) {
        const accessedList: boolean[] = [];
        for (let j = 0; j < board[0].length; j ++) {
            accessedList.push(false)
        }
        accessedTable.push(accessedList)
    }

    for (let i = 0; i < board.length; i ++) {
        
        for (let j = 0; j < board[0].length; j ++) {
            const result = track(board, word, 0, [i, j], path, accessedTable)
            if (result) {
                return true
            }
        }
    }
    return false

};

export {
    exist
}



const board1 = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word1 = "ABCCED"
const board2 = [["a","a"]], word2 = "aaa";


const board3 = [["A","A","A","A","A","A"],["A","A","A","A","A","A"],["A","A","A","A","A","A"],["A","A","A","A","A","A"],["A","A","A","A","A","A"],["A","A","A","A","A","A"]];
const word3 = "AAAAAAAAAAAAAAB";

const board4 = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]];
const word4 = "SEE";


console.log(
    // exist(board1, word1),
    // exist(board2, word2),
    exist(board3, word3),
    // exist(board4, word4)
)
