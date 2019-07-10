// Given a non - empty list of words, return the k most frequent elements.

// Your answer should be sorted by frequency from highest to lowest.If two words have the same frequency, then the word with the lower alphabetical order comes first.

//   Example 1:
// Input: ["i", "love", "leetcode", "i", "love", "coding"], k = 2
// Output: ["i", "love"]
// Explanation: "i" and "love" are the two most frequent words.
// Note that "i" comes before "love" due to a lower alphabetical order.
//   Example 2:
// Input: ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], k = 4
// Output: ["the", "is", "sunny", "day"]
// Explanation: "the", "is", "sunny" and "day" are the four most frequent words,
//     with the number of occurrence being 4, 3, 2 and 1 respectively.
//   Note:
// You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
// Input words contain only lowercase letters.
// Follow up:
// Try to solve it in O(n log k) time and O(n) extra space.

var Node = function (val, frq) {
  this.frq = frq;
  this.val = val;
}

var Heap = function (props) {
  this.state = {};
}


Heap.prototype.render = function () {
  
}

class Heap {
  constructor() {
    this.store = [];
  }

  pop() {
    let val = this.store[0];
    if (this.store.length <= 1) return this.store.pop();
    this.store[0] = this.store.pop();
    this.bubbleDown(0);
    return val;
  }

  push(val, frq) {
    // console.log(val, frq)
    let node = new Node(val, frq);

    this.store.push(node);
    this.bubbleUp(this.store.length - 1);
  }

  peek() {
    return this.store[0];
  }
  sort(a, b) {
    if (a < b) return -1;
    else if (a > b) return 1;
    return 0;
  }
  bubbleDown(idx) {
    let lidx = (2 * idx) + 1;
    let ridx = (2 * idx) + 2;
    if (lidx >= this.store.length) return;
    let lval = this.store[lidx];
    let rval = this.store[ridx];
    let swapIdx;
    if (rval && rval.frq < lval.frq) {
      swapIdx = ridx;
    } else {
      swapIdx = lidx;
    }

    if (rval && rval.frq === lval.frq) {
      let arr = [lval.val, rval.val].sort(this.sort);
      if (rval.val === arr[1]) {
        swapIdx = ridx;
      }
    }

    let swapVal = this.store[swapIdx];
    if (swapVal.frq > this.store[idx].frq) return;
    if (swapVal.frq === this.store[idx].frq) {
      let arr = [this.store[idx].val, swapVal.val].sort(this.sort);
      if (arr[0] !== this.store[idx].val) return;
    }

    this.store[swapIdx] = this.store[idx];
    this.store[idx] = swapVal;
    this.bubbleDown(swapIdx);
  }

  bubbleUp(idx) {
    let pidx = Math.floor((idx - 1) / 2);
    if (pidx < 0) return;
    let pval = this.store[pidx];

    if (pval.frq < this.store[idx].frq) return;

    if (pval.frq === this.store[idx].frq) { // worest choice comes on top first;lower alphabetical order comes first.
      let arr = [pval.val, this.store[idx].val].sort(this.sort)
      // console.log(this.sort)
      if (arr[0] !== pval.val) return;
    }

    this.store[pidx] = this.store[idx];
    this.store[idx] = pval;
    this.bubbleUp(pidx);
  }
}

var topKFrequent = function (words, k) {
  let map = new Map();
  words.forEach(el => {
    let val = map.get(el) || 0
    map.set(el, val + 1)
  });
  let heap = new Heap();
  
  map.forEach((frq, key) => {
    if (heap.store.length < k || heap.peek().frq <= frq) {
      heap.push(key, frq);
      if (heap.store.length > k) heap.pop();
    }
  })


  let result = new Array(k);
  let m = k - 1;

  while (m >= 0 && heap.store.length) {
    result[m] = heap.pop().val;
    m -= 1;
  }

  return result;
}; 

