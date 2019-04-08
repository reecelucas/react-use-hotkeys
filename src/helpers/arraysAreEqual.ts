/**
 * Check if two arrays contain the same items.
 * Items *must* be in the same order.
 *
 *   arraysEqual([1, 2, 3], [3, 2, 1]) // false
 *   arraysEqual([1, 2, 3], [1, 2, 3]) // true
 */
export default (arr1: any[], arr2: any[]) =>
  arr1.length === arr2.length && arr1.every((item, i) => item === arr2[i]);
