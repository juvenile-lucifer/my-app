// https://leetcode-cn.com/problems/permutations/

function permute(nums: number[]): number[][] {
    
    if (nums.length === 1) {
        return [[nums[0]]]
    }

    const list: number[][] = [];
    for (let i = 0; i < nums.length; i ++) {
        const childList = permute([...nums.slice(0, i), ...nums.slice(i + 1)]);
        for(let j = 0; j < childList.length; j ++) {
            childList[j].push(nums[i])
            list.push(childList[j])
        }
    }
    return list
};

const nums1 = [1,2,3];
console.log(permute(nums1))