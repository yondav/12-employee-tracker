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

const init = () => {
  // prompts.optionsQuery(`SELECT name FROM department`);
  inquirer.prompt(prompts.enter).then((res) => {
    res.continue === true
      ? inquirer.prompt(prompts.menuPrompt).then((res) => {
          switch (res.menu) {
            case 'view':
              prompts.viewTable(init);
              break;
            case 'add':
              prompts.add(init);
              break;
            case 'edit':
              prompts.edit(init);
              break;
            case 'remove':
              prompts.remove(init);
              break;
          }
        })
      : process.exit(0);
  });
};

console.clear();
prompts.welcomePrompt();
init();
