/**
 * /lib/title.js
 *
 * @description: title file holds functionality to render figlet titles
 *
 */

// dependencies
const figlet = require('figlet');
const chalk = require('chalk');

// modules
const appTitle = { hex: '#E47474', text: 'Employee\nTracker' };
const depTitle = { hex: '#74E4DF', text: 'Department' };
const roleTitle = { hex: '#DD74E4', text: 'Role' };
const employeeTitle = { hex: '#E4BF74', text: 'Employees' };

const launchTitle = (hex, text) => {
  console.log(
    chalk.hex(hex).bgHex('#000')(
      figlet.textSync(text, {
        font: 'rounded',
        horizontalLayout: 'full',
        verticalLayout: 'full',
        width: 100,
      })
    )
  );
  console.log('\n');
};

module.exports = {
  appTitle: appTitle,
  depTitle: depTitle,
  roleTitle: roleTitle,
  employeeTitle: employeeTitle,
  launchTitle: launchTitle,
};
