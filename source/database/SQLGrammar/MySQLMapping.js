import { MySQLGrammar } from "./MySQLGrammar.js";

const MySQLMapping = {
  select: MySQLGrammar.buildSelect,
  orderBy: MySQLGrammar.buildGroupBy,
  groupBy: MySQLGrammar.buildGroupBy,
};

export { MySQLMapping };
