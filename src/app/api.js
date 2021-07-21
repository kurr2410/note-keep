var express = require('express');
const cors = require("cors");
var bodyParser = require('body-parser')
var app = express();
var fs = require("fs")

app.use(cors());
app.use(bodyParser.json({ limit: '50mb', 'Content-type': 'application/json' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

app.listen(3000, () => {
    console.log("server is listening")
});
const fileUrl = "../../store.json";



app.get('/', (req, res) => {
    fs.readFile(fileUrl, "utf8", (err, data) => {
        data = JSON.parse(data);
        res.send(data)
    })
})

app.get('/edit/:id', (req, res) => {

    fs.readFile(fileUrl, "utf8", (err, data) => {
        newData = JSON.parse(data)
        var x;
        for (a of newData) {
            if (a.id == req.params.id) {
                x=a
                res.send(a)
                var index = newData.indexOf(a)
                newData.splice(index, 1)
            }
        }

        fs.writeFile(fileUrl, JSON.stringify(newData), (err) => {
            if (err) {
                console.log("error")
            } else {
                //res.send(newData)
                console.log("Note taken for edit")
            }
        })
    })
})


app.post('/add', (req, res) => {
    fs.readFile(fileUrl, "utf8", (err, data) => {
        newData = JSON.parse(data)
        newData.push(req.body);

        fs.writeFile(fileUrl, JSON.stringify(newData), (err) => {
            if (err) {
                console.log("error")
            } else {
                res.send(newData)
                console.log("Data added")
            }
        })
    })
})


app.delete('/delete/:id', (req, res) => {

    fs.readFile(fileUrl, "utf8", (err, data) => {
        newData = JSON.parse(data)

        for (a of newData) {
            if (a.id == req.params.id) {
                var index = newData.indexOf(a)
                newData.splice(index, 1)
            }
        }

        fs.writeFile(fileUrl, JSON.stringify(newData), (err) => {
            if (err) {
                console.log("error")
            } else {
                res.send(newData)
                console.log("Data deleted")
            }
        })
    })
})