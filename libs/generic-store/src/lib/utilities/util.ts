import * as _ from 'lodash';

/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 *
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels
 * are unique.
 */

let typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unqiue"`);
  }
  typeCache[<string>label] = true;
  return <T>label;
}

export function updateObject(oldObject, newValues) {
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  return Object.assign({}, oldObject, newValues);
}

export interface StoreStatus {
  loading: boolean;
  loaded: boolean;
  saving: boolean;
  saved: boolean;
  loadingError: boolean;
  savingError: boolean;
  message: string;
  deleting: boolean;
  deleted: boolean;
  unauthorised: boolean;
  loadingCount: number;
  actions: string[];
  loadingActions: string[];
  info: string;
}

export const initStoreStatus: StoreStatus = {
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  loadingError: false,
  savingError: false,
  message: '',
  deleted: false,
  deleting: false,
  unauthorised: false,
  loadingCount: 0,
  actions: [],
  loadingActions: [],
  info: '',
};

/*
 * Compare two objects by reducing an array of keys in obj1, having the
 * keys in obj2 as the intial value of the result. Key points:
 *
 * - All keys of obj2 are initially in the result.
 *
 * - If the loop finds a key (from obj1, remember) not in obj2, it adds
 *   it to the result.
 *
 * - If the loop finds a key that are both in obj1 and obj2, it compares
 *   the value. If it's the same value, the key is removed from the result.
 */
export function getObjectDiff(obj1, obj2) {
  const diff = Object.keys(obj1).reduce((result, key) => {
    if (!obj2.hasOwnProperty(key)) {
      result.push(key);
    } else if (_.isEqual(obj1[key], obj2[key])) {
      const resultKeyIndex = result.indexOf(key);
      result.splice(resultKeyIndex, 1);
    }
    return result;
  }, Object.keys(obj2));

  return diff;
}
