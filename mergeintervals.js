// Given a collection of intervals, merge all overlapping intervals.

//   Example 1:
// Input: [[1, 3], [2, 6], [8, 10], [15, 18]]
// Output: [[1, 6], [8, 10], [15, 18]]
// Explanation: Since intervals[1, 3] and[2, 6] overlaps, merge them into[1, 6].
//   Example 2:

// Input: [[1, 4], [4, 5]]
// Output: [[1, 5]]
// Explanation: Intervals[1, 4] and[4, 5] are considered overlapping.
var merge = function (intervals) {
  let result = []
  let arr = intervals.slice(0).sort((a, b) => a.start - b.start);

  for (let i = 0; i < arr.length; i++) {
    let sub = arr[i];

    if (result[result.length - 1] && result[result.length - 1].end < sub.end && sub.start <= result[result.length - 1].end) {
      result[result.length - 1].end = sub.end;
    } else if (!result[result.length - 1] || result[result.length - 1].end < sub.start) {
      result.push(sub);
    }
  }
  intervals = result
  return result;
};