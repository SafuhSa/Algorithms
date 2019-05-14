
// Given a string s, find the longest palindromic substring in s.You may assume that the maximum length of s is 1000.

// Example 1:

// Input: "babad"
// Output: "bab"
// Note: "aba" is also a valid answer.
//   Example 2:

// Input: "cbbd"
// Output: "bb"

var longestPalindrome = function (str) {
  let arr = [];
  let longest = str[0];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      arr.push({ endd: i + 1, start: i })
    }
    if (str[i] === str[i + 2]) {
      arr.push({ endd: i + 2, start: i })
    }
  }
  // console.log(arr)
  for (let sub of arr) {
    while (sub.start >= 0 && str[sub.start] === str[sub.endd]) {
      sub.start -= 1;
      sub.endd += 1;
    }
    // console.log(sub)
    let subStr = str.slice(sub.start + 1, sub.endd)
    if (longest.length < subStr.length) {
      longest = subStr;
    }
  }

  return longest || '';
};

// "dncdbbdcdr"
// "amkkaakkmmcbcmmkaakij"