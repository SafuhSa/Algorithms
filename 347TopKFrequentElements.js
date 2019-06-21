
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
    if(this.store.length <= 1) return this.store.pop();
    this.store[0] = this.store.pop();
    this.bubbleDown(0);
    return val;
  }

  push(val, frq) {
    // console.log(val, frq)
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
    let lval = this.store[lidx];
    let rval = this.store[ridx];
    let swapIdx;
    if(rval && rval.frq < lval.frq) {
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
    if (pidx < 0) return;
    let pval = this.store[pidx];

    if(pval.frq <= this.store[idx].frq) return;
    this.store[pidx] = this.store[idx];
    this.store[idx] = pval;
    this.bubbleUp(pidx);
  }
}

var topKFrequent = function (nums, k) {
  let map = new Map();
  nums.forEach(el => {
    let val = map.get(el) || 0
    map.set(el, val+1)
  });
// console.log(map)
  let heap = new Heap();

    map.forEach((frq, key) => {
      // console.log('key', frq, key, heap.store)
      if (heap.store.length < k  ||  heap.peek().frq < frq ) {
      if (heap.store.length === k) heap.pop();
      heap.push(key, frq)
    }
    // console.log(heap.store)
  })

  let result = new Array(k);
  let m =k-1;

  while(m >= 0 && heap.store.length) {
    result[m] = heap.pop().val;
    m-=1;
  }

  return result;
}; 

let nums = [1, 1, 1, 2, 2, 3], k = 2
// Output: [1, 2]
// console.log(topKFrequent(nums, k))
nums = [3, 0, 1, 0];
k = 1;
// console.log(topKFrequent(nums, k))
nums = [4, -2,-2, 5, 4,2, 1, 2, 4, -9];
k = 10
// console.log(topKFrequent(nums, k))

let output =   ["qengse", "nsfspyox", "htpvnmozay", "zskaqzwo", "fqizrrnmif", "hdemkfr", "pwqvwmlgri", "glarko", "qggx"]
let expected = ["nsfspyox", "qengse", "htpvnmozay", "fqizrrnmif", "glarko", "hdemkfr", "pwqvwmlgri", "qggx", "zskaqzwo"]
let dif = [];
for(let num of output) {
  let idx = expected.indexOf(num)
  if(idx >= 0) {
    expected.splice(idx, 1)
  }else {
    dif.push(num);
  }
}

console.log('output', output.length, 'exp',expected.length, expected, dif)