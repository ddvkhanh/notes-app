const notes = require('./notes.js')
const chalk = require('chalk')
const yargs = require('yargs')

//Customize yargs version
yargs.version('1.1.0')

//add, remove, read, list

//Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note', //describe what the command does
    builder: {
        title: {
            //customize how that option works
            describe: 'Note title',
            demandOption: true, //optional, if you demand option
            type: 'string' //setting default value type
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    }, //an object to defy all options we want the command to support
    handler(argv) {
        //handler: set up with a function value, executed with the specified command 
        notes.addNote(argv.title, argv.body)
    }
})

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: { //object
        title: { //object value
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
})

//Create read command
yargs.command({
    command: 'read',
    describe: 'Read the note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

//Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler() {
        notes.listNotes();
    }
})

yargs.parse()
