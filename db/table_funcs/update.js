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
const update = (table, setProp, setVal, whereProp, whereVal, cb) => {
  let query = `UPDATE ${table}
  SET ${setProp} = ?
  WHERE ${whereProp} = ?`;

  connection.query(query, [setVal, whereVal], (err, res) => {
    err
      ? console.log(chalk.hex('#E47474').bgHex('#000000')("\n | Uh-Oh...Something's not right. Try again! | \n"))
      : console.log(
          chalk.hex('#85E474').bgHex('#000000')(
            '\n | Success! ' + setProp + ' has been changed to ' + setVal + ' at ' + whereVal + ' in the ' + table + ' table! | \n'
          )
        );
    cb();
  });
};

module.exports.update = update;
