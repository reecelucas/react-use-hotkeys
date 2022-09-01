/**
 * Check if two arrays contain the same items.
 * Items do *not* need to be in the same order.
 *
 *   isSameSet([1, 2, 3], [3, 2, 1]) // true
 */
export default (arr1: string[], arr2: string[]) =>
  arr1.length === arr2.length && arr1.every(item => arr2.includes(item));
