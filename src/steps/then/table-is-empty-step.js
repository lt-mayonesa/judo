const {selectFrom} = require('../../engine/operations');
const assert = require('../../runtime/assertion');

/**
 * Validate the table has no records at all (is empty)
 *
 * @param {string} table :: the table to select from
 * @returns {Promise<boolean>}
 */
module.exports = function tableIsEmptyStep(table) {
    return selectFrom(table)
        .then(result => assert([], result));
};
