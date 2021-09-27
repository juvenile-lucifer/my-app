// https://leetcode-cn.com/problems/merge-k-sorted-lists/
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    let stopFlag = false;
    let kNode: ListNode = null
    let kNodeLastNode: ListNode;
    const latestNodeList = [...lists];

    while(!stopFlag) {
        let minValNode: ListNode;
        let minValNodePoint = 0;
        for (let i = 0; i < lists.length; i ++) {
            const currentNode = latestNodeList[i];
            if (!currentNode) {
                continue
            }
            if (!minValNode || currentNode.val < minValNode.val) {
                minValNode = currentNode
                minValNodePoint = i;
            }
        }
        if (minValNode) {
            latestNodeList[minValNodePoint] = minValNode.next
            if (!kNode) {
                kNode = minValNode
                kNodeLastNode = minValNode
            } else {
                kNodeLastNode.next = minValNode
                kNodeLastNode = minValNode
            }
        } else {
            stopFlag = true
        }
    }
    return kNode
};