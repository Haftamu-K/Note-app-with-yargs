const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes')

//Modifing app version
yargs.version('1.1.0');

//Handling commands for the note app
//We can do that using the command function of yargs ..

//Creating add command 
yargs.command({
    command: 'add',
    describe: 'Adding a note',
    builder : {
        title : {
            describe : 'Title of a note.',
            demandOption : true,
            type : 'string',
        },
        body : {
            describe : 'The body of a note.',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
});

//Creating remove command
yargs.command({
    command: 'remove',
    describe: 'Removing a note.',
    builder: {
        title : {
            describe: "Title of the note to be removed.",
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
});

//Creating show command
yargs.command({
    command: 'show',
    describe: 'Reading a note',
    builder: {
        title: {
            describe: 'Title of the note.',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    },
});

//Creating list command
yargs.command({
    command: 'list',
    describe: 'Listing all notes',
    handler() {
        notes.listNote();
    },
});

yargs.parse();