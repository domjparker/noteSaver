// so we can promisify or use async await
const util = require("util")
// so we can read files
const fs = require("fs")
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
// give us a variable shortcut to the attached json file.
const notesData = "db.json";

class DB{
    async readNotes(){
        try {
            const notesDataRaw = await readFileAsync(notesData,"utf8")
        return notesDataRaw ? JSON.parse(notesDataRaw) : []
    } catch (e) {
        console.log("error reading note in db.json")
    }
}

module.exports = new DB();