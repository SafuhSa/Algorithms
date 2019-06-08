// Median is the middle value in an ordered integer list.If the size of the list is even, there is no middle value.So the median is the mean of the two middle value.

// For example,
//   [2, 3, 4], the median is 3

//   [2, 3], the median is(2 + 3) / 2 = 2.5

// Design a data structure that supports the following two operations:

// void addNum(int num) - Add a integer number from the data stream to the data structure.
// double findMedian() - Return the median of all elements so far.

//   Example:

// addNum(1)
// addNum(2)
// findMedian() -> 1.5
// addNum(3)
// findMedian() -> 2


// Follow up:

// If all integer numbers from the stream are between 0 and 100, how would you optimize it ?
//   If 99 % of all integer numbers from the stream are between 0 and 100, how would you optimize it ?

function maxHeap(val, parentVal) {
  return val > parentVal;
}
function minHeap(val, parentVal) {
  return val < parentVal
}

var Heap = function (cb) {
  this.store = [];
  this.func = cb
}

Heap.prototype.insert = function (num) {
  this.store.push(num);
  this.bubbleUp(this.store.length - 1)
};

Heap.prototype.pop = function () {
  let num = this.store[0];
  this.store[0] = this.store[this.size() - 1];
  this.store.pop();
  this.bubbleDown(0);

  return num;
}

Heap.prototype.peek = function () {
  return this.store[0];
}

Heap.prototype.bubbleUp = function (idx) {
  if (idx <= 0) return;
  let pidx = Math.floor((idx - 1) / 2);
  let pval = this.store[pidx];
  let val = this.store[idx];
  if (this.func(val, pval)) {
    this.store[idx] = pval;
    this.store[pidx] = val;
    this.bubbleUp(pidx);
  }
}

Heap.prototype.bubbleDown = function (idx) {
  let lIdx = (2 * idx) + 1;
  let lchid = this.store[lIdx];
  if (lIdx >= this.store.length) return;

  let rIdx = (2 * idx) + 2;
  let rchild = this.store[rIdx];
  let swapIdx;
  if (rIdx >= this.store.length) {
    swapIdx = lIdx;
  } else if (this.func(lchid, rchild)) {
    swapIdx = lIdx;
  } else {
    swapIdx = rIdx;
  }
  let currVal = this.store[idx];
  let swpVal = this.store[swapIdx];
  if (this.func(swpVal, currVal)) {
    this.store[swapIdx] = currVal;
    this.store[idx] = swpVal;
    this.bubbleDown(swapIdx);
  }

}

Heap.prototype.size = function () {
  return this.store.length;
}

var MedianFinder = function () {
  this.lower = new Heap(maxHeap);
  this.higher = new Heap(minHeap);
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {

  if (num >= this.higher.peek()) {
    this.higher.insert(num);
  } else {
    this.lower.insert(num);
  }

  // console.log(this.higher.store, this.lower.store)

  if (this.higher.size() >= (this.lower.size() + 1)) {
    this.lower.insert(this.higher.pop());
  };

  if ((this.lower.size() - 1) > this.higher.size()) {
    this.higher.insert(this.lower.pop());
  }
  // console.log(this.higher.store, this.lower.store)

};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  if (this.lower.size() === this.higher.size()) {
    return ((this.lower.peek() + this.higher.peek()) / 2);
  }

  return this.lower.peek();
};