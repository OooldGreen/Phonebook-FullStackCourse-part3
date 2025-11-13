const morgan = require('morgan')
const logger = require('./config')

morgan.token('body', req => JSON.stringify(req.body))

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('---')
    next()
}

const unknownEndPoint = (request, response) => response.status(404).send({ error: 'unknown endpoint' })

// 错误处理
const errorHandler = (error, request, response, next) => {
  // handle error
  // console.log(error)
  logger.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if(error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const morganLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

module.exports =  { requestLogger, unknownEndPoint, errorHandler, morganLogger}