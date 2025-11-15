/**
 * procedures for speed things and better abstraction
 * MySQLGrammar to just build the query separated from the
 * MySQLManager to be better clean code and easy to scale in future
 */
import { AppError } from "../../error/AppError.js";

const procedures = {
  getOneUser: "find_user",
  todayExpenses: "user_today_expenses",
};

const MySQLGrammar = {
  tableName: null,
  fields: null,
  filters: null,
  orderColumns: null,
  groupByColumns: null,
  havingFilters: null,

  initial: function initialParts(
    tableName,
    fields,
    filters,
    orderColumns,
    havingFilters,
    groupByColumns
  ) {
    this.tableName = tableName;
    this.fields = fields;
    this.filters = filters;
    this.orderColumns = orderColumns;
    this.havingFilters = havingFilters;
    this.groupByColumns = groupByColumns;
  },

  buildGetUserProcedure: function buildGetUserProcedure(id) {
    return `CALL ${procedures.getOneUser}(${id});`;
  },

  buildGetTodayExpensesProcedure: function buildGetTodayExpensesProcedure(
    userId
  ) {
    return `CALL ${procedures.todayExpenses}(${userId});`;
  },

  buildSelect: function buildSelect() {
    if (this.fields) {
      if (this.fields[0] == "*") {
        if (this.fields.length != 1) {
          throw AppError("You can't use * and columns together");
        }
      }
    }

    let query = "";
    const columns = `SELECT ${this.fields.join(", ")}`;
    const table = `FROM ${this.tableName}`;
    query = `${columns} ${table}`;
    if (this.filters) {
      const where = ` WHERE ${this.filters.join(" ")}`;
      query += where;
    }
    query += ";";
    return query;
  },

  buildInsert: function buildInsertQuery() {
    const startPart = `INSERT INTO ${this.tableName}`;
    const fieldsToInsert = this.fields.join(", ");
    let valuesHolder = "";
    for (let i = 0; i < this.fields.length; i++) {
      valuesHolder += "?";
      if (this.fields.length - 1 != i) valuesHolder += ", ";
    }
    const query = `${startPart} (${fieldsToInsert}) VALUES (${valuesHolder});`;
    return query;
  },

  buildDeleteCondition: function buildDeleteCondition() {
    if (!this.filters) {
      throw AppError("You need filters to delete row");
    }
    const startPart = `DELETE FROM ${this.tableName}`;
    const wherePart = this.filters.join(" ");
    const query = `${startPart} WHERE ${wherePart};`;
    return query;
  },

  buildDeleteAll: function buildDeleteAll() {
    const startPart = `DELETE FROM ${this.tableName}`;
    const query = `${startPart};`;
    return query;
  },

  buildUpdate: function buildUpdate() {
    if (!this.filters) {
      throw AppError("You need filters to update");
    }
    const startPart = `UPDATE ${this.tableName}`;
    const setPart = this.fields.join(" = ?, ") + " = ?";
    const wherePart = this.filters.join(" ");
    const query = `${startPart} SET ${setPart} WHERE ${wherePart};`;
    console.log(query);
    return query;
  },

  buildOrderBy: function buildOrderBy() {
    const isOrderColumnInFields = this.orderColumns.every((column) =>
      this.fields.includes(column)
    );
    if (!isOrderColumnInFields) {
      throw AppError("You're order column doesn't exists in selected fields");
    }
    const orderPart = `ORDER BY ${this.orderColumns.join(", ")}`;
    let query = `${orderPart}`;
    query += ";";
    return query;
  },

  buildGroupBy: function buildGroupBy() {
    const GroupPart = `GROUP BY ${this.groupByColumns.join(", ")}`;
    let query = GroupPart;
    if (this.havingFilters) {
      const havingPart = ` HAVING ${this.havingFilters.join(" ")}`;
      query += havingPart;
    }
    query += ";";
    return query;
  },

  addMultiplyQueriesTogether: function addMultiplyQueriesTogether(...queries) {
    const length = queries.length;
    for (let i = 0; i < length - 1; i++) {
      queries[i] = queries[i].slice(0, queries[i].length - 1);
    }
    return queries.join(" ");
  },
};

export { MySQLGrammar };
