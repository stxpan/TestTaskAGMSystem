/**
 * Remove undefined fields from an object
 */
export const removeUndefined = <T extends Record<string, any>>(object: T): T => {
  let newObj: Record<string, any> = {};

  Object.keys(object).forEach((key) => {
    if (object[key] === Object(object[key])) newObj[key] = removeUndefined(object[key]);
    else if (object[key] !== undefined) newObj[key] = object[key];
  });

  return newObj as T;
};
