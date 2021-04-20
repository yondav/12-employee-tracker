/**
 * /db/table_funcs/edit.js
 *
 * @description: all functionality for editing db here
 *
 */

// dependencies
const chalk = require('chalk');

// modules
const connection = require('../connection');

// for all edit queries. passed 5 arguments.
const edit = (table, setProp, setVal, whereProp, whereVal) => {
  let query = `UPDATE ${table}
  SET ${setProp} = ?
  WHERE ${whereProp} = ?`;

  connection.query(query, [setVal, whereVal], (err, res) => {
    err
      ? console.log(
          chalk.hex('#E47474').bgHex('#000000')("Uh-Oh...Something's not right. Try again!"),
          err
        )
      : console.log(
          chalk.hex('#85E474').bgHex('#000000')(
            `Success! ${setProp} has been changed to ${setVal} at ${whereVal} in the ${table} table!`
          )
        );
  });
};

module.exports.edit = edit;
