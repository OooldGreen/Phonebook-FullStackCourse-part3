// 用于引用环境变量
require('dotenv').config()
const express = require('express')
// 使用 morgan 中间件
const morgan = require('morgan')
// 使用 cors 中间件
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', function getId(req) {
    return JSON.stringify(req.body)
})

// let persons = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

app.get('/', (req, res) => {
  res.status(200).end()
})

// 获得info
app.get('/info', (request, response) => {
    // const len = persons.length
    // const time = new Date
    const len = Person.countDocuments
    const time = new Date()

    response.json({
        'message': 'Phonebook has info for ${len} people',
        'date': time.toISOString()
    })
})

// 获得persons
app.get('/api/persons', (request, response) => {
    // response.json(persons)
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

// 获得单个person明细
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })

    // const id = Number(request.params.id)
    // const person = persons.find(person => person.id === id)

    // if(person) {
    //     response.json(person)
    // } else {
    //     response.status(400).end()
    // }
})

// 删除一个person
app.delete(
    '/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(person => {
        response.json(person)
    })

    // const id = Number(request.params.id)
    // persons = persons.filter(person => person.id !== id)
    
    // response.status(200).end()
})

// 加入一个person
app.post('/api/persons', (request, response) => {
    const body = request.body
    // console.log(body.name)

    if(body.name === undefined) {
        return response.status(400).json({error: 'content missing'})
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })

    // if(!body.name || !body.number) {
    //     return response.status(400).json({
    //         error: 'content missing'
    //     })
    // }

    // if(persons.find(person => person.name === body.name)) {
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }

    // const person = {
    //     id: Math.floor(Math.random()*1000),
    //     name: body.name,
    //     number: body.number
    // }
    // persons = persons.concat(person)

    // response.json(persons)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})