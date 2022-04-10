/**
 * Helper function to generate a random number between the given range
 */
export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * returns the initial index (of a row or column) inside a 3x3 square of a 9x9 grid
 * @param currentIndex the target row or col index
 */
export const getInitialSquareIndex = (currentIndex: number): number => {
  if (currentIndex < 0 || currentIndex > 8) {
    throw new Error("invalid currentIndex, must be between 0 and 8");
  }
  if (currentIndex >= 0 && currentIndex <= 2) return 0;
  else if (currentIndex >= 3 && currentIndex <= 5) return 3;
  else if (currentIndex >= 6 && currentIndex <= 8) return 6;
  else return 0;
};

/**
 * returns the last index (of a row or column) of a 3x3 square in a 9x9 grid
 * @param currentIndex the target row or col index
 */
export const getLastSquareIndex = (currentIndex: number): number => {
  if (currentIndex < 0 || currentIndex > 8) {
    throw new Error("invalid currentIndex, must be between 0 and 8");
  }
  if (currentIndex >= 0 && currentIndex <= 2) return 2;
  else if (currentIndex >= 3 && currentIndex <= 5) return 5;
  else if (currentIndex >= 6 && currentIndex <= 8) return 8;
  else return 2;
};

export const removeArrayDuplicates = (
  array: number[],
  sort = false
): number[] => {
  const noDupe = Array.from(new Set<number>(array));
  return sort ? noDupe.sort() : noDupe;
};

/**
 *  returns the missing numbers from 1 to 9
 * @param array array of number (expected with no duplicates)
 */
export const getMissingNumbers = (array: number[]): number[] => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => array.indexOf(n) === -1);
};

/**
 * returns the index number of the largest number in the array
 * @param numbersArray array containing the numbers
 * @param ignoreIndexList an array of indices used to ignore any value in the numbersArray which index is present in ignoreIndexList
 */
export const getArrayMinNumberIndex = (
  array: number[][],
  ignoreIndexList: number[]
): number => {
  const allowed = array.map((n, i) => {
    const arrayToNumber = parseInt(n.join(""), 10);
    return ignoreIndexList.indexOf(i) === -1 ? arrayToNumber : 99999999;
  });
  const minNumber = Math.min(...allowed);
  return allowed.indexOf(minNumber);
};

/**
 * checks if the number exists within the array of numbers
 * @param number
 * @param array
 */
const inArray = (number: number, array: number[]): boolean => {
  return array.indexOf(number) !== -1;
};

/**
 * Remove the target number n from within the array items. Mainly used to remove the a number from the possibilities
 *
 * Note when a numberToRemove is removed from the target number, it's sorted from smaller to larger
 * @param possibilities the array of numbers to process
 * @param numberToRemove the number that should be removed from each item of the array
 * @param ignoreIndices an array that holds the possibilities indices that should not be processed
 * @returns a new array with the omission of the provided number from each item
 * @example array = [15,12,35] & n = 1 returns [5,2,35]
 */
export const removeNumberOccurrence = (
  possibilities: number[][],
  numberToRemove: number,
  ignoreIndices: number[]
): number[][] => {
  const newArray = possibilities.map((n, i) => {
    // if the index of the possibility is present in the ignoreIndices
    // return it without any processing
    if (inArray(i, ignoreIndices)) return [];
    // get the index of the number to remove
    const numberIndex = n.indexOf(numberToRemove);
    // if the number does no contain the numberToRemove, return it as is
    if (numberIndex === -1) return n;
    // else remove number from the array
    n.splice(numberIndex, 1);
    // if the number isNaN, give back a number that will never be considered as the smallest
    //
    return n;
  });
  return newArray;
};

/**
 * Generates a number from the **targetNumber** that does not occur in the remaining possibilities
 * @param targetNumber the number to extract the valid number from
 * @param possibilities the possibilities to check against
 * @param ignoreIndexList an ignore list to ignore possibilities which index is present inside this array
 * @returns a number which does not occurs in the possibilities array, return 0 if no number meet the requirements
 * @example targetNumber 28 - possibilities = [269, 237, 215] returns 8 (as 8 is not present in any of the possibilities)
 */
export const generateSafeNumberFromPossibilities = (
  targetNumber: string,
  possibilities: number[]
): number => {
  const initialNumber = targetNumber[randomNumber(0, targetNumber.length - 1)];

  let validNumber = parseInt(initialNumber, 10);

  const targetNumberSplit = targetNumber.split("");
  for (let i = 0; i < targetNumberSplit.length; i++) {
    const n = targetNumberSplit[i];

    const valid = !possibilities.every((e) => {
      // return e.toString().indexOf(n) === -1;
      return e.toString().includes(n);
    });
    if (valid) {
      validNumber = parseInt(n, 10);
      break;
    }
  }
  // console.log("resulting in => ", validNumber);
  return validNumber;
};

