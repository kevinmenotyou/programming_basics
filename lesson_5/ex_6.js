let munsters = {
  herman: { age: 32, gender: 'male' },
  lily: { age: 30, gender: 'female' },
  grandpa: { age: 402, gender: 'male' },
  eddie: { age: 10, gender: 'male' },
  marilyn: { age: 23, gender: 'female'}
};

//(Name) is a (age)-year-old (male or female).

for (const [key, value] of Object.entries(munsters)) {
  console.log(`${capitalize(key)} is a ${value.age}-year-old ${value.gender}.`);
}

function capitalize(name) {
  return name[0].toUpperCase() + name.slice(1);
}