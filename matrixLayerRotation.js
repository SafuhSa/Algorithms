// function matrixRotation(matrix, r) {
//   let layer = 0; 
//   let m = matrix.length; 
//   let n = matrix[layer].length;

//   while(layer <= (matrix.length - 1 - layer) && layer <= (matrix[layer].length - 1 - layer)) {
//     let circl = (m - (2 * layer)) * 2 + (n - (2 * layer) - 2) * 2;
//     let nr = r % circl;
//     let visted = {};

//     for(let i = layer; i < matrix.length - layer; i++) {
//       let val = matrix[i][layer];
//       moveDown(val, matrix, i, nr, visted, layer);
//     };

//     let bottom = matrix.length - 1 - layer;
//     for(let j = layer+1; j < matrix[bottom].length - layer; j++) {
//       let val = matrix[bottom][j];
//       moveRight(val, matrix, j, nr, visted, layer);
//     };

//     for(let i = bottom-1; i >= layer; i--) {
//       let right = matrix[i].length - 1 - layer; 
//       let val = matrix[i][right];
//       moveUp(val, matrix, i, nr, visted, layer);
//     };

//     for(let j = matrix[layer].length - 2 - layer; j > layer; j--) {
//       let val = matrix[layer][j];
//       moveLeft(val, matrix, j, nr, visted, layer);
//     };
//     layer+= 1;
//   };
//   return matrix;
// };

// function moveDown(val, matrix, i, r, visted, layer) { //val, matrix, i, nr, visted, layer);
//   if(r === 0) return;
//   let bottom = matrix.length - 1 - layer;
//   let nextMove = i + r;
  
//   if(nextMove <= bottom) {
//     let key = `i: ${nextMove}, j: ${layer}`;
//     if(visted[key]) return;
//     let temp = matrix[nextMove][layer];
//     matrix[nextMove][layer] = val;
//     visted[key] = true;
//     // if(val === 1) {
//     //   console.log('te', temp)
//     // }
//     moveDown(temp, matrix, nextMove, 7, visted, layer);
//     // moveDown(temp, matrix, nextMove, r, visted, layer);
//   }else {
//     let diff = nextMove - bottom;
//     moveRight(val, matrix, layer, diff, visted, layer);
//   }
// }

// function moveRight(val, matrix, j, r, visted, layer) {
//   if (r === 0) return;
//   let bottom = matrix.length - 1 - layer;
//   let right = matrix[bottom].length - 1 - layer;
//   let nextMove = j + r;
  
  
//   if(nextMove <= right) {
//     let key = `i: ${bottom}, j: ${nextMove}`;
//     if(visted[key]) return;
//     visted[key] = true;
//     let temp = matrix[bottom][nextMove];
//     matrix[bottom][nextMove] = val;
//     moveRight(temp, matrix, nextMove, 7, visted, layer) 
//     // moveRight(temp, matrix, nextMove, r, visted, layer) 
//   }else {
//     let diff = nextMove - right;
//     moveUp(val, matrix, bottom, diff, visted, layer)
//   }
// }

// function moveUp(val, matrix, i, r, visted, layer) {
//   if(r === 0) return;
//   let top = layer;
//   let right = matrix[i].length - 1 - layer;
//   let nextMove = i - r;
//   if(nextMove >= top) {
//     let key = `i: ${nextMove}, j: ${right}`;
//     if(visted[key]) return;
//     visted[key] = true;
//     let temp = matrix[nextMove][right];
//     matrix[nextMove][right] = val;
//     moveUp(temp, matrix, nextMove, 7, visted, layer);
//     // moveUp(temp, matrix, nextMove, r, visted, layer);
//   }else {
//     let diff = r - (i - top);
//     moveLeft(val, matrix, right, diff, visted, layer);
//   }
// };

// function moveLeft(val, matrix, j, r, visted, layer) {
//   if(r === 0) return;
//   let left = layer;
//   let nextMove = j - r;

//   if(nextMove >= left) {
//     let key = `i: ${layer}, j: ${nextMove}`;
//     if(visted[key]) return;
//     visted[key] = true;
//     let temp = matrix[layer][nextMove];
//     matrix[layer][nextMove] = val;
//     moveLeft(temp, matrix, nextMove, 7, visted, layer);
//     // moveLeft(temp, matrix, nextMove, r, visted, layer);
//   }else {
//     let diff = r - (j - left);
//     moveDown(val, matrix, left, diff, visted,  layer);
//   }
// };

let matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
];
let r = 1;
let expected = [
 [3, 4, 8, 12],
 [2, 11, 10, 16],
 [1, 7, 6, 15],
 [5, 9, 13, 14]
]
// console.log(matrix)
// console.log(' ')
// console.log(matrixRotation(matrix, r));
// console.log(' ')
// console.log('expexted');
// console.log(expected)

matrix = [
 [1, 2, 3, 4],
 [7, 8, 9, 10],
 [13, 14, 15, 16],
 [19, 20, 21, 22],
 [25, 26, 27, 28]
];
r = 7;
expected = [
 [28, 27, 26, 25],
 [22, 9, 15, 19],
 [16, 8, 21, 13],
 [10, 14, 20, 7],
 [4, 3, 2 ,1]
];
console.log(matrix)
console.log(' ')
console.log(matrixRotation(matrix, r));
console.log(' ')
console.log('expexted');
console.log(expected)
// console.log('expexted', expected);
// console.log(matrixRotation(matrix, r));

matrix = [
  [1, 1],
  [1, 1]
];
r = 3;
expected = [
  [1, 1],
  [1, 1]
];
// console.log('expexted', expected);
// console.log(matrixRotation(matrix, r));
// r = 2;
// [0, 1, 2, 3, 3,  3,  3,  2,  1,  0, 0, 0]
// [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5] ln = 12

// [2, 3, 3, 3,  3,  2,  1,  0,  0, 0, 0, 1]
// [3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 1, 2];



//  if (i + r) < layer.length => print matrix[layer][i+r];
//  else if (r - layer.length+1) < matrix.length - layer => print matrix[][right]



// [6, 7, 11, 10],
// [11, 10, 6, 7]