var PORT = process.env.PORT || 5000
var express = require('express')
var fs = require('fs')
const { fstat } = require('fs')
var app = express()

app.use(express.static('client'))
app.use(express.urlencoded({extended: true}))

// on user load
app.get('/', (req, res) => {
    res.contentType('text/html')
    res.sendFile(__dirname + '/client/index.html')
})

// when user requests data
app.get('/src', (req, res) => {
    res.contentType('application/json')
    res.sendFile(__dirname + '/src.json')
})

// on request to add a word
app.post('/add', (req, res) => {
    let type = req.body.type
    let word = req.body.value
    res.sendFile(__dirname + '/client/submit.html')

    
    // write the request
    console.log(`Request : word "${word}" at place ${type}`)

    try {
        const data = fs.readFileSync(__dirname + '/waiting.json', 'utf8')
        content = JSON.parse(data)
        content.push({"type": type, "value": word})

        fs.writeFileSync(__dirname + '/waiting.json', JSON.stringify(content))

        console.log('Succsefuly updated waiting.json.')
    
    } catch (err) {console.log('Failed to update waiting.json.'); console.log(err)}
    

})

app.listen(PORT, () => {console.log(`Server running`)})