
// Given a string s, find the longest palindromic substring in s.You may assume that the maximum length of s is 1000.

// Example 1:

// Input: "babad"
// Output: "bab"
// Note: "aba" is also a valid answer.
//   Example 2:

// Input: "cbbd"
// Output: "bb"
// "amkkaakkmmcbcmmkaakij"

//  "d  n  c  d  b  b  d  c  d  r"
//  [0, 0, 0, 0  ]


var longestPalindrome = function (strr) {
  let str = '$' + strr.split('').join('$') + '$';
  let arr = new Array(str.length);
  let radius = 0;
  let center = 0;
  let bRadius = 0;
  let bCenter = 0;

  for (let i = 0; i < str.length; i++) {
    const end = radius + center;
    if (end === str.length - 1) break;
    arr[i] = 1;
    if (i < end) {
      let diff = end - i;
      let imirro = center - (i - center);
      arr[i] = Math.min(arr[imirro], diff);
    }
    while (str[i - arr[i]] === str[i + arr[i]] && i + arr[i] < str.length && i - arr[i] >= 0) arr[i]++;

    if ((i + arr[i]) > end) {
      radius = arr[i];
      center = i;
    }

    if (arr[i] > bRadius) {
      bCenter = i;
      bRadius = arr[i];
    }
  }

  return strr.substring((bCenter - bRadius + 1) / 2, (bCenter + bRadius - 1) / 2)
}