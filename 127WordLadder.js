// Given two words(beginWord and endWord), and a dictionary's word list, find the length of shortest transformation sequence from beginWord to endWord, such that:

// Only one letter can be changed at a time.
// Each transformed word must exist in the word list.Note that beginWord is not a transformed word.
//   Note:

// Return 0 if there is no such transformation sequence.
// All words have the same length.
// All words contain only lowercase alphabetic characters.
// You may assume no duplicates in the word list.
// You may assume beginWord and endWord are non - empty and are not the same.
//   Example 1:

// Input:
// beginWord = "hit",
//   endWord = "cog",
//   wordList = ["hot", "dot", "dog", "lot", "log", "cog"]

// Output: 5

// Explanation: As one shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog",
// return its length 5.
// Example 2:

// Input:
// beginWord = "hit"
// endWord = "cog"
// wordList = ["hot", "dot", "dog", "lot", "log"]

// Output: 0

// Explanation: The endWord "cog" is not in wordList, therefore no possible transformation.

var bfs = function(stack, dicn, visted, otherVisted) {
  let word, level;
  [word, level] = stack.shift();

  for(let i =0; i < word.length; i++) {
    let curr = word.substring(0, i) + "*" + word.substring(i+1);
    let nextWords = dicn.get(curr);
    if(!nextWords) continue;
    for(let word of nextWords) {
      if(otherVisted.has(word)) {
        return level + otherVisted.get(word);
      }
      if(!visted.has(word)) {
        stack.push([word, level+1]);
        visted.set(word, level+1);
      }
    }
  }
}

var ladderLength = function (beginWord, endWord, wordList) {
  if(!beginWord || !endWord || !wordList.length || !wordList.includes(endWord)) return 0;


  let dicn = new Map();
  for(let word of wordList) {
    for(let i =0; i< word.length; i++) {
      let curr = word.substring(0,i) + "*" + word.substring(i+1);
      let nextWords= dicn.get(curr);
      if(!nextWords) {
        nextWords = [];
        dicn.set(curr, nextWords);
      }
      nextWords.push(word);
    }
  };
  
  let vistedBegin = new Map();
  vistedBegin.set(beginWord, 1);
  beginStack = [[beginWord, 1]];

  let vistedEnd = new Map();
  vistedEnd.set(endWord, 1);
  endStack = [[endWord, 1]];

  while(beginStack.length && endStack.length) {

    let ans = bfs(beginStack, dicn, vistedBegin, vistedEnd);
    if(ans) return ans;
    ans = bfs(endStack, dicn, vistedEnd, vistedBegin)
    if(ans) return ans;
  }
  return 0;
};

// var ladderLength = function (beginWord, endWord, wordList) {
//   if (!beginWord || !endWord || !wordList.length || !wordList.includes(endWord)) return 0;
//   let dicn = new Map();

//   for(let word of wordList) {
//     for(let i=0; i < word.length; i++) {
//       let curr = word.substring(0, i) + "*" + word.substring(i+1);
//       let val = dicn.get(curr);
//       if(!val) {
//         val=[];
//         dicn.set(curr, val);
//       }
//       val.push(word);
//     }
//   };
//   // console.log(dicn);
//   let visted = new Set();
//   visted.add(beginWord);
//   let stack = [[beginWord, 1]];
//   while(stack.length) {
//     let word, level;
//     [word, level] = stack.shift();

//     for(let i=0; i< word.length; i++) {
//       let curr = word.substring(0, i) + "*" + word.substring(i + 1);
//       let nextWords = dicn.get(curr);
//       // console.log(curr ,nextWords)
//       if(!nextWords) continue;
//       for(let next of nextWords) {
//         if(next === endWord) return level+1;
//         if(!visted.has(next)) {
//           stack.push([next, level+1])
//           visted.add(next);
//         }
//       }
//       dicn.delete(curr);// its not necessary but its good to have to save some time;
//     }
//   }
//   return 0;
// };
let beginWord = "hit";
let endWord = "cog";
let wordList = ["hot", "dot", "dog", "lot", "log", "cog"];
// Output: 5
console.log(ladderLength(beginWord, endWord, wordList));
beginWord = "hit";
endWord = "cog";
wordList = ["hot", "dot", "dog", "lot", "log"];
// Output: 0
console.log(ladderLength(beginWord, endWord, wordList));