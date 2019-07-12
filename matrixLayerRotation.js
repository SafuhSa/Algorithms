function matrixRotation(matrix, r) {


}

let matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
[9, 10, 11, 12],
[13, 14, 15, 16]
];
let r = 2;
console.log('output', matrixRotation(matrix, r));
console.log('expexted', expected);

matrix = [
  [1, 2, 3, 4]
[7, 8, 9, 10]
[13, 14, 15, 16]
[19, 20, 21, 22]
[25, 26, 27, 28]
];
r = 7;
console.log('output', matrixRotation(matrix, r));
console.log('expexted', expected);

matrix = [
  [1, 1]
  [1, 1]
];
r = 3;
console.log('output', matrixRotation(matrix, r));
console.log('expexted', expected);