const chalk = require('chalk')
const fs = require('fs/promises')
const path = require('path')

const notes_path = path.join(__dirname, 'db.json')

async function addNote(title) {
    const notes = await getNotes()

    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)

    await fs.writeFile(notes_path, JSON.stringify(notes))
    console.log(chalk.greenBright.inverse('Note was added.'))
}

async function getNotes() {
    const notes = await fs.readFile(notes_path, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ?  JSON.parse(notes) : []
}

async function printNotes() {
    const notes = await getNotes()
    console.log(chalk.blueBright.inverse('Notes list:'))
    notes.forEach(note => {
        console.log(chalk.blueBright(note.id, note.title))
    })
}

async function removeNotes(remove_id) {
    const notes = await getNotes()
    const updated_notes = notes.filter(note => note.id !== remove_id)

    if (notes.length !== updated_notes.length) {
        console.log(chalk.blueBright('Note removed'))
    } else {
        console.log(chalk.redBright("This note doesn't exist"))
        return
    }

    await fs.writeFile(notes_path, JSON.stringify(updated_notes))
}

module.exports = {
    addNote, printNotes, removeNotes
}