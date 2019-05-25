// Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0 ? Find all unique triplets in the array which gives the sum of zero.
//   Note:
// The solution set must not contain duplicate triplets.

//   Example:

// Given array nums = [-1, 0, 1, 2, -1, -4],

//   A solution set is:
// [
//   [-1, 0, 1],
//   [-1, -1, 2]


var threeSum = function (nums) {
  var results = []
  if (nums.length < 3) return results
  let arr = nums.sort((x, y) => { return x - y })

  for (var i = 0; i < arr.length - 2; i++) {
    if (i > 0 && arr[i - 1] === arr[i]) continue
    var target = -1 * arr[i]
    // if (arr[i + 1] * 2 > target || arr[arr.length - 1] * 2 < target) continue
    
    var j = i + 1
    var k = arr.length - 1
    while (j < k) {
      var sum = arr[j] + arr[k]
      if (sum === target) {
        results.push([arr[i], arr[j], arr[k]])
        j++
        while (j < k && arr[j - 1] === arr[j]) j++
        k--
        while (k < k && arr[k + 1] === arr[k]) k--
      } else if (sum < target) {
        j++
      } else { 
        k--
      }
    }
  }
  return results
};