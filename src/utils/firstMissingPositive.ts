// https://leetcode-cn.com/problems/first-missing-positive/submissions/

function firstMissingPositive(nums: number[]): number {
    for (let i = 0; i < nums.length; i ++) {
        let temp = nums[i];
        nums[i] = 0;
        while (temp > 0 && temp < nums.length + 1 && nums[temp - 1] !== temp) {
            const pn = nums[temp - 1];
            nums[temp - 1] = temp;
            temp = pn
        }
    }

    for (let i = 0; i < nums.length; i ++) {
        if (nums[i] === 0) {
            return i + 1
        }
    }
    return nums.length + 1
};
