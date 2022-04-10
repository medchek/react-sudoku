import {
  generateSafeNumberFromPossibilities,
  getArrayMinNumberIndex,
  getLeastOccurredNumberCount,
  getMissingNumbers,
  removeArrayDuplicates,
  removeNumberOccurrence,
} from "./sudoku-utils";

test("removeNumberOccurrence should return the array without the number to be removed", () => {
  const array: number[][] = [
    [1, 5, 4],
    [1, 5, 7, 9],
    [3, 6, 8],
    [1, 2, 3],
  ];
  const result = removeNumberOccurrence(array, 1, [3]);
  expect(result).toStrictEqual([[5, 4], [5, 7, 9], [3, 6, 8], []]);
});

test("generateSafeNumberFromPossibilities should return a number that does not occur in the possibilities", () => {
  const number = "75";
  const possibilities = [125, 354, 9856];
  const result = generateSafeNumberFromPossibilities(number, possibilities);

  expect(result).toBe(7);
});

test("removeArrayDuplicates removes all duplicates in array", () => {
  const arrayWithDupe = [1, 1, 2, 3, 3, 4, 5, 6, 7, 1];
  const removedDuplicates = removeArrayDuplicates(arrayWithDupe).sort();

  expect(removedDuplicates).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
});

test("getMissingNumbers returns the missing numbers in an array", () => {
  const numbers = [1, 2, 3, 4, 5];
  const expected = [6, 7, 8, 9];
  const result = getMissingNumbers(numbers).sort();
  expect(result).toStrictEqual(expected);
});

test("getArrayMinNumberIndex returns the index of the smallest number in the array", () => {
  // const numbers = [7, 8, 3, 5, 9, 4];
  const numbers = [
    [1, 1, 4, 6, 7, 8], // will be considered as the number 114678
    [1, 1, 4, 6, 7, 8],
    [1, 2, 4, 6, 7, 8], // will be considered as the number 124678
    [2, 3, 4, 5, 8, 9], // will be considred as the number 234589
    [2, 3, 4, 5, 8, 9], // ...and so on
    [2, 3, 4, 5, 8, 9],
    [1, 3, 5, 6, 7, 9],
    [1, 3, 5, 6, 7, 9],
    [1, 3, 5, 6, 7, 9],
  ];
  const ignoreList = [0]; // ignore the first [1,1,4,6,7,8] at index 0
  const result = getArrayMinNumberIndex(numbers, ignoreList);
  expect(result).toBe(1);
});

test("getLeastOccurredNumberCount should return the number that is the least present in the possibilities", () => {
  const numbers = [2, 9];
  const possibilities = [[2], [3, 9], [0], [2], [0], [3, 9], [3], [0], [2, 9]];
  const ignoreList = [0, 2, 3, 4, 6, 7];
  const result = getLeastOccurredNumberCount(
    numbers,
    possibilities,
    ignoreList
  );
  // in the number 29, and while considering the ignoreList, the number 2 is the least present in the possibilities, occurring once in the last value 29 (since all the other values are to be ignored)
  expect(result).toBe(2);
});
