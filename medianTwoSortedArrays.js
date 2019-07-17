// 4. Median of Two Sorted Arrays
// There are two sorted arrays nums1 and nums2 of size m and n respectively.

// Find the median of the two sorted arrays.The overall run time complexity should be O(log(m + n)).

// You may assume nums1 and nums2 cannot be both empty.

//   Example 1:

// nums1 = [1, 3]
// nums2 = [2]

// The median is 2.0
// Example 2:

// nums1 = [1, 2]
// nums2 = [3, 4]

// The median is(2 + 3) / 2 = 2.5

var findMedianSortedArrays = function (nums1, nums2) {
  let numsS = nums1;
  let numsL = nums2;
  if (nums1.length > nums2.length) {
    numsS = nums2;
    numsL = nums2;
  }

  let len = numsS.length + numsL.length;
  let start = 0;
  let end = numsS.length;

  // binary search
  while(start <= end) {
    let partitionS = Math.floor((start+end) / 2);
    let partitionL = Math.floor((len + 1) / 2) - partitionS;
    let x1 = numsS[partitionS - 1] !== undefined ? numsS[partitionS - 1] :-Infinity;
    let x2 = numsS[partitionS] !== undefined ? numsS[partitionS] :Infinity;
    let y1 = numsL[partitionL - 1] !== undefined ? numsL[partitionL - 1] :-Infinity;
    let y2 = numsL[partitionL] !== undefined ? numsL[partitionL] :Infinity;

    if(x1 <= y2 && y1 <= x2) {
      if(len % 2 !== 0) return Math.max(x1, y1);

      return (Math.max(x1, y1) + Math.min(y2, x2)) / 2;
    }else if(x1 > y2) {
      end = partitionS -1;
    }else {
      start = partitionS+1;
    }
  }
}

let nums1 = [1, 3]
let nums2 = [2]
let expected = 2.0;
console.log('output', findMedianSortedArrays(nums1, nums2))
console.log('expected', expected);

nums1 = [1, 2]
nums2 = [3, 4]
expected = 2.5; //(2 + 3) / 2 = 2.5;
console.log('output', findMedianSortedArrays(nums1, nums2))
console.log('expected', expected);