let arr =[
  "glarko",
  "zlfiwwb",
  "nsfspyox",
  "pwqvwmlgri",
  "qggx",
  "qrkgmliewc",
  "zskaqzwo",
  "zskaqzwo",
  "ijy",
  "htpvnmozay",
  "jqrlad",
  "ccjel",
  "qrkgmliewc",
  "qkjzgws",
  "fqizrrnmif",
  "jqrlad",
  "nbuorw",
  "qrkgmliewc",
  "htpvnmozay",
  "nftk",
  "glarko",
  "hdemkfr",
  "axyak",
  "hdemkfr",
  "nsfspyox",
  "nsfspyox",
  "qrkgmliewc",
  "nftk",
  "nftk",
  "ccjel",
  "qrkgmliewc",
  "ocgjsu",
  "ijy",
  "glarko",
  "nbuorw",
  "nsfspyox",
  "qkjzgws",
  "qkjzgws",
  "fqizrrnmif",
  "pwqvwmlgri",
  "nftk",
  "qrkgmliewc",
  "jqrlad",
  "nftk",
  "zskaqzwo",
  "glarko",
  "nsfspyox",
  "zlfiwwb",
  "hwlvqgkdbo",
  "htpvnmozay",
  "nsfspyox",
  "zskaqzwo",
  "htpvnmozay",
  "zskaqzwo",
  "nbuorw",
  "qkjzgws",
  "zlfiwwb",
  "pwqvwmlgri",
  "zskaqzwo",
  "qengse",
  "glarko",
  "qkjzgws",
  "pwqvwmlgri",
  "fqizrrnmif",
  "nbuorw",
  "nftk",
  "ijy",
  "hdemkfr",
  "nftk",
  "qkjzgws",
  "jqrlad",
  "nftk",
  "ccjel",
  "qggx",
  "ijy",
  "qengse",
  "nftk",
  "htpvnmozay",
  "qengse",
  "eonrg",
  "qengse",
  "fqizrrnmif",
  "hwlvqgkdbo",
  "qengse",
  "qengse",
  "qggx",
  "qkjzgws",
  "qggx",
  "pwqvwmlgri",
  "htpvnmozay",
  "qrkgmliewc",
  "qengse",
  "fqizrrnmif",
  "qkjzgws",
  "qengse",
  "nftk",
  "htpvnmozay",
  "qggx",
  "zlfiwwb",
  "bwp",
  "ocgjsu",
  "qrkgmliewc",
  "ccjel",
  "hdemkfr",
  "nsfspyox",
  "hdemkfr",
  "qggx",
  "zlfiwwb",
  "nsfspyox",
  "ijy",
  "qkjzgws",
  "fqizrrnmif",
  "qkjzgws",
  "qrkgmliewc",
  "glarko",
  "hdemkfr",
  "pwqvwmlgri"
]

let k = 14

function varify(output, expected) {
  for(let i =0;i <output.length; i++) {
    if(output[i] !== expected[i]) return false;
  }
  return true;
}
let result = topKFrequent(arr, k)
let expected = ["nftk", "qkjzgws", "qrkgmliewc", "nsfspyox", "qengse", "htpvnmozay", "fqizrrnmif", "glarko", "hdemkfr", "pwqvwmlgri", "qggx", "zskaqzwo", "ijy", "zlfiwwb"]
// ['nftk', 'qkjzgws', 'qrkgmliewc', 'qengse', 'nsfspyox', 'htpvnmozay', 'zskaqzwo', 'fqizrrnmif', 'hdemkfr', 'pwqvwmlgri', 'glarko', 'qggx', 'ijy', 'zlfiwwb']
// console.log('expected', ["nftk", "qkjzgws", "qrkgmliewc", "nsfspyox", "qengse", "htpvnmozay", "fqizrrnmif", "glarko", "hdemkfr", "pwqvwmlgri", "qggx", "zskaqzwo", "ijy", "zlfiwwb"])
console.log('output  ', varify(result, expected))//, result)




arr =["i", "love", "leetcode", "i", "love", "coding"], k = 3;
// result = topKFrequent(arr, k)
expected = ["i", "love", "coding"]
// console.log('output  ', varify(result, expected), result);
// console.log('expected', ["i", "love", "coding"])


arr = ["i", "love", "leetcode", "i", "love", "coding"], k = 2;
// result = topKFrequent(arr, k);
expected = ["i", "love"];
// console.log('output  ', varify(result, expected), result);
// console.log('expected', ["i", "love"])