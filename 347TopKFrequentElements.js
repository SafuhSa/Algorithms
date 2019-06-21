
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

  peek() {
    return this.store[0];
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
    let swapVal = this.store[swapIdx];
    if(swapVal.frq >= this.store[idx].frq) return;

    this.store[swapIdx] = this.store[idx];
    this.store[idx] = swapVal;
    this.bubbleDown(swapIdx);
  }

  bubbleUp(idx) {
    let pidx = Math.floor((idx-1)/2);
    if (pidx <= 0) return;
    let pval = this.store[pval];

    if(pval.frq <= this.store[idx].frq) return;
    this.store[pidx] = this.store[idx];
    this.store[idx] = pval;
    this.bubbleUp[pidx];
  }
}

var topKFrequent = function (nums, k) {
  let hsh = {};
  nums.forEach(el => {
    if(!hsh[el]) hsh[el] = 0;
    hsh[el]++;
  });

  let heap = new Heap();
  for(let key in hsh) {
    let frq = hsh[key];
    if(heap.store.length === k) {
      if (heap.peek().frq > frq) continue;
      heap.pop();
    }
    heap.push(key, key)
  }

  let result = new Array(k);
  let m =k-1;

  while(m >= 0) {
    result[m] = heap.pop();
    m-=1;
  }

  return result;
}; 