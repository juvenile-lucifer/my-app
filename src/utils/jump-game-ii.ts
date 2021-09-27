function jump(nums: number[]): number {

    const db: number[] = Array(nums.length).fill(nums.length)
    const length = nums.length;
    db[db.length - 1] = 0
    
    for (let i = length - 2; i > -1; i --) {
        const curStep = nums[i];
        let minStep = db[i + 1];
        const k = Math.min(i + curStep + 1, nums.length)
        for (let j = i + 1; j <  k; j ++) {
            minStep = minStep < db[j] ? minStep : db[j]
        }
        db[i] = minStep + 1
    }

    return db[0]

};

const nums = [2,3,1,1,4];
console.log(jump(nums))