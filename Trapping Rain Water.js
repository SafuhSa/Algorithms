// Given n non - negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.


// The above elevation map is represented by array[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1].In this case, 6 units of rain water(blue section) are being trapped.Thanks Marcos for contributing this image!

// Example:

//   Input: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
// Output: 6

var trap = function (height) {
  let left = 0;
  let right = height.length - 1;
  let mleft = 0;
  let mright = 0;
  let result = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= mleft) {
        mleft = height[left]
      } else {
        result += mleft - height[left];
      }
      left += 1;
    } else {
      if (height[right] >= mright) {
        mright = height[right];
      } else {
        result += mright - height[right];
      }
      right -= 1;
    }
  }
  return result;
};
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));