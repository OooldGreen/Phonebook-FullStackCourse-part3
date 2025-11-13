// 对 persons 数据库进行操作的所有方法

const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (request, response) => {
    Person.find({}).then(persons => {
    if(persons) {
      response.json(persons)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => {
      console.log(error)
      response.status(500).end
    })
})

personsRouter.get('/:id', (request, response, next) => {
    Person.findById(request.params.id)
      .then (person=> {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
      })
      .catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    Person.save()
     .then(savePerson => {
        response.json(savePerson)
     })
     .catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
     .then(person => {
        response.json(person)
     })
     .catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, {new: true})
     .then(updatePerson => {
        response.json(updatePerson)
     })
     .catch(error => next(error))
})


module.exports = personsRouter