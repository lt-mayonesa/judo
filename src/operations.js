const {sql, connect} = require('./pool');
const insertInto = require('./sql/insert');
const selectFrom = require('./sql/select');
const truncateTable = require('./sql/truncate');

/**
 * @typedef {Object} SqlInput
 * @property {string} type
 * @property {string} value
 */

/**
 * Run a INSERT INTO to table
 *
 * @param {string} table
 * @param {Array<Object<string, *>>} data
 * @returns {Promise<void>}
 */
const insert = async (table, data) => {
    return query(insertInto(table, data));
};

/**
 * Execute a SQL Stored Procedure
 *
 * @param {string} sp a valid stored procedure
 * @param {Object<string, SqlInput>} [args]
 * @returns {Promise<void>}
 */
const exec = async (sp, args) => {
    const pool = await connect;
    const req = pool.request();
    if (args) {
        for (let arg in args) {
            if (args.hasOwnProperty(arg))
                req.input(arg, sql[args[arg].type], args[arg].value);
        }
    }
    return req.execute(sp);
};
/**
 * Run a SELECT against a table
 *
 * @param {string} table
 * @param {Array<string>} [fields]
 * @returns {Promise<void>}
 */
const select = async (table, fields) => {
    return query(selectFrom(table, fields));
};

/**
 * Truncate a table
 *
 * @param {string} table
 * @returns {Promise<Request|Promise>}
 */
const truncate = async (table) => {
    return query(truncateTable(table));
};

/**
 * Run a custom SQL QUERY
 *
 * @param query
 * @returns {Promise<*>}
 */
const query = async (query) => {
    const pool = await connect;
    return pool.request().query(query);
};

module.exports = {
    insert,
    exec,
    select,
    truncate,
    query
};