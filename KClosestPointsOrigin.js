// 973. K Closest Points to Origin

// We have a list of points on the plane.Find the K closest points to the origin(0, 0).

// (Here, the distance between two points on a plane is the Euclidean distance.)

// You may return the answer in any order.The answer is guaranteed to be unique(except for the order that it is in.)



// Example 1:

// Input: points = [[1, 3], [-2, 2]], K = 1
// Output: [[-2, 2]]
// Explanation:
// The distance between(1, 3) and the origin is sqrt(10).
// The distance between(-2, 2) and the origin is sqrt(8).
// Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
// We only want the closest K = 1 points from the origin, so the answer is just[[-2, 2]].
//   Example 2:

// Input: points = [[3, 3], [5, -1], [-2, 4]], K = 2
// Output: [[3, 3], [-2, 4]]
//   (The answer[[-2, 4], [3, 3]] would also be accepted.)

var kClosest = function (points, K) {
  points = quickselect(points, K, 0, points.length - 1);
  return points.slice(0, K);
};

function quickselect(points, k, low, end) {
  let pivot = end;
  let swapIdx = low;
  for (let i = low; i < end; i++) {
    if (getDist(points[i]) < getDist(points[pivot])) {
      swap(points, swapIdx, i);
      swapIdx++;
    }
  }
  swap(points, swapIdx, pivot);
  if (swapIdx === k - 1) return points;

  if (swapIdx < k - 1) {
    return quickselect(points, k, swapIdx + 1, end)
  } else {
    return quickselect(points, k, low, swapIdx - 1);
  }
}

function swap(points, j, i) {
  let temp = points[i];
  points[i] = points[j];
  points[j] = temp;
}

function getDist(pos) {
  return (pos[0] ** 2 + pos[1] ** 2);
};


let points = [[3, 3], [5, -1], [-2, 4]];
let K = 2;
let expected = [[3, 3], [-2, 4]];
  // (The answer[[-2, 4], [3, 3]] would also be accepted.)
console.log('output', kClosest(points, K));
console.log('expected', expected);

points = [[0, 1], [1, 0]];
k = 2;
expected = [[0, 1], [1, 0]];
console.log('output', kClosest(points, K));
console.log('expected', expected);
      // [ 40,           53,     117,     109,       65,   68]
points = [[-2, -6], [-7, -2], [-9, 6], [10, 3], [-8, 1], [2, 8]];
K = 5;
expected = [[-2, -6], [-7, -2], [10, 3], [-8, 1], [2, 8]];;
console.log('output', kClosest(points, K));
console.log('expected', expected);

//       [   81,     149,      20,       90,     82,    26 ]
points = [[9, 0], [7, 10], [-4, -2], [3, -9], [9, 1], [-5, -1]]
K = 5
expected = [[9, 0], [-4, -2], [3, -9], [9, 1], [-5, -1]];
// console.log(points.map(el => getDist(el)))
console.log('output', kClosest(points, K));
console.log('expected', expected);