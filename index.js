#!/usr/bin/env node
/**
 * A shebang line is used to specify the
 * absolute path to the interpreter that
 * will run the below code. The shebang
 * line used here is for Linux or UNIX type
 * systems but node requires it for Windows
 * and macOS too, for proper installation
 * and execution of the script.
 */

/**
 * compos-cli
 * CLI for react-native components
 *
 * @author Ashraf Hamdoun <ashraf-hamdoun.000webhostapp.com>
 */

// esm is to handle the args
require = require('esm')(module /*, options */);

const root = require('./utils');
root(process.argv);
