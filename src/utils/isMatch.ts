// https://leetcode-cn.com/problems/regular-expression-matching/

function isMatch (s: string, p: string): boolean {
    if (p.length === 0 && s.length > 0) {
        return false
    }
    if (s.length === 0 && p.length === 0) {
        return true
    }
    if (p[0] && p[1] !== "*") {
        if (p[0] === s[0] || (p[0] === "." && s[0])) {
            return isMatch(s.slice(1), p.slice(1))
        } else {
            return false
        }
    } else {
        if (s.length === 0) {
            return isMatch(s, p.slice(2))
        } else {
            if (p[0] !== "." && p[0] !== s[0]) {
                return isMatch(s, p.slice(2))
            } else {
                if (isMatch(s.slice(1), p)) {
                    return true
                } else {
                    return isMatch(s, p.slice(2))
                }
            }
        }
    }
}


export default isMatch