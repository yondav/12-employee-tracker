/**
 * /lib/title.js
 *
 * @description: title file holds functionality to render figlet titles
 *
 */

// // dependencies
const chalk = require('chalk');
const inquirer = require('inquirer');

// modules
// const connection = require('../db/connection');
const { yellow, brightYellow, brightPink, blue, green, chalkColor } = require('./colors');
const { roleOptions, manOptions, empOptions, depOptions } = require('./options');
const { launchTitle, appTitle } = require('./title');

// welcome message
const welcomePrompt = () => {
  launchTitle(appTitle.hex, appTitle.text);
  console.log(
    chalkColor(yellow, '\n |  Welcome to Employee Tracker an easy to use cms for keeping track of your team!  | \n')
  );
};

const prompts = {
  next: {
    name: 'next',
    type: 'confirm',
    message: chalkColor(green, '\n | Enter To Continue To Main Menu | \n'),
  },
  main_menu: {
    name: 'main_menu',
    type: 'list',
    message: chalkColor(brightPink, '\n | MAIN MENU | \n'),
    choices: ['view', 'add', 'edit', 'remove'],
  },
  select_view: {
    name: 'select_view',
    type: 'list',
    message: chalkColor(brightYellow, '\n | VIEW BY... | \n'),
    choices: ['employee', 'department', 'role', 'manager'],
  },
  select_dep: {
    name: 'select_dep',
    type: 'list',
    message: chalkColor(brightYellow, '\n | Department | \n'),
    choices: depOptions,
  },
  select_role: {
    name: 'select_role',
    type: 'list',
    message: chalkColor(brightYellow, '\n | Role | \n'),
    choices: roleOptions,
  },
  select_emp: {
    name: 'select_emp',
    type: 'list',
    message: chalkColor(brightYellow, '\n | Select An Employee | \n'),
    choices: empOptions,
  },
  select_mgmt: {
    name: 'select_mgmt',
    type: 'list',
    message: chalkColor(brightYellow, '\n | Manager | \n'),
    choices: manOptions,
  },
  select_table: {
    name: 'select_table',
    type: 'list',
    message: chalkColor(brightYellow, '\n | Select | \n'),
    choices: ['employee', 'department', 'role'],
  },
  first_name: {
    name: 'first_name',
    type: 'input',
    message: chalkColor(blue, '\n | First Name | \n'),
  },
  last_name: {
    name: 'last_name',
    type: 'input',
    message: chalkColor(blue, '\n | Last Name | \n'),
  },
  dep_name: {
    name: 'dep_name',
    type: 'input',
    message: chalkColor(blue, '\n | Department Name | \n'),
  },
  title: {
    name: 'title',
    type: 'input',
    message: chalkColor(blue, '\n | Title | \n'),
  },
  salary: {
    name: 'salary',
    type: 'input',
    message: chalkColor(blue, '\n | Starting Salary | \n __ DECIMAL FORMAT __ \n __ DO NOT INCLUD $ __'),
  },
  emp_params: {
    name: 'emp_params',
    type: 'list',
    message: chalkColor(brightYellow, '\n | What Would You Like To Update? | \n'),
    choices: ['first name', 'last name', 'role', 'manager'],
  },
  dep_input: {
    name: 'dep_input',
    type: 'input',
    message: chalkColor(blue, '\n | Department Name | \n'),
  },
  role_input: {
    name: 'role_input',
    type: 'list',
    message: chalkColor(brightYellow, '\n | What Would You Like To Update? | \n'),
    choices: ['title', 'salary', 'department'],
  },
};

const {
  next,
  main_menu,
  select_view,
  select_dep,
  select_role,
  select_emp,
  select_mgmt,
  first_name,
  last_name,
  select_table,
  dep_name,
  title,
  salary,
  emp_params,
  dep_input,
  role_input,
} = prompts;

module.exports = {
  welcomePrompt,
  next,
  main_menu,
  select_view,
  select_dep,
  select_role,
  select_emp,
  select_mgmt,
  first_name,
  last_name,
  select_table,
  dep_name,
  title,
  salary,
  emp_params,
  dep_input,
  role_input,
};
