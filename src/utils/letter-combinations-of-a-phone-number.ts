// https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/


function letterCombinations(digits: string): string[] {
    const letterMap = new Map<string, string[]>();
    letterMap.set("2", ["a", "b", "c"]);
    letterMap.set("3", ["d", "e", "f"]);
    letterMap.set("4", ["g", "h", "i"]);
    letterMap.set("5", ["j", "k", "l"]);
    letterMap.set("6", ["m", "n", "o"]);
    letterMap.set("7", ["p", "q", "r", "s"]);
    letterMap.set("8", ["t", "u", "v"]);
    letterMap.set("9", ["w", "x", "y", "z"]);

    let result: string[] = [];

    for (let i = 0; i < digits.length; i ++) {
        if (i === 0) {
            result = [...letterMap.get(digits[i])];
        } else {
            const current = letterMap.get(digits[i]);
            const currentResult: string[] = [];
            for (let k = 0; k < result.length; k ++) {
                for (let p = 0; p < current.length; p ++) {
                    currentResult.push(result[k] + current[p])
                }
            }
            result = currentResult
        }
    }

    return result
};