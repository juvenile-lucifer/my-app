// https://leetcode-cn.com/problems/reverse-nodes-in-k-group/

export class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}


function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    let currentNode = head;
    const nodeArray: ListNode[] = [];

    while(currentNode) {
        nodeArray.push(currentNode)
        currentNode = currentNode.next
    }
    const reverseAmount = Math.floor(nodeArray.length / k) * k;
    for (let i = 0; i < reverseAmount; i ++) {
        const groupIndex = Math.floor(i / k);
        const groupOffset = i % k;
        const pairIndex = k * (groupIndex + 1) - groupOffset - 1;
        if (i < pairIndex) {
            const tempNode = nodeArray[i];
            nodeArray[i] = nodeArray[pairIndex];
            nodeArray[pairIndex] = tempNode
        }
    }

    let headNode: ListNode = null;
    let curNode: ListNode = null;
    for (let i = 0; i < nodeArray.length; i ++) {
        if (!headNode) {
            headNode = curNode = nodeArray[i];
        } else {
            curNode.next = nodeArray[i];
            curNode = nodeArray[i]
        }
    }
    curNode.next = null;

    return headNode;
};