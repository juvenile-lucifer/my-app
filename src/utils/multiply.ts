// https://leetcode-cn.com/problems/multiply-strings/

function multiply(num1: string, num2: string): string {
    const table = new Map<string, number>();
    for (let i = 0; i < 10; i ++) {
        for (let j = 0; j < 10; j ++) {
            table.set(`${i}${j}`, i * j)
        }
    }

    const step: number[][] = [];

    const len1 = num1.length, len2 = num2.length, totalLen = len1 + len2;

    for (let i = len1 - 1; i > -1; i --) {
        for (let j = len2 - 1; j > -1; j --) {
            const colIndex = totalLen - 2 - i - j;
            const col = step[colIndex] ?? [];
            col.push(table.get(`${num1[i]}${num2[j]}`) as number);
            step[colIndex] = col;
        }
    }

    const queen: number[] = [];
    for (let i = 0; i < step.length; i ++) {
        const length = step[i].length;
        let sum = 0;
        for (let j = 0; j < length; j ++) {
            sum += step[i][j];
        }
        const height = Math.floor(sum / 10);
        const low = sum % 10;
        queen.unshift(low);
        if (step[i + 1]) {
            step[i + 1].push(height)
        } else {
            queen.unshift(height)
        }
    }

    while(queen.length && queen[0] === 0) {
        queen.shift()
    }
    return queen.join("") || "0"
};
