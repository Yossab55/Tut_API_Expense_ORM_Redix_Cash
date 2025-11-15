import util from "util";

function env(field) {
  return process.env[field] || null;
}

export { env };

function makeItPromisify(fn) {
  return util.promisify(fn);
}

export { makeItPromisify };

function getCurrentDate() {
  /**
   * because JS date format defers from MySQL date format
   * so I'm modifying it to fit the validation
   */
  const date = new Date(Date.now());

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${
    date.toTimeString().split(" ")[0]
  }`;
}

export { getCurrentDate };

function getDateInMySQLStanders(dateString) {
  /**
   * because JS date format defers from MySQL date format
   * so I'm modifying it to fit the validation
   */
  if (!dateString) return undefined;
  const date = new Date(dateString);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${
    date.toTimeString().split(" ")[0]
  }`;
}

export { getDateInMySQLStanders };

function stringBinarySearch(list, item) {
  if (list.length == 0) return undefined;
  if (list.length == 1) {
    const { user_email } = list[0];
    if (user_email == item) return item;
    return undefined;
  }
  const middleIndex = parseInt(list.length / 2);
  const { user_email } = list[middleIndex];
  /**
   * 0 => equals => found item
   * -1 => middle Item is before item => go right
   * 1 => item is before middle item => go left
   */
  const test = user_email.localeCompare(item);
  if (test == 0) return item;
  if (test == -1) {
    list = list.slice(middleIndex);
    return stringBinarySearch(list, item);
  }
  if (test == 1) {
    list = list.slice(0, middleIndex);
    return stringBinarySearch(list, item);
  }
  return undefined;
}
export { stringBinarySearch };

function fieldsToCheckUndefined(fieldsToChick) {
  const fields = [];
  Object.keys(fieldsToChick).forEach((field) => {
    if (fieldsToChick[field]) fields.push(field);
  });
  return fields;
}
export { fieldsToCheckUndefined };
