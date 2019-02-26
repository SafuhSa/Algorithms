Algoexpert

// Find Closest Value in BST
// you are given a bst data structure consisting of bst nodes. 




function findClosestValueInBst(tree, target) {
  // Write your code here.
  let closest = tree.value;

  while (tree) {
    let diff = Math.abs(closest - target);
    let currdiff = Math.abs(tree.value - target);
    if (diff > currdiff) {
      closest = tree.value
    }

    if (tree.value < target) {
      tree = tree.right
    } else if (tree.value > target) {
      tree = tree.left
    } else {
      return tree.value
    }
  }
  return closest;
}

// Do not edit the line below.
exports.findClosestValueInBst = findClosestValueInBst;
