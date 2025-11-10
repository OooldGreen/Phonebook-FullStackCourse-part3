// 使用 mongoDB 数据库
const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

// console.log('connection to', url)

mongoose.connect(url)
 .then(result => {
    console.log('connected to MongoDB')
 })
 .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
 })

// 设置存储数据的数据类型
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

// 删除不想要展示在前端的数据
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)