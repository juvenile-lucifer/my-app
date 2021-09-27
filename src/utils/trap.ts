// https://leetcode-cn.com/problems/trapping-rain-water/submissions/
function trap_On2(height: number[]): number {
    let maxPos = 0;
    for (let i = 0; i < height.length; i ++) {
        maxPos = height[i] > height[maxPos] ? i : maxPos
    }

    let rightP = maxPos, leftP = maxPos;
    let pool = 0;

    while(rightP < height.length -2) {
        let maxRight = rightP + 1;
        for (let i = rightP + 1; i < height.length; i ++) {
            maxRight = height[maxRight] > height[i] ? maxRight : i;
        }
        if (maxRight > rightP + 1) {
            let amount = 0;
            for (let i = rightP + 1; i < maxRight; i ++) {
                amount = amount + height[i];
            }
            pool = pool + (
                (maxRight - rightP - 1) * height[maxRight] - amount
            );
        }
        rightP = maxRight
    }

    while(leftP > 0) {
        let maxLeft = leftP - 1;
        for (let i = leftP - 1; i >= 0; i --) {
            maxLeft = height[maxLeft] > height[i] ? maxLeft : i;
        }
        if (maxLeft < leftP - 1) {
            let amount = 0;
            for (let i = leftP - 1; i > maxLeft; i --) {
                amount = amount + height[i];
            }
            pool = pool + (
                (leftP - maxLeft - 1) * height[maxLeft] - amount
            );
        }
        leftP = maxLeft
    }
    return pool
};

function trap_stack(height: number[]): number {
    const length = height.length;
    if (length < 3) {
        return 0
    }

    const stack: number[] = [];
    let maxTop = 0;
    for (let i = 0; i < length; i ++) {
        if (!stack.length) {
            stack.push(i)
            maxTop = height[i]
            continue
        }
        if (stack.length === 1) {
            if (height[stack[stack.length - 1]] <= height[i]) {
                stack.pop();
                maxTop = height[i]
            }
            stack.push(i)
            continue
        }
        if (height[i] < height[stack[stack.length - 1]]) {
            stack.push(i)
        } else {
            if (maxTop > height[i]) {
                while(height[i] >= height[stack[stack.length - 1]]) {
                    stack.pop()
                }
            } else {
                while(maxTop !== height[stack[stack.length - 1]]) {
                    stack.pop()
                }
            }
            maxTop = Math.max(maxTop, height[i])
            stack.push(i)
        }

    }

    let amount = 0;
    for (let i = 0; i < stack.length; i ++) {
        if (stack[i + 1] !== undefined) {
            const minTop = Math.min(height[stack[i]], height[stack[i + 1]])
            for (let j = stack[i] + 1; j < stack[i + 1]; j ++) {
                amount = amount + (minTop - height[j])
            }
        }
    }

    return amount
}

function trap(height: number[]): number {
    const length = height.length;
    if (length < 3) {
        return 0
    }

    const db_left: number[] = [];
    db_left[0] = height[0];
    for (let i = 1; i < length; i ++) {
        db_left[i] = Math.max(db_left[i - 1], height[i])
    }

    const db_right: number[] = [];
    db_right[length - 1] = height[length - 1];
    for (let i = length - 2; i >= 0; i --) {
        db_right[i] = Math.max(db_right[i + 1], height[i])
    }

    let amount = 0;
    for(let i = 0; i < length; i ++) {
        amount = amount + Math.min(db_left[i], db_right[i]) - height[i];
    }
    return amount
}
