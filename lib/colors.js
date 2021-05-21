/**
 * /lib/colors.js
 *
 * @description: shortcut for chalk colors
 *
 */

const chalk = require('chalk');

const colors = {
  yellow: '#E4D874',
  brightYellow: '#E4BF74',
  pink: '#DDB9E4',
  brightPink: '#E4749D',
  blue: '#74A9E4',
  brightBlue: '#74E4DF',
  red: '#E47474',
  green: '#9be88e',
};

const { yellow, brightYellow, pink, brightPink, blue, brightBlue, red, green } = colors;

const chalkColor = (color, text) => {
  return chalk.hex(color).bgHex('#000000')(text);
};

module.exports = { yellow, brightYellow, pink, brightPink, blue, brightBlue, red, green, chalkColor };
