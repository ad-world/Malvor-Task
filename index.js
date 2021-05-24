const QueueItem = require('./models/QueueItem')
const db = require('./config')
const path = require('path')
const cors = require('cors')



const express = require('express')

const PORT = process.env.PORT || 8080;

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

const update = (doc) => {
    doc.time = doc.time - 1;
    doc.save()
}



if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build'))

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'))
    })
}


app.get('/jobs', async (req, res) => {
    let docs = await QueueItem.find({ time: {$gt: 0}})

    if(docs.length > 0){
        update(docs[0])
    }
    res.send(docs)
})

app.post('/add-job', async (req, res) => {    
    var newItem = new QueueItem({
        name: req.body.name,
        time: req.body.time,
    })

    await newItem.save()
    res.redirect('back')
})

app.listen(PORT, () => console.log(`server running at port:${PORT}`))