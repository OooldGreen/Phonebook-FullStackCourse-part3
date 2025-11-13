// 引用环境配置文件
const config = require('./utils/config')

const express = require('express')
const app = express()
// 使用 cors 中间件
const cors = require('cors')
// 直接从 persons.js 中引入 router，也相当于一个中间件
const personsRouter = require('./controllers/persons')
// 引入其他中间件
const middleware = require('./utils/middleware')
// 引用 log 输出文件
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URL)

// 连接数据库
mongoose.connect(config.MONGODB_URL)
 .then(() => {
    logger.info('connected to MongDB')
 })
 .catch(error => {
    logger.error('error connecting to MongoDB: ', error.message)
 })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.morganLogger)

app.use('/api/persons', personsRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndPoint)


module.exports = app


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

// app.get('/', (req, res) => {
//   res.status(200).end()
// })

// // 获得info
// app.get('/info', (request, response) => {
//   // const len = persons.length
//   // const time = new Date
//   const len = Person.length
//   const time = new Date()

//   response.json({
//     'message': `Phonebook has info for ${len} people`,
//     'date': time.toISOString()
//   })
// })

// // 获得persons
// app.get('/api/persons', (request, response) => {
//   // response.json(persons)

//   Person.find({}).then(persons => {
//     if(persons) {
//       response.json(persons)
//     } else {
//       response.status(404).end()
//     }
//   })
//     .catch(error => {
//       console.log(error)
//       response.status(500).end
//     })
// })

// // 获得单个person明细
// app.get('/api/persons/:id', (request, response) => {
//   Person.findById(request.params.id).then(person => {
//     if(person) {
//       response.json(person)
//     } else {
//       response.status(404).end()
//     }
//   }).catch(error => {
//     console.log(error)
//     response.status(400).send({ error: 'malformatted id' })
//   })

//   // const id = Number(request.params.id)
//   // const person = persons.find(person => person.id === id)

//   // if(person) {
//   //     response.json(person)
//   // } else {
//   //     response.status(400).end()
//   // }
// })

// // 删除一个person
// app.delete(
//   '/api/persons/:id', (request, response, next) => {
//     Person.findByIdAndDelete(request.params.id).then(person => {
//       response.json(person)
//     }).catch(error => next(error))

//     // const id = Number(request.params.id)
//     // persons = persons.filter(person => person.id !== id)

//     // response.status(200).end()
//   }
// )

// // 加入一个person
// app.post('/api/persons', (request, response, next) => {
//   const body = request.body
//   console.log(body)

//   if(body.name === undefined) {
//     return response.status(400).json({ error: 'name missing' })
//   }

//   if(body.number === undefined) {
//     return response.status(400).json({ error: 'unvalid number' })
//   }

//   const person = new Person({
//     name: body.name,
//     number: body.number
//   })

//   person.save()
//     .then(savedPerson => { response.json(savedPerson) })
//     .catch(error => next(error))

//   // if(!body.name || !body.number) {
//   //     return response.status(400).json({
//   //         error: 'content missing'
//   //     })
//   // }

//   // if(persons.find(person => person.name === body.name)) {
//   //     return response.status(400).json({
//   //         error: 'name must be unique'
//   //     })
//   // }

//   // const person = {
//   //     id: Math.floor(Math.random()*1000),
//   //     name: body.name,
//   //     number: body.number
//   // }
//   // persons = persons.concat(person)

//   // response.json(persons)
// })

// app.put('/api/persons/:id', (request, response, next) => {
//   const body = request.body

//   const person = {
//     name: body.name,
//     number: body.number
//   }

//   Person.findByIdAndUpdate(request.params.id, person, { new: true })
//     .then(updatePerson => {
//       response.json(updatePerson)
//     })
//     .catch(error => next(error))
// })
