// https://leetcode-cn.com/problems/substring-with-concatenation-of-all-words/

function isMatchWords(s: string, words: string[]) {
    // const status: number[][] = [];
    const step = words[0].length;
    const status: boolean[] = Array(words.length).fill(false);
    for (let i = 0; i < s.length; i = i + step) {
        const subStr = s.slice(i, i + step);
        let point: number;
        for (let j = 0; j < words.length; j ++) {
            if (!status[j] &&  subStr === words[j]) {
                point = j;
                break
            }
        }
        if (point !== undefined) {
            status[point] = true
        } else {
            return false
        }
    }
    return true
}

function findSubstring(s: string, words: string[]): number[] {
    const k = words[0]?.length;
    if (!k) {
        return []
    }
    const minLen = k * words.length;
    if (s.length < minLen) {
        return []
    }
    const points: number[] = [];
    for (let i = 0; i < s.length - minLen + 1; i ++) {
        if (isMatchWords(s.slice(i, i + minLen), words)) {
            points.push(i)
        }
    }
    return points
};

console.log(findSubstring("wordgoodgoodgoodbestword", ["word","good","best","good"]))

// "wordgoodgoodgoodbestword"
// ["word","good","best","good"]