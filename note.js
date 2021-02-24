const chalk = require("chalk");
const fs = require("fs");

const getNote = (title) => {
  const notes = loadNotes();
  if (title !== undefined) {
    return notes.filter((note) => note.title === title);
  } else {
    return notes;
  }
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const dups = notes.filter((note) => note.title === title);

  if (dups.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(
      chalk.yellow.inverse("succesfully added: ", JSON.stringify(notes))
    );
  } else {
    console.log(chalk.red.inverse("duplicate title!!!"));
  }
};

//Question mark!!!!!!!!!!
const delNote = (title) => {
  //   console.log(chalk.bgMagenta("title: ", title));
  if (title == undefined) {
    saveNotes([]);
    console.log(chalk.red.inverse("Everything has been del!!!"));
    return;
  }

  const notes = loadNotes();
  //   let count = 0;
  //   notes.forEach((element) => {
  //     if (element.title === title) {
  //       const index = notes.indexOf(element);
  //       notes.splice(index, 1);
  //       count++;
  //     }
  //   });
  const del = notes.filter((post) => post.title !== title);

  const count = notes.length - del.length;
  saveNotes(del);
  console.log(chalk.red.inverse("Deleting... ", count));
};

const saveNotes = (notes) => {
  const strfNotes = JSON.stringify(notes);
  fs.writeFileSync("data.json", strfNotes);
};

const loadNotes = () => {
  let dataBuffer = null;
  let noteJSON = null;
  try {
    dataBuffer = fs.readFileSync("data.json");
    noteJSON = dataBuffer.toString();
    return JSON.parse(noteJSON);
  } catch (e) {
    console.log(chalk.red.inverse(e.message));
    return [];
  }
};

module.exports = {
  getNote: getNote,
  addNote: addNote,
  delNote: delNote,
};
