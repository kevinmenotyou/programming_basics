let utfValues = {
  0: 48, // 0
  1: 49, // 1
  2: 50, // 2
  3: 51, // 3
  4: 52, // 4
  5: 53, // 5
  6: 54, // 6
  7: 55, // 7
  8: 56, // 8
  9: 57, // 9
  10: 97, // a
  11: 98, // b
  12: 99, // c
  13: 100, // d
  14: 101, // e
  15: 102 // f
};

// 8-4-4-12


console.log(generateUUID());

function generateUUID() {
  let uuid = "";
  for (let num = 0; num < 28; num++) {
    uuid += String.fromCharCode(utfValues[Math.floor(Math.random() * 16)]);
  }
  return uuid.slice(0, 8) + "-" + uuid.slice(8, 12) + "-" + uuid.slice(12, 16) + "-" + uuid.slice(17);
}
