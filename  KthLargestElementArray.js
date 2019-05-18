// Find the kth largest element in an unsorted array.Note that it is the kth largest element in the sorted order, not the kth distinct element.
//   Example 1:
// Input: [3, 2, 1, 5, 6, 4] and k = 2
// Output: 5
// Example 2:

// Input: [3, 2, 3, 1, 2, 4, 5, 5, 6] and k = 4
// Output: 4
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// var siftUp = function (arr, idx) {
//     if (idx < 2) return;

//     let parentIdx = Math.floor(idx / 2);
//     let parentVal = arr[parentIdx];
//     let val = arr[idx];
//     if (val > parentVal) {
//         [arr[idx], arr[parentIdx]] =  [arr[parentIdx], arr[idx]];
//         siftUp(arr, parentIdx)
//     }
//     return;
// }

// var siftDown = function(arr, idx) {
//     if (arr.length - 1 <= idx) return;

//     let leftIdx = idx * 2;
//     let rightIdx = leftIdx + 1;
//     let leftVal = arr[leftIdx];
//     let rightVal = arr[rightIdx];

//     let swapIdx;
//     if (leftVal < rightVal) {
//         swapIdx = rightIdx;
//     }else {
//         swapIdx = leftIdx;
//     }

//     if(arr[swapIdx] > arr[idx]) {
//         [arr[idx], arr[swapIdx]] = [arr[swapIdx] , arr[idx]];
//         siftDown(arr, swapIdx)
//     }

//     return;
// }

// var deleteVal = function(arr) {
//     if (arr.length === 1) return;
//     if (arr.length === 2) return arr.pop();

//     let val = arr[1];
//     arr[1] = arr.pop();

//     siftDown(arr, 1);

//     return val;
// }

var quickselect = function (arr, lo, hi, k) {
  let pivtIdx = Math.floor(Math.random() * (hi - lo + 1)) + lo;
  let pivtVal = arr[pivtIdx];
  [arr[hi], arr[pivtIdx]] = [arr[pivtIdx], arr[hi]];
  let i = lo;
  let j = hi - 1;

  while (i <= j) {
    if (arr[i] <= pivtVal) {
      i++;
    } else {
      [arr[j], arr[i]] = [arr[i], arr[j]];
      j--;
    }
  }
  [arr[i], arr[hi]] = [arr[hi], arr[i]];

  pivtIdx = i;

  if (pivtIdx === (arr.length - k)) return arr[pivtIdx];
  if (pivtIdx < (arr.length - k)) return quickselect(arr, pivtIdx + 1, hi, k);
  return quickselect(arr, lo, pivtIdx - 1, k)
}

var findKthLargest = function (nums, k) {

  return quickselect(nums, 0, nums.length - 1, k)
  //     nums.unshift(null);
  //     for(let i = 2; i < nums.length; i++) {
  //         siftUp(nums, i);
  //     }
  //     let result;
  //     for(let i = 0; i < k; i++) {
  //         result = deleteVal(nums)
  //     }

  //     return result;
};