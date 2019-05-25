// 870. Advantage Shuffle
// Given two arrays A and B of equal size, the advantage of A with respect to B is the number of indices i for which A[i] > B[i].

// Return any permutation of A that maximizes its advantage with respect to B.



//   Example 1:

// Input: A = [2, 7, 11, 15], B = [1, 10, 4, 11]
// Output: [2, 11, 7, 15]
// Example 2:

// Input: A = [12, 24, 8, 32], B = [13, 25, 32, 11]
// Output: [24, 32, 8, 12]


// Note:

// 1 <= A.length = B.length <= 10000
// 0 <= A[i] <= 10 ^ 9
// 0 <= B[i] <= 10 ^ 9

var advantageCount = function (A, B) {
  let sortedA = A.sort((a, b) => a - b);
  let bidxs = B.map((el, i) => i).sort((i1, i2) => B[i1] - B[i2]);
  let noUseA = [];
  let res = []//Array(A.length);

  let j = 0;
  for (let i of bidxs) {
    while (j < A.length && sortedA[j] <= B[i]) {
      noUseA.push(sortedA[j]);
      j++;
    }


    if (j === A.length) {
      res[i] = noUseA.pop();
    } else {
      res[i] = sortedA[j];
      j++;
    }
  }
  return res;
  
  //     let a = A.sort((a, b) => a - b); // [ 8, 12, 24, 32 ]  // [2, 7, 11, 15]
  //     let b = [...B].sort((a, b) => a - b); // [ 11, 13, 25, 32 ] // [1, 4, 10, 11]
  //     let obj = {};
  //     let noUseA = [];

  //     let j = 0;
  //     for(let i= 0; i < a.length; i++) {
  //         if (a[i] > b[j]) {
  //             if (obj[b[j]]) {
  //                 obj[b[j]].push(a[i])
  //             }else {
  //                 obj[b[j]] = [a[i]];
  //             }
  //             j++;
  //         } else {
  //             noUseA.push(a[i]);
  //         }
  //     }

  //         for(let i= 0; i < B.length; i++) {
  //             let el = B[i];

  //             if(obj[el] && obj[el].length > 0) {
  //                 A[i] = obj[el].pop();
  //             }else {
  //                 A[i] = noUseA.pop();
  //             }
  //         }

  //         return A;
};