let arr = [[2], [3, 5, 7], [9], [11, 15, 18]];

console.log(arr.map(subarray => {
  return subarray.filter( item => item % 3 === 0);
}));