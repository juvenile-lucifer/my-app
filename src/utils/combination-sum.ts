// https://leetcode-cn.com/problems/combination-sum/

function track (candidates: number[], target: number, point: number, sum: number, path: number[], result: number[][]) {
    for (let i = point; i < candidates.length; i ++) {
        if (candidates[i] === target - sum) {
            result.push([...path, candidates[i]]);
            continue
        } else if (candidates[i] > target - sum) {
            continue
        } else {
            path.push(candidates[i]);
            track(candidates, target, i, sum + candidates[i], path, result)
            path.pop()
        } 
    }
}

function combinationSum(candidates: number[], target: number): number[][] {
    const result: number[][] = [];
    track(candidates, target, 0, 0, [], result);
    return result
};

export {
    combinationSum
}


const candidates = [2,3,6,7];
const target = 7
console.log(combinationSum(candidates, target))