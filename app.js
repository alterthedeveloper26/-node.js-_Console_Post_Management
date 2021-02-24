// const fs = require('fs');

const validator = require("validator");
const notem = require("./note.js");
const chalk = require("chalk");
const yargs = require("yargs");

//Custome yargs
yargs.version("1.1.0");

//argument vector
//array contain all arguement provided

//Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    //   console.log(chalk.green.inverse("Title: ", argv.title));
    //   console.log(chalk.green.inverse("Body: ", argv.body));
    notem.addNote(argv.title, argv.body);
  },
});

//Create remove command
yargs.command({
  command: "remove",
  describe: "remove a note",
  handler: function (argv) {
    notem.delNote(argv.title);
  },
});

//Get post
yargs.command({
  command: "get",
  describe: "Function to get notes",
  handler: (argv) => {
    console.log(chalk.yellow(JSON.stringify(notem.getNote(argv.title))));
  },
});

//Parse run => can do
yargs.parse();
