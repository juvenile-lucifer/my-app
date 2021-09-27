// https://leetcode-cn.com/problems/combinations/


function track (n: number, k: number, path: number[], point: number, result: number[][]) {
    for (let i = point; i < n + 1; i ++) {
        if (path.length + 1 === k) {
            result.push([...path, i])
        } else {
            path.push(i);
            track(n, k, path, i + 1, result);
            path.pop()
        }
    }

}

function combine(n: number, k: number): number[][] {
    const result: number[][] = [];

    track(n, k, [], 1, result)

    return result
};