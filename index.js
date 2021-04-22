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
  prompts.welcomePrompt();
  inquirer.prompt(prompts.enter).then((res) => {
    res.continue === true
      ? inquirer.prompt(prompts.menuPrompt).then((res) => {
          switch (res.menu) {
            case 'view':
              prompts.viewTable().then(() => {
                inquirer.prompt(prompts.enter).then((res) => (res.continue === true ? init() : process.exit(0)));
              });
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
        })
      : init();
  });
};

init();
