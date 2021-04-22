/**
 * /index.js
 *
 * @description: index file is the main file. All functionality will come through this file.
 *
 */

// dependencies
const inquirer = require('inquirer');
const console_table = require('console.table');

// modules
const prompts = require('./lib/prompts');

const init = async () => {
  // prompts.optionsQuery(`SELECT name FROM department`);
  prompts.welcomePrompt();
  inquirer.prompt(prompts.enter).then((res) => {
    if (res.continue === true) {
      inquirer.prompt(prompts.menuPrompt).then((res) => {
        switch (res.menu) {
          case 'view':
            prompts.viewTable();
            break;
          case 'add':
            prompts.add();
            break;
          case 'edit':
            prompts.edit();
            break;
          case 'remove':
            prompts.remove();
            break;
        }
      });
    } else {
      init();
    }
  });
};

init();

// const editSample = {
//   table: 'department',
//   setProp: 'name',
//   setVal: 'test edit',
//   whereProp: 'name',
//   whereVal: 'Production',
// };
// edit.edit(
//   editSample.table,
//   editSample.setProp,
//   editSample.setVal,
//   editSample.whereProp,
//   editSample.whereVal
// );

// let entourage = new add.Department('Entourage');
// entourage.add();

// let role = new add.Role('Member', 100000.0, 5);
// role.add();

// let dotCom = new add.Employee('Com', 'Dot', 11, 7);
// dotCom.add();
