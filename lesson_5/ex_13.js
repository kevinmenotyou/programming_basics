let arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];

arr.sort( (a, b) => {
  return a.filter( item => item % 2 !== 0).reduce ((accumulator, current) => {
    return accumulator + current;
  }, 0) - b.filter( item => item % 2 !== 0).reduce ((accumulator, current) => {
    return accumulator + current;
  }, 0);
});

console.log(arr);