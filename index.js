const pkg = require('./package.json')
const yargs = require('yargs/yargs')
const {hideBin} = require("yargs/helpers");
const {printNotes, addNote, removeNotes} = require('./notes.controller')

yargs(hideBin(process.argv))
    .version(pkg.version)
    .command({
        command: 'add',
        describe: 'Add new note to list',
        builder: {
          title: {
              type: 'string',
              describe: 'Note title',
              demandOption: true
          }
        },
        async handler({title}) {
            await addNote(title)
        }
    })
    .command({
        command: 'list',
        describe: 'Prints all notes',
        async handler() {
            await printNotes()
        }
    })
    .command({
        command: 'remove',
        describe: 'Remove note by ID',
        builder: {
            id: {
                type: 'string',
                describe: 'Note ID',
                demandOption: true
            }
        },
        async handler({id}) {
            await removeNotes(id)
        }
    })
    .parse()