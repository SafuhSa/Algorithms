// Given a string which consists of lowercase or uppercase letters, find the length of the longest palindromes that can be built with those letters.

// This is case sensitive, for example "Aa" is not considered a palindrome here.

//   Note:
// Assume the length of given string will not exceed 1, 010.

//   Example:

// Input:
// "abccccdd"

// Output:
// 7

// Explanation:
// One longest palindrome that can be built is "dccaccd", whose length is 7.


var longestPalindrome = function (s) {
  let hsh = {};
  let count = 0;

  for (let i = 0; i < s.length; i++) {
    if (hsh[s[i]] === 1) {
      hsh[s[i]] = 0;
      count += 2;
    } else {
      hsh[s[i]] = 1
    }
  }

  if (count < s.length) (
    count += 1
  )

  return count
};