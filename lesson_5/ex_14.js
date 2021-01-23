let obj = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
};

//[["Red", "Green"], "MEDIUM", ["Red", "Green"], ["Orange"], "LARGE"]

console.log(Object.values(obj).map( subObj => {
  if (subObj.type === 'fruit') {
    return subObj.colors.map( color => capitalize(color));
  } else {
    return subObj.size.toUpperCase();
  }
}));

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}