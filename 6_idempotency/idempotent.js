'use strict'
const idempotencyStore = new Map()

function setSideEffect (idempotencyKey, name, value) {
  const session = idempotencyStore.get(idempotencyKey)
  if (session) {
    session.set(name, value)
  } else {
    idempotencyStore.set(idempotencyKey, new Map([ [ name, value ] ]))
  }
}

function getSideEffect (idempotencyKey, name) {
  const session = idempotencyStore.get(idempotencyKey)
  return session ? session.get(name) : undefined
}

function setup (req) {
  const idempotencyKey = req.headers['x-idempotency']

  return {
    async wrapPromise (name, sideEffect, options) {
      const savedValue = getSideEffect(idempotencyKey, name)

      if (savedValue) {
        options.logs.alreadyDone(idempotencyKey, name)
        return savedValue
      }

      options.logs.notYetDone(idempotencyKey, name)

      const value = await Promise.resolve(sideEffect())

      setSideEffect(idempotencyKey, name, value)

      return value
    },

    wrap (name, sideEffect, options) {
      const savedValue = getSideEffect(idempotencyKey, name)

      if (savedValue) {
        options.logs.alreadyDone(idempotencyKey, name)
        return savedValue
      }

      options.logs.notYetDone(idempotencyKey, name)

      const value = sideEffect()

      setSideEffect(idempotencyKey, name, value)

      return value
    },

    getIdempotencyKey () {
      return idempotencyKey
    }
  }
}

module.exports = {
  setup
}
