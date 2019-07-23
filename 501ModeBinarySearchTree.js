/*
501. Find Mode in Binary Search Tree
Given a binary search tree(BST) with duplicates, find all the mode(s)(the most frequently occurred element) in the given BST.

Assume a BST is defined as follows:

The left subtree of a node contains only nodes with keys less than or equal to the node's key.
The right subtree of a node contains only nodes with keys greater than or equal to the node's key.
Both the left and right subtrees must also be binary search trees.

For example:
Given BST[1, null, 2, 2],

  1
   \
    2
   /
  2


return [2].

  Note: If a tree has more than one mode, you can return them in any order.

Follow up: Could you do that without using any extra space ? (Assume that the implicit stack space incurred due to recursion does not count).
*/

var findMode = function(root) {
  let result = [];
  let currVal;
  let currCnt = 0;
  let maxCnt =0;
  let modes = 0;

  const handleVal = (val) => {
    if(currVal !== val) {
      currVal = val;
      currCnt = 0;
    }
    currCnt++;
    if (currCnt > maxCnt) {
      maxCnt = currCnt;
      result[0] = currVal;
      modes = 1
    } else if (currCnt === maxCnt){
      result[modes] = currVal;
      modes++;
    }
  }

  const inorder = (root) => { //Morris Inorder Tree Traversal
    if(!root) return;
    while(root) {
      if(!root.left) {
        handleVal(root.val);
        root = root.right;
      }

      let predecesor = root.left;
      while (predecesor.right !== null && predecesor.right !== root) {
        predecesor = predecesor.right;
      }

      if(predecesor.right === null) {
        predecesor.right = root;
        root = root.left;
      }else {
        predecesor.right = null;
        handleVal(root.val);
        root = root.right;
      }
    }
  }

  inorder(root);
  return result;
}