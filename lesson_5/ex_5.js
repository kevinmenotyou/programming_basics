let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};

let age = Object.values(munsters).filter( munster => {
  return munster.gender === 'male';
}).reduce((accumulator, current) => accumulator + current.age, 0);
console.log(age);