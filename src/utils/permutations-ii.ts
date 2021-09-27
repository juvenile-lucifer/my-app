// https://leetcode-cn.com/problems/permutations-ii/

function track(nums: number[], flags: boolean[], path: number[], result: number[][] ) {
    let isLeaf = true;
    const used: number[] = [];
    outer: for (let i = 0; i < nums.length; i ++) {
        for (let j = 0; j < used.length; j ++) {
            if (used[j] === nums[i]) {
                continue outer;
            }
        }
        if (flags[i] === false  ) {
            used.push(nums[i]);
            isLeaf = false;
            path.push(nums[i]);
            flags[i] = true
            track(nums, flags, path, result);
            flags[i] = false;
            path.pop()
            continue
        }
    }
    if (isLeaf) {
        result.push([...path]);
    }
}



export function permuteUnique(nums: number[]): number[][] {
    const flags: boolean[] = Array(nums.length).fill(false);
    const result: number[][] = [];
    track(nums, flags, [], result)
    return result
};



const nums = [1,2,3];
console.log(permuteUnique(nums))


