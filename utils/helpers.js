import util from "util";

function env(field) {
  return process.env[field] || null;
}

export { env };

function makeItPromisify(fn) {
  return util.promisify(fn);
}

export { makeItPromisify };

function getDayLongPeriod() {
  const now = new Date();
  const start = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      0,
      0,
      0,
      0
    )
  ).toISOString();

  const end = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      0,
      0,
      0,
      0
    )
  ).toISOString();
  console.log(start);
  return [start, end];
}

export { getDayLongPeriod };

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

//deprecated
// function stringBinarySearch(list, item) {
//   if (list.length == 0) return undefined;
//   if (list.length == 1) {
//     const { user_email } = list[0];
//     if (user_email == item) return item;
//     return undefined;
//   }
//   const middleIndex = parseInt(list.length / 2);
//   const { user_email } = list[middleIndex];
//   /**
//    * 0 => equals => found item
//    * -1 => middle Item is before item => go right
//    * 1 => item is before middle item => go left
//    */
//   const test = user_email.localeCompare(item);
//   if (test == 0) return item;
//   if (test == -1) {
//     list = list.slice(middleIndex);
//     return stringBinarySearch(list, item);
//   }
//   if (test == 1) {
//     list = list.slice(0, middleIndex);
//     return stringBinarySearch(list, item);
//   }
//   return undefined;
// }
// export { stringBinarySearch };

function fieldsToCheckUndefined(fieldsToChick) {
  const result = {};
  Object.keys(fieldsToChick).forEach((field) => {
    const value = fieldsToChick[field];
    if (value) result[field] = value;
  });
  return result;
}
export { fieldsToCheckUndefined };
