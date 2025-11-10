const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3] ? process.argv[3] : null
const personNumber = process.argv[4] ? process.argv[4] : null

const url = `mongodb+srv://954895224_db_user:${password}@cluster0.mnbpper.mongodb.net/?appName=Cluster0`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person= mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {
    if (personName && personNumber) {
      const person = new Person({
        name: personName,
        number: personNumber
      })

      return person.save()
    } else {
      return null
    }
  })
  .then(() => {
    if (personName) {
      console.log(`add ${personName} number ${personNumber} to phonebook`)
    }
    return Person.find({})
  }).then(result => {
    console.log('phonebook')
    result.forEach(person => {
      console.log(person)
    })
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))

