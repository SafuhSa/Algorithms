// AlogExper invertBinaryTree

function invertBinaryTree(tree) {
  if (!tree) return;

  let right = tree.right;
  tree.right = tree.left;
  tree.left = right
  invertBinaryTree(tree.right)
  invertBinaryTree(tree.left)

  return tree;
}

// Do not edit the line below.
exports.invertBinaryTree = invertBinaryTree;
