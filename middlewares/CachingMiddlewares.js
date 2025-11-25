import { Redis } from "../source/cache/Redis.js";
import { GOOD_RESPONSE } from "../utils/constants/ResponseCode.js";

const setName = "expensesIds";
const TTL = 10 * 60; //10 minutes in seconds

async function getDataFromCache(request, response, next) {
  // there is still a lot to do
  const ids = await Redis.sMembers(setName);
  console.log(ids);
  if (ids.length == 0) return next();

  const result = [];
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const key = `expense:${id}`;
    const data = await Redis.hGetAll(key);
    result.push(data);
  }

  response.status(GOOD_RESPONSE).send({ data: result });
}

async function saveDataInCache(expenses) {
  console.log("We are now on save Data in cache");
  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];
    const {
      expense_id,
      expense_category,
      expense_date,
      expense_amount,
      user_id,
    } = expense;

    const key = `expense:${expense_id}`;
    const value = {
      expense_category,
      expense_date: expense_date.toISOString(),
      expense_amount,
      user_id,
    };

    await Redis.hSet(key, value);
    await Redis.expire(key, TTL);
    await Redis.sAdd(setName, String(expense_id));
    console.log("value: ", value);
  }
  await Redis.expire(setName, TTL);
}

export { getDataFromCache, saveDataInCache };
