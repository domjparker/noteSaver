// so we can promisify or use async await
const util = require("util")
// so we can read files
const fs = require("fs")
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const notesData = "./db/db.json";

class DB{
    async readNotes(){
        try {
            const notesDataRaw = await readFileAsync(notesData,"utf8");
        return notesDataRaw ? JSON.parse(notesDataRaw) : []
        } catch (err) {
        console.log("error when reading note/s in db.json file ", err)
        }
    }
    async writeNotes(notesArray){
        try {
            await writeFileAsync(notesData,JSON.stringify(notesArray))
        } catch (err) {
            console.log("error when writing new db.json file ", err)
        }
    }
};
module.exports = new DB()