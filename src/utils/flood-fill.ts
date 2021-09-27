// https://leetcode-cn.com/problems/flood-fill/

function floodFill(image: number[][], sr: number, sc: number, newColor: number): number[][] {
    const accessedTable: boolean[][] = [];
    for (let i = 0; i < image.length; i ++) {
        const accessedList: boolean[] = [];
        for (let j = 0; j < image[i].length; j ++) {
            accessedList.push(false)
        }
        accessedTable.push(accessedList)
    }


    const queen: [number, number][] = [];
    const originColor = image[sr][sc];
    queen.push([sr, sc]);
    const result: [number, number][] = [];
    while(queen.length) {
        const node: [number, number] = queen.shift() as [number, number];
        result.push(node);
        accessedTable[node[0]][node[1]] = true;
        const arroundNode: [number, number][] = [];

        if (node[0] + 1 < image.length) {
            arroundNode.push([node[0] + 1, node[1]])
        }
        if (node[0] - 1 >= 0) {
            arroundNode.push([node[0] - 1, node[1]])
        }

        if (node[1] + 1 < image[node[0]].length) {
            arroundNode.push([node[0], node[1] + 1])
        }
        if (node[1] - 1 >= 0) {
            arroundNode.push([node[0], node[1] - 1])
        }
        for (let i = 0; i < arroundNode.length; i ++) {
            const node = arroundNode[i];
            if (image[node[0]][node[1]] === originColor && accessedTable[node[0]][node[1]] === false) {
                queen.push(node);
            }
        }
    }

    for (let i = 0; i < result.length; i ++) {
        const node = result[i];
        image[node[0]][node[1]] = newColor
    }
    return image
};

const image = [[1,1,1],[1,1,0],[1,0,1]];
const sr = 1;
const sc = 1;
const color = 2;

console.log(floodFill(image, sr, sc, color))

export {
    floodFill
}