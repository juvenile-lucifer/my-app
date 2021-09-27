// https://leetcode-cn.com/problems/n-queens/

function track (n: number, point: number, path: [number, number][], placeholderTable: number[][], result: [number, number][][]) {
    if (point === n) {
        result.push([...path])
        return
    }


    for(let i = 0; i < n; i ++) {

        if (placeholderTable[point][i] === 0) {
            path.push([point, i]);
            const currentPointPlaceHolder: [number, number][] = [];
            for (let j = point; j < n; j ++) {
                currentPointPlaceHolder.push([j, i]);
                if (i + j - point < n) {
                    currentPointPlaceHolder.push([j, i + j - point]);
                }
                if (i - j + point >= 0) {
                    currentPointPlaceHolder.push([j, i - j + point]);
                }
            }
            for (let j = 0; j < currentPointPlaceHolder.length; j ++) {
                const [m, n] = currentPointPlaceHolder[j];
                placeholderTable[m][n] ++
            }
            track(n, point + 1, path, placeholderTable, result);
            path.pop();
            for (let j = 0; j < currentPointPlaceHolder.length; j ++) {
                const [m, n] = currentPointPlaceHolder[j];
                placeholderTable[m][n] --
            }
        }

    }
}

function solveNQueens(n: number): string[][] {
    const Q = "Q", empty = ".";

    const placeholderTable: number[][] = [];
    for (let i = 0; i < n; i ++) {
        placeholderTable.push(Array(n).fill(0))
    }
    const result: [number, number][][] = [];

    track(n, 0, [], placeholderTable, result)

    const resultStr: string[][] = [];

    for (let i = 0; i < result.length; i ++) {

        const address: string[][] = [];
        for(let m = 0; m < n; m ++) {
            address.push(Array(n).fill(empty))
        }

        for(let j = 0; j < result[i].length; j ++) {
            const [p, k] = result[i][j];
            address[p][k] = Q;
        }
        resultStr.push(address.map(row => row.join("")))

    }

    return resultStr
};


const n = 5
const expect = [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]];

console.log(solveNQueens(n))



export {
    solveNQueens
}
