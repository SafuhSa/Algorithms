function height(node) {
  if (!node) return 0;
  return node.height;
}

var Node = function (val) {
  this.val = val;
  this.left = null;
  this.right = null;
  this.size = 0;
  this.height = 0;
}

var AVLTree = function () {
  this.root = null
}

AVLTree.prototype.rotateRight = function (root) {
  let newRoot = root.left;
  root.left = root.left.right;
  newRoot.right = root;
  root.height = height(root);
  newRoot.height = height(newRoot)
  return newRoot;
}

AVLTree.prototype.rotateLeft = function (root) {
  let newRoot = root.right;
  root.right = root.right.left;
  newRoot.left = root;
  newRoot.height = height(newRoot);
  root.height = height(root);
  return newRoot;
}

AVLTree.prototype.insert = function (val, root = this.root) {
  if (root === null) {
    this.root = new Node(val);
    return this.root;
  }

  if (val <= root.val) {
    root.left = this.insert(val, root.left);
  } else {
    root.right = this.insert(val, root.right);
  }

  let balanced = height(root.left) - height(root.right);

  if (balanced > 1) {
    if (height(root.left.left) > height(root.left.right)) {
      root = this.rotateRight(root);
    } else {
      root.left = this.rotateLeft(root.left);
      root = this.rotateRight(root);
    }
  } else if (balanced < -1) {
    if (root.right.right >= root.right.left) {
      root = this.rotateLeft(root);
    } else {
      root.right = this.rotateRight(root.right);
      root = this.rotateLeft(root);
    }
  }
  // console.log('592836u652346', root.height)
  root.height = 1 + Math.max(height(root.left), height(root.right));
  this.root = root
  return root;
}


var MedianFinder = function() {
  this.tree = new AVLTree();
};

MedianFinder.prototype.addNum = function(num) {
  this.tree.insert(num);
};

// MedianFinder.prototype.findMedian = function() {
  
  // };
  
  // let med = new MedianFinder();
  // med.addNum(1)
  // med.addNum(2)
  // med.findMedian()// -> 1.5
  // med.addNum(3) 
  // med.findMedian()// -> 2
  
  
  //  1 2 3 4 4.5 5 6
  //  [4, 2, 5, 1, 3] 
  //  4 
  //          4 
  //       /     \
  //      2       5
  //     / \     / \
  //    1  3    4.5  6
  // [4, 2, 5, 1, 3, 4.5, 6]
  //  0, 1, 2, 3, 4, 5, 6
  
  // root = avlTree.insert(root, -10);
  // root = avlTree.insert(root, 2);
  // root = avlTree.insert(root, 13);
  // root = avlTree.insert(root, -13);
  // root = avlTree.insert(root, -15);
  // root = avlTree.insert(root, 15);
  // root = avlTree.insert(root, 17);
  // root = avlTree.insert(root, 20);
  
  // TreeTraversals tt = new TreeTraversals();
  // tt.inOrder(root);
  // System.out.println();
  // tt.preOrder(root);
  
  
  // let tree = new AVLTree();
  // let node = null
  // // node = 
  // tree.insert(-10)//, node)
  // // node = 
  // tree.insert(2)//, node)
  // // node = 
  // tree.insert(13)//, node)
  // // node = 
  // tree.insert(-13)//, node)
  // // node = 
  // tree.insert(-15)//, node)
  // // node = 
  // tree.insert(-17)//, node)
  // // node = 
  // tree.insert(20)//, node)
  
  // let arr = [];
  // function inorder(cpnode) {
  //   if (!cpnode) return
  //   inorder(cpnode.left)
  //   arr.push(cpnode.val);
  //   inorder(cpnode.right)
  // }
  
  // console.log(tree.root.val)
  // inorder(tree.root)
  // console.log(arr)
  
  