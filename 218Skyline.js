
// A city's skyline is the outer contour of the silhouette formed by all the buildings in that city when viewed from a distance. Now suppose you are given the locations and height of all the buildings as shown on a cityscape photo (Figure A), write a program to output the skyline formed by these buildings collectively (Figure B).

// Buildings  Skyline Contour
// The geometric information of each building is represented by a triplet of integers[Li, Ri, Hi], where Li and Ri are the x coordinates of the left and right edge of the ith building, respectively, and Hi is its height.It is guaranteed that 0 ≤ Li, Ri ≤ INT_MAX, 0 < Hi ≤ INT_MAX, and Ri - Li > 0. You may assume all buildings are perfect rectangles grounded on an absolutely flat surface at height 0.

// For instance, the dimensions of all buildings in Figure A are recorded as: [[2 9 10], [3 7 15], [5 12 12], [15 20 10], [19 24 8]].

// The output is a list of "key points"(red dots in Figure B) in the format of[[x1, y1], [x2, y2], [x3, y3], ... ]that uniquely defines a skyline.A key point is the left endpoint of a horizontal line segment.Note that the last key point, where the rightmost building ends, is merely used to mark the termination of the skyline, and always has zero height.Also, the ground in between any two adjacent buildings should be considered part of the skyline contour.

// For instance, the skyline in Figure B should be represented as: [[2 10], [3 15], [7 12], [12 0], [15 10], [20 8], [24, 0]].

//   Notes:

// The number of buildings in any input list is guaranteed to be in the range[0, 10000].
// The input list is already sorted in ascending order by the left x position Li.
// The output list must be sorted by the x position.
// There must be no consecutive horizontal lines of equal height in the output skyline.For instance, [...[2 3], [4 5], [7 5], [11 5], [12 7]...] is not acceptable; the three lines of height 5 should be merged into one in the final output as such: [...[2 3], [4 5], [12 7], ...]

var Node = function (height) {
  this.height = height;
  this.left = null;
  this.right = null;
}

class Heap {
  constructor() {
    this.store = [];
  };

  peek() {
    return this.store[0];
  };

  size() {
    return this.store.length;
  }
  removeMax() {
    let node = this.store[0];
    this.store[0] = this.store.pop();
    this.bubbleDown(0);
    return node;
  };

  insert(el) {
    let node = new Node(el[2])
    node.left = el[0];
    node.right = el[1];
    // console.log(el, node)
    this.store.push(node);
    this.bubbleUp(this.store.length - 1)
  };

  bubbleDown(idx) {
    let lidx = (idx * 2) + 1;
    if (lidx >= this.store.length - 1) return;
    let lval = this.store[lidx];
    let swapIdx = lidx;
    let ridx = (idx * 2) + 2;
    let rval = this.store[ridx];

    if (rval.height > lval.height) {
      swapIdx = ridx;
    }
    let swapVal = this.store[swapIdx];
    if (swapVal.height > this.store[idx].height) {
      this.store[swapIdx] = this.store[idx];
      this.store[idx] = swapVal;
      this.bubbleDown(swapIdx);
    }
  };
  bubbleUp(idx) {
    // console.log(this.store, idx)
    let pidx = Math.floor((idx - 1) / 2);
    if (pidx < 0) return;
    let pval = this.store[pidx];

    if (pval.height < this.store[idx].height) {
      this.store[pidx] = this.store[idx];
      this.store[idx] = pval;
      this.bubbleUp(pidx);
    }
  }
}


var getSkyline = function (buildings) {
  let heap = new Heap();
  heap.insert([-0, Infinity, 0]);
  let result = [];

  buildings.forEach((el, idx) => {
    let curr = heap.peek();

    while (curr.right < el[0]) { // the start of the next building is after the end of the current Heightest building
      let removedMax = heap.removeMax(); // pop the Max
      let cur = heap.peek(); // current max after poping the max

      while (removedMax.right >= cur.right) { // if there is any building that its right end inside/before the removed max, remove that building
        heap.removeMax();
        cur = heap.peek();
      }

      if (removedMax.right < heap.peek().right && removedMax.height > heap.peek().height) { // if the removed max right border is lest than the current max right border and they are diffrent height push their cross poin
        result.push([removedMax.right, heap.peek().height])
      }
      curr = heap.peek()
    };
    let prevH = heap.peek().height;
    heap.insert(el);
    if (!(buildings[idx + 1] && el[0] === buildings[idx + 1][0] && buildings[idx + 1][2] > el[2])) { //if current building and the next one have the same start and the next building is not higher  like: [[1, 2, 1], [1, 2, 2], [1, 2, 3]]
      let nMax = heap.peek();
      if (nMax.height > prevH) { // if we got a new max after inserting the new value;
        result.push([nMax.left, nMax.height]);
      }
    }
  });
  // after the forEach we still have building inside our heap, same logic here as inside the forEach
  let curr = heap.peek();
  while (curr.height !== 0) {
    let removedMax = heap.removeMax();
    let cur = heap.peek();

    while (removedMax.right >= cur.right) {
      heap.removeMax();
      cur = heap.peek();
    }

    if (removedMax.right < heap.peek().right && removedMax.height > heap.peek().height) {
      result.push([removedMax.right, heap.peek().height])
    }
    curr = heap.peek();
  }


  return result;
};

console.log(getSkyline([[2, 9, 10], [3, 7, 15], [5, 12, 12], [15, 20, 10], [19, 24, 8]]))