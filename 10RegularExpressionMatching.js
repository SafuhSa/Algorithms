// 0. Regular Expression Matching
// Hard

// 2670

// 520

// Favorite

// Share
// Given an input string(s) and a pattern(p), implement regular expression matching with support for '.' and '*'.

// '.' Matches any single character.
// '*' Matches zero or more of the preceding element.
// The matching should cover the entire input string(not partial).

//   Note:

// s could be empty and contains only lowercase letters a - z.
// p could be empty and contains only lowercase letters a - z, and characters like.or *.
//   Example 1:

// Input:
// s = "aa"
// p = "a"
// Output: false
// Explanation: "a" does not match the entire string "aa".
//   Example 2:

// Input:
// s = "aa"
// p = "a*"
// Output: true
// Explanation: '*' means zero or more of the precedeng element, 'a'.Therefore, by repeating 'a' once, it becomes "aa".
//   Example 3:

// Input:
// s = "ab"
// p = ".*"
// Output: true
// Explanation: ".*" means "zero or more (*) of any character (.)".
//   Example 4:

// Input:
// s = "aab"
// p = "c*a*b"
// Output: true
// Explanation: c can be repeated 0 times, a can be repeated 1 time.Therefore it matches "aab".
//   Example 5:

// Input:
// s = "mississippi"
// p = "mis*is*p*."
// Output: false

var isMatch = function (s, p) {
  let arr2D = new Array(s.length + 1)//.fill(0).map(el=> new Array(p.length+1));
  arr2D[0] = [true];

  for (let i = 1; i < p.length + 1; i++) {
    if (p[i - 1] === "*") {
      arr2D[0][i] = arr2D[0][i - 2];
    } else {
      arr2D[0][i] = false;
    }
  }

  for (let i = 1; i < arr2D.length; i++) {
    arr2D[i] = [false];
    for (let j = 1; j < arr2D[0].length; j++) {
      let pchar = p[j - 1];
      let schar = s[i - 1];

      if (pchar === schar || pchar === ".") {
        arr2D[i][j] = arr2D[i - 1][j - 1];
      } else if (pchar === "*") {
        arr2D[i][j] = arr2D[i][j - 2];
        if (p[j - 2] === "." || p[j - 2] === schar) {
          arr2D[i][j] = arr2D[i][j] || arr2D[i - 1][j];
        }
      } else {
        arr2D[i][j] = false;
      }
    }
  }

  return arr2D[s.length][p.length];
};

let s = "mississippi"
let p = "mis*is*p*."
// Output: false
console.log(isMatch(s, p));
s = "aa"
p = "a"
// Output: false
// Explanation: "a" does not match the entire string "aa".
console.log(isMatch(s, p));
s = "aa"
p = "a*"
// Output: true
// Explanation: '*' means zero or more of the precedeng element, 'a'.Therefore, by repeating 'a' once, it becomes "aa".
console.log(isMatch(s, p));
s = "ab"
p = ".*"
// Output: true
// Explanation: ".*" means "zero or more (*) of any character (.)".
console.log(isMatch(s, p));
s = "aab"
p = "c*a*b"
// Output: true
// Explanation: c can be repeated 0 times, a can be repeated 1 time.Therefore it matches "aab".
console.log(isMatch(s, p));
s = "ablmy";
p = "a*b.*y";
console.log(isMatch(s, p));