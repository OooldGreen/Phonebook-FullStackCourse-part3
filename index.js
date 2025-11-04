const express = require('express')
// 使用 morgan 中间件
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', function getId(req) {
    return JSON.stringify(req.body)
})


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// 获得info
app.get('/info', (request, response) => {
    const len = persons.length
    const time = new Date

    response.send(`
        <p>Phonebook has infor for ${len} people</p>
        <p>${time}</p>
    `)
})

// 获得persons
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// 获得单个person明细
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person) {
        response.json(person)
    } else {
        response.status(400).end()
    }
})

// 删除一个person
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    
    response.status(200).end()
})

// 加入一个person
app.post('/api/persons', (request, response) => {
    const body = request.body
    // console.log(body.name)

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if(persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: Math.floor(Math.random()*1000),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)

    response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})