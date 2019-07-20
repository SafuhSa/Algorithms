// Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0 ? Find all unique triplets in the array which gives the sum of zero.
//   Note:
// The solution set must not contain duplicate triplets.
//   Example:
// Given array nums = [-1, 0, 1, 2, -1, -4],
//   A solution set is:
// [
//   [-1, 0, 1],
//   [-1, -1, 2]

// var threeSum = function (nums) {
//   var results = []
//   if (nums.length < 3) return results
//   let arr = nums.sort((x, y) => { return x - y })

//   for (var i = 0; i < arr.length - 2; i++) {
//     if (i > 0 && arr[i - 1] === arr[i]) continue
//     var target = -1 * arr[i]
//     // if (arr[i + 1] * 2 > target || arr[arr.length - 1] * 2 < target) continue
    
//     var j = i + 1
//     var k = arr.length - 1
//     while (j < k) {
//       var sum = arr[j] + arr[k]
//       if (sum === target) {
//         results.push([arr[i], arr[j], arr[k]])
//         j++
//         while (j < k && arr[j - 1] === arr[j]) j++
//         k--
//         while (k < k && arr[k + 1] === arr[k]) k--
//       } else if (sum < target) {
//         j++
//       } else { 
//         k--
//       }
//     }
//   }
//   return results
// };

var threeSum = function (nums) {
  let result = [];
  nums = nums.sort((a, b) => { return a - b } );

  for(let i = 0; i < nums.length; i++) {
    if(nums[i] === nums[i-1]) continue;

    let left = i+1;
    let right = nums.length-1;
    let target = nums[i] * -1;
    while(left < right) {
      if(nums[left] + nums[right] < target) {
        left++;
      }else if(nums[left] + nums[right] > target) {
        right--;
      }else {
        result.push([nums[i], nums[left], nums[right]]);
        left++;
        while(left < right && nums[left] === nums[left-1]) left++;
        right--;
        while(left < right && nums[right] === nums[right+1]) right--;
      }
    }
  }
  return result;
}
// Given array nums = [-1, 0, 1, 2, -1, -4],

//   A solution set is:
[
  [-1, 0, 1],
  [-1, -1, 2]
]