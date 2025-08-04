const mongoose = require("mongoose")

// Check that user entered password to command line
if (process.argv.length < 3) {
    console.log("Please give password as an argument.")
    process.exit(1)
}

// Connect to Mongo
const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.gisjv.mongodb.net/noteApp?
retryWrites=true&w=majority&appName=Cluster0`
mongoose.set("strictQuery", false)
mongoose.connect(url)

// Define the schema and model for a note
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})

const Note = mongoose.model("Note", noteSchema)

// Create and save a new test note
const note = new Note({
    content: "Callback functions suck",
    important: true
})

note.save().then(result => {
    console.log("Note saved!")
    mongoose.connection.close()
})

// Note.find({ important: true }).then(result => {
//     result.forEach(note => {
//         console.log(note)
//     })
//     mongoose.connection.close()
// })
