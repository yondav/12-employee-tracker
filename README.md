# Employee-Tracker/ 12-employee-tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

- [Repo](https://github.com/yondav/12-employee-tracker)

## About / Synopsis

Employee Tracker is an easy to use CMS to keep track of a company's employees, roles and departments. The user has the ability to view employees with the following filters: `all`, `by department`, `by role`, `by manager`. The user also has the ability to add, edit and remove employees, departments and roles.

---

## Table of contents

> - [Title / Repository Name](#title--repository-name)
>   - [About / Synopsis](#about--synopsis)
>   - [Table of contents](#table-of-contents)
>   - [Installation](#installation)
>   - [Usage](#usage)
>     - [Config](#config)
>     - [UI](#ui)
>     - [Start Application](#start-application)
>   - [Test instructions](#test-instructions)
>   - [Author](#author)
>     - [Contact](#contact)
>   - [Contributing / Issues](#contributing--issues)
>     - [Contributing](#contributing)
>     - [Known Issues](#known-issues)
>     - [Reporting Issues](#reporting-issues)
>   - [License](#license)

---

## Installation

- Clone repo
- Open integrated terminal on the root directory
- Install dependencies

```
npm i
```

---

## Usage

> ### File Path
>
> - [db](https://github.com/yondav/12-employee-tracker/tree/main/db)
>   - [table_funcs](https://github.com/yondav/12-employee-tracker/tree/main/db/table_funcs)
>     - [add.js](https://github.com/yondav/12-employee-tracker/blob/main/db/table_funcs/add.js)
>     - [delete.js](https://github.com/yondav/12-employee-tracker/blob/main/db/table_funcs/delete.js)
>     - [edit.js](https://github.com/yondav/12-employee-tracker/blob/main/db/table_funcs/edit.js)
>     - [table_views.js](https://github.com/yondav/12-employee-tracker/blob/main/db/table_funcs/table_views.js)
>   - [config.js](https://github.com/yondav/12-employee-tracker/blob/main/db/config.js)
>   - [connection.js](https://github.com/yondav/12-employee-tracker/blob/main/db/connection.js)
>   - [schema.sql](https://github.com/yondav/12-employee-tracker/blob/main/db/schema.sql)
>   - [seed.sql](https://github.com/yondav/12-employee-tracker/blob/main/db/seed.sql)
> - [lib](https://github.com/yondav/12-employee-tracker/tree/main/lib)
>   - [prompts.js](https://github.com/yondav/12-employee-tracker/blob/main/lib/prompts.js)
>   - [title.js](https://github.com/yondav/12-employee-tracker/blob/main/lib/title.js)
> - [_node_modules_](#installation)
> - [.gitignore](https://github.com/yondav/12-employee-tracker/blob/main/.gitignore)
> - [index.js](https://github.com/yondav/12-employee-tracker/blob/main/index.js)
> - [LICENSE](https://github.com/yondav/12-employee-tracker/blob/main/LICENSE)
> - [package-lock.json](https://github.com/yondav/12-employee-tracker/blob/main/package-lock.json)
> - [package.json](https://github.com/yondav/12-employee-tracker/blob/main/package.json)
> - [README.md](https://github.com/yondav/12-employee-tracker/blob/main/README.md)

---

### Config

Before running the application you will have to add your `mysql` password to `config.js`.

```
/**
 *
 * /db/config.js
 *
 **/

const pass = ''; // insert your mysql password here to configure

module.exports = pass;
```

```
/**
 * /db/connection.js
 *
 * @description: connection file sets the connection to MYSQL db
 *
 */
[]
// mysql password
// change file path to './config' once you've added your mysql password to the config file. See README
const pass = require('./pass');
```

### UI

This is a command line application built using [node](https://nodejs.org/dist/latest-v14.x/docs/api/), [inquirer](https://www.npmjs.com/package/inquirer), [mysql](https://www.npmjs.com/package/mysql) and [chalk](https://www.npmjs.com/package/chalk) for some style.

![view demo](./images/view.gif)

The flow follows a series of prompts based on what the user is trying to do.

---

### Start Application

After cloning the repo, installing dependencies and configuring your mysql password, you can run the app with the following command in the terminal.

```
npm start
```

---

## Author

- <a href="https://yondav.us/">Yoni David</a>
- <a href="https://github.com/yondav">Github</a>

---

### Contact

Send emails to [yoni@yondav.us](mailto:yoni@yondav.us)

## Contributing / Issues

---

### Contributing

- Fork repo
- Make additions and changes on new, personalized branch
- Submit [pull request](https://github.com/yondav/12-employee-tracker/pulls)

---

### Known Issues

Currently no known issues.

---

### Reporting Issues

Report issues by selecting the [issues](https://github.com/yondav/12-employee-tracker/issues) tab and creating a new issue

---

## Licenses

- [MIT](https://github.com/yondav/12-employee-tracker/blob/main/LICENSE)

This README file was built with [README Generator](https://github.com/yondav/README-gen-09)

Copyright &copy; 2021, Yoni David
