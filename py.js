function buble(arrays) {
  const n = arrays.length;
  let swapped;

  for (let i = 0; i < n; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arrays[j] > arrays[j + 1]) {
        [arrays[j], arrays[j + 1]] = [arrays[j + 1], arrays[j]];
        swapped = true;
      }
    }

    if (!swapped) break;
  }
  return arrays;
}

arr = [6, 7, 2, 4, 6, 8, 9, 0, 4, 2, 6, 3, 5, 100, 50, 34, 10.36, 37];

let x = buble(arr);

console.log("unsorted", arr);
console.log("sorted", x);
