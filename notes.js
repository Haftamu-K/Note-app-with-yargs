const fs = require('fs');
const chalk = require('chalk');

const getNotes =  () => {
    return "Your note ...";
}

const addNote = (title, body) => {
    //add the data to the json file.
    const notes = loadNotes();

    //Avoiding duplicat note.
    //array search function for exixtance of an element find  is better than filter in execution time saving
    //find searches for the first element that makes the function return true.
    const duplicateNote = notes.find((note) => note.title === title);

    if(!duplicateNote)
    {
        notes.push({
            title,
            body
        });
        saveNotes(notes);
        console.log(chalk.bold.green.inverse('Successfully added note ...'));
    }
    else {
        console.log(chalk.bold.red.inverse('Sorry... Duplicate title name, try again.'));
    }
    

    //Avoiding duplicat note. Another way. By iterating through the array
    // for(let i =0; i < notes.length; i++) // for(let note in notes)
    // {
    //     if(notes[i].title === title)
    //     {
    //         isDuplicate = true;
    //         break;
    //     }
    // }

    // if(!isDuplicate)
    // {
    //     notes.push({
    //         title,
    //         body
    //     });
    //     fs.writeFileSync('notes.json', JSON.stringify(notes));
    // }
    // else {
    //     console.log(chalk.bold.red.inverse('Sorry... Duplicate title name, try again.'));
    // }
    
    
}

const removeNote = (title) => {
    //get data from the file in json form.
    const notes = loadNotes();
    // find / keep the notes which have not the same title
    const notesToKeep = notes.filter((note) => note.title !== title);

    if(notes.length === notesToKeep.length)
    {
        console.log(chalk.red.bold.inverse("Note not found!!!!!"));
    }
    else {
        //save the notes now
        saveNotes(notesToKeep);
        console.log(chalk.green.bold.inverse('Note Removed .. '));
    }

}

//listing all the notes..
const listNote = () => {
    const allNotes = loadNotes();

    console.log(chalk.bold.blue.inverse('Your notes'))
    allNotes.forEach((note) => console.log(chalk.bold.green('\t=> ') + note.title));
}

//Read a Note.
const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);

    if(note){
        console.log(chalk.bold.blue.inverse(note.title))
        console.log(" =>" + note.body);
    }
    else
        console.log(chalk.bold.red.inverse("Note not Found!!!!"));
}

// Save notes to the files
const saveNotes = (notes)=> {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}
// Returns the Json data from the file
const loadNotes = () => {
    try {
        const buffData = fs.readFileSync('notes.json');
        const dataJSON = buffData.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
       return []; 
    }
}

module.exports = {
    addNote,
    removeNote,
    listNote,
    readNote,
}
