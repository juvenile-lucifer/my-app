// https://leetcode-cn.com/problems/letter-case-permutation/

function isLetterStr (s: string) {
    const code = s.charCodeAt(0);
    return (65 <= code && code<= 90) || (97 <= code && code <= 122)
}

function letterCasePermutation(s: string): string[] {
    const Acode = "A".charCodeAt(0);
    const Zcode = "Z".charCodeAt(0);
    const aCode = "a".charCodeAt(0);
    const zCode = "z".charCodeAt(0);

    const startOffset = Acode;
    const offset = aCode - Acode;
    const letterTable: string[] = Array(zCode - Acode).fill("");
    for (let i = 0; i <= zCode - Acode; i ++) {
        if (i <= Zcode - startOffset) {
            letterTable[i] = String.fromCharCode(i + startOffset + offset)
        } else if (i >= aCode - startOffset) {
            letterTable[i] = String.fromCharCode(i - offset + startOffset)
        }
    }

    
    const sChunk: string[] = [];
    let chunk: string = "";
    for (let i = 0; i < s.length; i ++) {
        if (isLetterStr(s[i])) {
            if (chunk.length) {
                sChunk.push(chunk)
                chunk = "";
            }
            sChunk.push(s[i])
        } else {
            chunk = chunk + s[i];
        }
    }
    if (chunk.length) {
        sChunk.push(chunk)
    }


    let result: string[] = [];
    console.log(sChunk)
    for (let i = 0; i < sChunk.length; i ++) {
        if (!isLetterStr(sChunk[i])) {
            if (!result.length) {
                result.push(sChunk[i])
            } else {
                const current: string[] = [];
                for (let j = 0; j < result.length; j ++) {
                    current.push(result[j] + sChunk[i])
                }
                result = current;
            }
        }
        if (isLetterStr(sChunk[i])) {
            if (!result.length) {
                result.push(sChunk[i])
                result.push(letterTable[sChunk[i].charCodeAt(0) - 65])
            } else {
                const current = [];
                for (let j = 0; j < result.length; j ++) {
                    current.push(result[j] + sChunk[i]);
                    current.push(result[j] + letterTable[sChunk[i].charCodeAt(0) - 65])
                }
                result = current
            }
        }
    }

    return result
};

export {
    letterCasePermutation
}

const s = "12345";
console.log(letterCasePermutation(s))