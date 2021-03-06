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

app.use('/api/jobs', async (req, res) => {
    let docs = await QueueItem.find({ time: { $gt: 0 } })
    if (docs.length > 0) {
        update(docs[0])
    }
    res.send(docs)

})

app.post('/api/add-job', async (req, res) => {
    var newItem = new QueueItem({
        name: req.body.name,
        time: req.body.time,
    })

    await newItem.save()
    res.redirect('back')
})


app.use(express.static(path.join(__dirname, 'client', 'build')))

console.log(__dirname)
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})


app.listen(PORT, () => console.log(`server running at port:${PORT}`))