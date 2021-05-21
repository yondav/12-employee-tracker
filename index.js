const inquirer = require('inquirer');
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
} = require('./lib/prompts');

const test = async () => {
  await inquirer.prompt(next);
  await inquirer.prompt(main_menu);
  await inquirer.prompt(select_view);
  await inquirer.prompt(first_name);
  await inquirer.prompt(last_name);
  await inquirer.prompt(select_table);
  // await inquirer.prompt(dep_name);
  // await inquirer.prompt(title);
  // await inquirer.prompt(salary);
  // await inquirer.prompt(emp_params);
  // await inquirer.prompt(dep_input);
  // await inquirer.prompt(role_input);
};

test();
