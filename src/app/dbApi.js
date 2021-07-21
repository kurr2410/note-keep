var express = require('express');
const cors = require("cors");
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
var app = express();
var fs = require("fs")

const fileUrl = "../../store.json";
const dbUrl = 'mongodb://localhost:27017/note-keep';

app.use(cors());
app.use(bodyParser.json({ limit: '50mb', 'Content-type': 'application/json' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

const noteSchema = mongoose.Schema({
    id: Number,
    content: String
}, {
    timestamps: true
})

const noteModel = mongoose.model('Note', noteSchema)

app.listen(3000, () => {
    console.log("server is listening")
});

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {
    useNewUrlParser: true
}).then(() => {
    console.log("database connected successfully")
}).catch(err => {
    console.log("Couldn't connect to database", err);
    process.exit();
})


app.get('/', (req, res) => {
    new Controller().getAllNote((err, data) => {
        if (err) {
            res.send("NotOk")
        } else {
            //console.log(data)
            var note = [];

            data.forEach(element => {
                var a = {}
                a["id"] = element.id;
                a["content"] = element.content;
                note.push(a)
            });
            res.send(note)
        }
    })


    // fs.readFile(fileUrl, "utf8", (err, data) => {
    //     data = JSON.parse(data);
    //     res.send(data)
    // })
})

app.get('/edit/:id', (req, res) => {
    let noteId = {
        "id": req.params.id
    }
    new Controller().updateNote(noteId, (err, data) => {
        if (err) {
            console.log(err)
        } else {
           //console.log(data)
            // var note = [];
            var a = {}
             data.forEach(element => {
                
                a["id"] = element.id;
                a["content"] = element.content;
               
             });
             res.send(a)
        }
    })





    // fs.readFile(fileUrl, "utf8", (err, data) => {
    //     newData = JSON.parse(data)
    //     var x;
    //     for (a of newData.note) {
    //         if (a.id == req.params.id) {
    //             x = a
    //             res.send(a)
    //             var index = newData.note.indexOf(a)
    //             newData.note.splice(index, 1)
    //         }
    //     }

    //     fs.writeFile(fileUrl, JSON.stringify(newData), (err) => {
    //         if (err) {
    //             console.log("error")
    //         } else {
    //             //res.send(newData)
    //             console.log("Note taken for edit")
    //         }
    //     })
    // })
})


app.post('/add', (req, res) => {

    new Controller().addNote(req.body, (err, data) => {
        if (err) {
            res.send("NotOk")
        } else {
            // console.log(data)
            var note = [];
            data.forEach(element => {
                var a = {}
                a["id"] = element.id;
                a["content"] = element.content;
                note.push(a)
            });
            res.send(note)
        }
    })

    // fs.readFile(fileUrl, "utf8", (err, data) => {
    //     newData = JSON.parse(data)
    //     newData.note.push(req.body);

    //     fs.writeFile(fileUrl, JSON.stringify(newData), (err) => {
    //         if (err) {
    //             console.log("error")
    //         } else {
    //             res.send(newData)
    //             console.log("Data added")
    //         }
    //     })
    // })
})


app.delete('/delete/:id', (req, res) => {
    let noteId = {
        "id": req.params.id
    }
    new Controller().deleteNote(noteId, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            var note = [];
            data.forEach(element => {
                var a = {}
                a["id"] = element.id;
                a["content"] = element.content;
                note.push(a)
            });
            res.send(note)
        }
    })




    // fs.readFile(fileUrl, "utf8", (err, data) => {
    //     newData = JSON.parse(data)

    //     for (a of newData.note) {
    //         if (a.id == req.params.id) {
    //             var index = newData.note.indexOf(a)
    //             newData.note.splice(index, 1)
    //         }
    //     }

    //     fs.writeFile(fileUrl, JSON.stringify(newData), (err) => {
    //         if (err) {
    //             console.log("error")
    //         } else {
    //             res.send(newData)
    //             console.log("Data deleted")
    //         }
    //     })
    // })
})


class Controller {

    getAllNote(callback) {
        noteModel.find((err, datalist) => {
            if (err) {
                callback(err)
            } else {
                console.log("data fetched")
                callback(null, datalist)
            }

        })
    }

    updateNote(noteId, callback) {
        noteModel.find(noteId, (err, datalist) => {
            if (err) {
                callback(err)
            } else {
                        console.log("note updated")
                        callback(null, datalist)
                    }
                })
        
    }

    addNote(note, callback) {
        noteModel.insertMany(note, (err, dataList) => {
            if (err) {
                callback(err)
            } else {
                noteModel.find((err, datalist) => {
                    if (err) {
                        callback(err)
                    } else {
                        console.log("note added")
                        callback(null, datalist)
                    }
                })
            }
        })
    }

    deleteNote(noteId, callback) {
        noteModel.findOneAndDelete(noteId, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                noteModel.find((err, datalist) => {
                    if (err) {
                        callback(err)
                    } else {
                        console.log("note deleted")
                        callback(null, datalist)
                    }
                })

            }
        })
    }
}