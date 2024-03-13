import * as _ from 'lodash';

export class ObjectHelper {
  public static compareObjects(
    a: Record<string, any>,
    b: Record<string, any>,
  ): Record<string, any> {
    const result: Record<string, any> = {};

    // Get the keys of object a and b
    const aKeys = _.keys(a);
    const bKeys = _.keys(b);

    // Compare the values of each key in object a and b
    for (const key of aKeys) {
      // If the value of the key in both objects is an object, use recursion to compare their values
      if (typeof a[key] === 'object' && typeof b[key] === 'object') {
        const subResult = this.compareObjects(a[key], b[key]);
        if (Object.keys(subResult).length > 0) {
          result[key] = subResult;
        }
      } else if (a[key] !== b[key]) {
        result[key] = { oldValue: a[key], newValue: b[key] };
      }
    }

    // Check for keys in object b that are not in object a
    for (const key of bKeys) {
      if (!aKeys.includes(key)) {
        result[key] = { newValue: b[key] };
      }
    }

    // Check for keys in object a that are not in object b
    for (const key of aKeys) {
      if (!bKeys.includes(key)) {
        result[key] = { oldValue: a[key] };
      }
    }

    return result;
  }
}
