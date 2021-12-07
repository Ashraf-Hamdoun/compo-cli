const init = require("../utils/init");
const cli = require("../utils/cli");
const log = require("../utils/log");
const handleFlags = require("../utils/handleFlags");
const createMaterial = require("../utils/createMaterial");

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

// The main root function of the cli
async function root() {
  init({ clear });
  input.includes(`help`) && cli.showHelp(0);

  // handle missing falgs
  let allFlags = await handleFlags(input, flags);

  debug && log(allFlags);

  createMaterial(allFlags);
  //   console.log(cli);
}

module.exports = root;
