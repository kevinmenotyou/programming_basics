let arr = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']];

// arr.forEach( subarray => {
//   subarray.slice().sort().reverse();
// });

arr.forEach( subarray => {
  subarray.sort( (a, b) => {
    if (typeof a === Number) {
      return b - a;
    }

    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
});

console.log(arr);