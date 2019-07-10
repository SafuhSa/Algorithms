function surfaceArea(A) {
  let sum = 0;

  for(var i = 0; i < A.length; i++) {
    for(var j = 0; j < A[i].length; j++) {
      let cell = A[i][j];
      let left = A[i][j - 1] || 0;
      let top = 0;
      if(A[i-1]) top = A[i-1][j];
      sum += 2; // floor and ceiling (1 H * 1 W) * 2 = 2;
      sum += Math.abs(top - cell);
      sum += Math.abs(left - cell);
      
      // if(i === A.length-1) sum += cell;
    }
    sum += A[i][j-1];
  }

  sum+= A[i-1].reduce((acc, num) => acc + num);
  return sum;
}

let input = [[1]];
let expected = 6;
console.log('input', input, 'output', surfaceArea(input), 'expected', expected);

input = [
  [1, 3, 4],
  [2, 2, 3],
  [1, 2, 4]
];
expected = 60;
console.log('input', input, 'output', surfaceArea(input), 'expected', expected);