export const convertObjectKeysToNumbers = (keys: string[]): number[] => {
  return keys.map((n) => parseInt(n));
};

export const doesGridContainZero = (
  grid: number[][]
): { row: number; col: number } | null => {
  for (let row = 0; row < grid.length; row++) {
    const rowContent = grid[row];

    const zero = rowContent.indexOf(0);
    if (zero !== -1) return { row, col: zero };
  }
  return null;
};

/**
 * Counts the number n occurrence in all the possibilities, excluding any possibility index found in the
 * ignoreListIndices array
 * @param n the number to count
 * @param possibilities the possibilities
 * @param ignoreListIndices the list of possibilities indexes to ignore
 * @returns the count of the number in all the non-ignored possibilities
 */
const countNumberInPossibilities = (
  n: number,
  possibilities: number[][],
  ignoreListIndices: number[]
) => {
  let occurrence = 0;
  possibilities.forEach((possibility, i) => {
    // only process this possibility if it is not in the ignoreListIndices
    if (ignoreListIndices.indexOf(i) === -1) {
      // count how many times the number occurs in it
      if (possibility.indexOf(n) > -1) {
        occurrence++;
      }
    }
  });
  return occurrence;
};

/**
 * returns the number which count is the smallest.
 * @param o the object containing the numbers as keys and their count as value.
 * @returns the number which count is the smallest.
 * @example {"3": 5, "7": 1, "9": 0} returns 9 ("as 9 has the smallest count").
 */
const getSmallestNumberFromObject = (o: { [key: string]: number }): number => {
  const smallestCount = Math.min(...Object.values(o));
  const smallestNumberCount = Object.entries(o).find(
    (e) => e[1] === smallestCount
  );
  if (smallestNumberCount) {
    return parseInt(smallestNumberCount[0], 10);
  }
  return 0;
};

/**
 * Checks whether the possibilities which index is not within the ignoreIndices array are equal
 *
 * This function assumes that the numbers within each possibility are sorted from small to large
 * @param possibilities the possibilities array
 * @param ignoreIndices the possibilities indices to ignore
 * @returns
 */
const possibilitiesContainSameNumbers = (
  possibilities: number[][],
  ignoreIndices: number[]
): boolean => {
  const filteredPossibilities = possibilities.filter(
    (_, i) => ignoreIndices.indexOf(i) === -1
  );
  // if any number is different than the first one, exit the function
  const checkAgainst = filteredPossibilities[0];
  return filteredPossibilities.every(
    (n) => n.toString() === checkAgainst.toString()
  );
};
/**
 * Returns the number that occurs the least in the possibilities array
 * @param cellPossibilities the numbers that each number within is checked for its least count
 * @param rowPossibilities the possibilities list
 * @param ignoreIndices the index of the possibilities to be ignored by the function
 * @returns the number within the **numbers** param which count occurs the least in the possibilities
 */
export const getLeastOccurredNumberCount = (
  cellPossibilities: number[],
  rowPossibilities: number[][],
  ignoreIndices: number[]
): number => {
  if (cellPossibilities.length === 1) {
    return cellPossibilities[0];
  } else {
    const counter: { [key: string]: number } = {};
    const number = cellPossibilities;
    // if the possibilities contain the same number, return a random number among the numbers contained in the cellPossibilities param
    if (possibilitiesContainSameNumbers(rowPossibilities, ignoreIndices)) {
      return cellPossibilities[randomNumber(0, number.length - 1)];
    } else {
      for (let i = 0; i < cellPossibilities.length; i++) {
        const numberSegment = cellPossibilities[i];
        const numCount = countNumberInPossibilities(
          cellPossibilities[i],
          rowPossibilities,
          ignoreIndices
        );
        counter[numberSegment] = numCount;
      }
      const smallest = getSmallestNumberFromObject(counter);
      return smallest;
    }
  }
};

/**
 * checks if the 2d array contains any empty array in it
 * @param array 2d array of numbers
 * @returns
 */
export const hasEmptyArray = (array: number[][]) => {
  return array.some((a) => a.length === 0);
};

/**
 * Picks one of the numbers of n randomly
 * @param n the number to pick from
 * @returns a random number that is part of n
 */
export const pickFromNumber = (n: number[]): number => {
  if (n.length === 1) return n[0];

  return n[randomNumber(0, n.length - 1)];
};

/**
 * Clones a 2d array
 * @param array the array to clone
 * @returns a new copy of the provided 2d array
 */
export const cloneArray = (array: number[][]): number[][] => {
  return array.map((a) => a.slice());
};
