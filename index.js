const QueueItem = require('./models/QueueItem')
const db = require('./config')
const path = require('path')
const bodyParser = require('body-parser')

const mongo = "mongodb+srv://malvor:malvor@malvor-task.dzsgm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


const express = require('express')

const PORT = process.env.PORT || 8080;

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));

const update = (doc) => {
    doc.time = doc.time - 1;
    doc.save()
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})


app.get('/jobs', async (req, res) => {
    await QueueItem.find({time:  { $gt: 0 }}, (err, docs) => {
        if(err){
            console.error(err)
        } else {
            setInterval(
                () => {
                    update(docs[0])
                    
                },
                1000
            )
            res.send(docs)
            
        }
    })
})

app.post('/add-job', async (req, res) => {
    var newItem = new QueueItem({
        name: req.body.name,
        time: parseInt(req.body.time),
        done: false
    })

    await newItem.save()

    res.redirect('/')

})

app.listen(PORT, () => console.log(`server running at port:${PORT}`))