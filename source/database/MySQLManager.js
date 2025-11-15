import { execute } from "./DBConnection.js";
import { MySQLGrammar } from "./SQLGrammar/MySQLGrammar.js";
import { MySQLMapping } from "./SQLGrammar/MySQLMapping.js";
import { AppError } from "../error/AppError.js";

const MySQLManager = Object.create(MySQLGrammar);

MySQLManager.insert = async function insert(values) {
  const query = this.buildInsert();
  const [results] = await execute(query, values);
  return results.insertId;
};

MySQLManager.getOneUser = async function getOneUser(id, values) {
  const query = this.buildGetUserProcedure(id);
  console.log(query);
  const results = await execute(query, values);
  return results[0][0][0];
};
MySQLManager.todayExpenses = async function todayExpenses(id, values) {
  const query = this.buildGetTodayExpensesProcedure(id);
  const [results] = await execute(query, values);
  return results;
};
MySQLManager.select = async function selectStatement() {
  const query = this.buildSelect();
  const [results] = await execute(query);
  return results;
};

MySQLManager.selectWithOrderBy = async function selectWithOrderBy() {
  const query = this.addMultiplyQueriesTogether(
    this.buildSelect(),
    this.buildOrderBy()
  );
  const [results] = await execute(query);
  return results;
};

MySQLManager.deleteOne = async function deleteOne(values) {
  const query = this.buildDeleteCondition();
  const [results] = await execute(query, values);
  return results;
};

MySQLManager.deleteAll = async function deleteAll() {
  const query = this.buildDeleteAll();
  const [results] = await execute(query);
  return results;
};

MySQLManager.update = async function update(values) {
  const query = this.buildUpdate();
  const [results] = await execute(query, values);
  return results;
};
MySQLGrammar.customQuery = async function customQuery(values, ...partsToBuild) {
  const queries = partsToBuild.map((query) => {
    // console.log(this);
    if (!MySQLMapping[query]) {
      throw AppError("there is no such query like that in MySQL");
    }
    return MySQLMapping[query].call(this, values);
  });
  const query = this.addMultiplyQueriesTogether(...queries);
  console.log(query);
  const [results] = await execute(query, values);
  return results;
};
export { MySQLManager };
