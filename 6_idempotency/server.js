'use strict'

/* eslint-disable consistent-return */

const express = require('express')
const Idempotent = require('./idempotent')
const app = express()
const port = process.env.PORT || 3001
let errorCounter = 0
let sideEffectCounter = 0

app.get('/', (req, res) => {

  const idempotencyStore = Idempotent.setup(req)

  const requestCounter = req.query.counter

  const options = {
    logs: {
      notYetDone: (idempotencyKey, idempotencyName) => console.log(`Server ${requestCounter}. Idempotency key not found for ${idempotencyName}, counter: ${sideEffectCounter} idempotencyKey: ${idempotencyKey}`),
      alreadyDone: (idempotencyKey, idempotencyName) => console.log(`Server ${requestCounter}. Idempotency key found for ${idempotencyName}, counter: ${sideEffectCounter} idempotencyKey: ${idempotencyKey}`)
    }
  }

  idempotencyStore.wrap('raiseCounter', () => sideEffectCounter += 1, options)
  errorCounter += 1

  // Fail for every second call
  if (errorCounter % 2 === 0) {
    res.statusCode = 500
    res.json({
      status: 'error'
    })
    console.log(`Server ${requestCounter}. Respond with: error, counter: ${sideEffectCounter}, idempotencyKey: ${idempotencyStore.getIdempotencyKey()}`)
    return
  }

  res.json({
    status: 'ok'
  })

  console.log(`Server ${requestCounter}. Respond with: ok, counter: ${sideEffectCounter}, idempotencyKey: ${idempotencyStore.getIdempotencyKey()}`)
})

app.listen(port, () => {
  console.info(`Server is listening on port ${port}!`)
})
