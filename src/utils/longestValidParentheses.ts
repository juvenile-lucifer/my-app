// https://leetcode-cn.com/problems/longest-valid-parentheses/submissions/
function longestValidParentheses(s: string): number {
    const stack: number[] = [];

    for (let i = 0; i < s.length; i ++) {
        if (stack.length && s[i] === ")" && s[stack[stack.length - 1]] === "(" ) {
            stack.pop()
        } else {
            stack.push(i)
        }
    }

    if (!stack.length) {
        return s.length
    }
    
    let max = 0;

    const preGap = stack[0]
    const sufGap = s.length - 1 - stack[stack.length - 1];
    max = preGap > sufGap ? preGap : sufGap
    for (let i = 0; i < stack.length; i ++) {
        if (i + 1 < stack.length) {
            const gap = stack[i + 1] - stack[i] - 1;
            if (gap > max) {
                max = gap
            }
        }
    }
    return max
};
