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

function fieldsToCheckUndefined(fieldsToChick) {
  const result = {};
  Object.keys(fieldsToChick).forEach((field) => {
    const value = fieldsToChick[field];
    if (value) result[field] = value;
  });
  return result;
}
export { fieldsToCheckUndefined };
