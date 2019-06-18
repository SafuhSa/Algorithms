// 336. Palindrome Pairs
// Given a list of unique words, find all pairs of distinct indices(i, j) in the given list, so that the concatenation of the two words, i.e.words[i] + words[j] is a palindrome.

//   Example 1:

// Input: ["abcd", "dcba", "lls", "s", "sssll"]
// Output: [[0, 1], [1, 0], [3, 2], [2, 4]]
// Explanation: The palindromes are["dcbaabcd", "abcddcba", "slls", "llssssll"]
// Example 2:

// Input: ["bat", "tab", "cat"]
// Output: [[0, 1], [1, 0]]
// Explanation: The palindromes are["battab", "tabbat"]


// 336. Palindrome Pairs
var isPalindrome = function (word) {
  let hlf = Math.floor(word.length / 2)
  for (let i = 0; i < hlf; i++) {
    if (word[i] !== word[word.length - 1 - i]) return false;
  }
  return true;
};

var Trie = function () {
  this.next = {};
  this.belowPal = [];
  this.wordEnd = false;
  this.wordIdx = null;
};

var addWordtoTrie = function (trie, word, idx) {
  for (let i = word.length - 1; i >= 0; i--) {
    let char = word[i];

    if (!trie.next[char]) {
      trie.next[char] = new Trie();
    }
    if (isPalindrome(word.substring(0, i + 1))) {
      trie.belowPal.push(idx);
    }
    trie = trie.next[char];
  }
  trie.wordEnd = true;
  trie.wordIdx = idx;
}
var getPalindromesWord = function (trie, word) {
  let idxset = new Set();
  // console.log(word)
  for (let i = 0; i < word.length; i++) {
    let char = word[i];
    // console.log(char)
    if (trie.wordEnd) {

      if (isPalindrome(word.substring(i))) {
        idxset.add(trie.wordIdx);
      }
    }
    if (!trie.next[char]) return idxset;
    trie = trie.next[char];
  }
  if (trie.wordEnd) idxset.add(trie.wordIdx);

  trie.belowPal.forEach(el => {
    idxset.add(el);
  })
  return idxset;
}

var palindromePairs = function (words) {
  let trie = new Trie();
  words.forEach((word, idx) => {
    addWordtoTrie(trie, word, idx);
  });


  let result = [];
  words.forEach((word, idx) => {
    let cand = getPalindromesWord(trie, word);
    // console.log(cand, word, idx)
    cand.forEach(el => {
      if (el !== idx) result.push([idx, el]);
    })
  })

  return result;
};

let input = ["abcd", "dcba", "lls", "s", "sssll"];
// Output: [[0,1],[1,0],[3,2],[2,4]] 
// Explanation: The palindromes are ["dcbaabcd","abcddcba","slls","llssssll"]
console.log(palindromePairs(input));
input = ["bat", "tab", "cat"];
// Output: [[0, 1], [1, 0]]
// Explanation: The palindromes are["battab", "tabbat"]
console.log(palindromePairs(input));