// https://leetcode-cn.com/problems/wildcard-matching/

function isMatch(s: string, p: string): boolean {
    s = s + "$";
    p = p + "$"

    const db: boolean[][] = [];
    for (let i = p.length - 1; i >= 0; i --) {
        db[i] = [];
        for (let j = s.length - 1; j >= 0; j --) {
            if (p[i] === "*") {
                if (i === p.length - 1) {
                    db[i][j] = true;
                    continue
                }
                if (j === s.length - 1) {
                    db[i][j] = db[i + 1][j];
                    continue;
                }
                db[i][j] = db[i][j + 1] || db[i + 1][j];
            } else if(p[i] === "?" || s[j] === p[i] ) {
                if (i === p.length - 1 && j === s.length - 1) {
                    db[i][j] = true;
                    continue
                }
                if (i === p.length - 1 || j === s.length - 1) {
                    db[i][j] = false;
                    continue
                }
                db[i][j] = db[i + 1][j + 1]
            } else {
                db[i][j] = false
            }
        }
    }
    return db[0][0]
};


export default isMatch