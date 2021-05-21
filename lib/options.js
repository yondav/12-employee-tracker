/**
 * /lib/options.js
 *
 * @description: options.js holds functionality to render options for multiple choice prompts and removing items when deleted
 *
 */

// empty array to push departments, roles, or employees to for multiple choice
let roleOptions = [];
let manOptions = [];
let empOptions = [];
let depOptions = [];

// query to push options to options array
const optionsQuery = (x, y, z) => {
  let query = x;
  let param = y;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, res) => {
      if (err) throw err;
      res.forEach((obj) => {
        z.push(obj[param]);
      });
      resolve(z);
    });
  });
};

// algo to remove deleted item from multiple choice listes
const removeOpt = (arr, selection) => {
  for (i = 0; i < arr.length; i++) {
    if (arr[i] === selection) {
      arr.splice(i, 1);
      i--;
    }
  }
};

module.exports = { roleOptions, manOptions, empOptions, depOptions, optionsQuery, removeOpt };
