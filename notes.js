const fs = require('fs')
const chalk = require('chalk')


//Add note
//filter: returns a subset of notes array, 
//no. of duplicates will be number of that subset or less, depending on how many match on our criteria
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) { //duplicateNote===undefined
        notes.push({ //add to the array
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.inverse.green('New note added!'))
    } else {
        console.log(chalk.inverse.red('Note title taken!'))
    }
}

//Remove note
const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if (notesToKeep.length === notes.length) {
        console.log(chalk.inverse.red('No note found!'))
    }
    else {
        console.log(chalk.inverse.green('Note removed!'))
        saveNotes(notesToKeep)
    }
    console.log(notes)
}

//Load note
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

//Save notes
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

//List notes
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse.blue('Your notes: '))
    notes.forEach(note => console.log(note.title))
}

//Read note
const readNote = (title) => {
    const notes = loadNotes()
    const noteToDisplay = notes.find((note) => note.title === title)
    if (noteToDisplay) {
        console.log(chalk.bold.green(noteToDisplay.title))
        console.log(noteToDisplay.body)
    } else {
        console.log(chalk.inverse.red('Note not found!'))
    }
}

module.exports = {
    //order: object we export: value for property
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}