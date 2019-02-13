// Given an array of integers, return indices of the two numbers such that they add up to a specific target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// Given nums = [2, 7, 11, 15], target = 9,

//   Because nums[0] + nums[1] = 2 + 7 = 9,
// return [0, 1].

var twoSum = function (nums, target) {
  let hsh = {};
  let i = 0;
  while (nums.length > i) {
    let num = nums[i];
    let key = target - num

    if (hsh[num] !== undefined) {
      return [hsh[num], i];
    }

    hsh[key] = i
    i += 1;
  }
};