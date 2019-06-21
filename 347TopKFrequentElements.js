
// 347. Top K Frequent Elements
// Given a non - empty array of integers, return the k most frequent elements.

//   Example 1:

// Input: nums = [1, 1, 1, 2, 2, 3], k = 2
// Output: [1, 2]
// Example 2:

// Input: nums = [1], k = 1
// Output: [1]
// Note:

// You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
// Your algorithm's time complexity must be better than O(n log n), where n is the array's size.

var Node = function(val, frq) {
  this.frq = frq;
  this.val = val;
}

class Heap {
  constructor() {
    this.store = [];
  }

  pop() {
    let val =this.store[0];
    this.store[0] = this.store.pop();
    this.bubbleDown(0);
    return val;
  }

  push(val, frq) {
    let node = new Node(val, frq);

    this.store.push(node);
    this.bubbleUp(this.store.length-1);
  }

  bubbleDown(idx) {
    let lidx = (2 * idx) +1;
    let ridx = (2 * idx) +2;
    if(lidx >= this.store.length) return;
    let lval = this.store[lval];
    let rval = this.store[ridx];
    let swapIdx;
    if(rval > lval) {
      swapIdx = ridx;
    }else {
      swapIdx = lidx;
    }

    if(this.store[swapIdx] > )
  }
}

var topKFrequent = function (nums, k) {

};