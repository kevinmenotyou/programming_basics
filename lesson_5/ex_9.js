let arr = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']];

arr.forEach( subarray => {
  subarray.slice().sort();
});

console.log(arr);