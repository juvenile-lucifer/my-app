// https://leetcode-cn.com/problems/combination-sum-ii/


function track (candidates: number[], target: number, path: number[], result: number[][]) {
    let unused: number[] = [...candidates];

    outer: for (let i = 0; i < candidates.length; i ++) {
        let valid = false
        for (let j = 0; j < unused.length; j ++) {
            if (unused[j] === candidates[i]) {
                valid = true
            }
        }
        if (!valid) {
            continue
        }
        if (candidates[i] === target) {
            result.push([...path, candidates[i]]);
        } else if (candidates[i] < target) {
            path.push(candidates[i])
            track(unused.slice(1), target - candidates[i], path, result)
            path.pop()
        }
        unused = unused.filter(num => num !== candidates[i])
    }

}


function combinationSum2(candidates: number[], target: number): number[][] {
    const result: number[][] = [];


    track(candidates, target, [], result)


    return result
};



const nums = [1, 1];
const target = 1;
console.log(combinationSum2(nums, target))

export {
    combinationSum2
}