'use strict'
const express = require('express')

const app = express()

app.post('/company/register')

app.post('/user/register')

app.post('/login')

app.post('/company/:companyId/vehicle')

app.put('/company/:companyId/vehicle/:vehicleId')

app.delete('/company/:companyId/vehicle/:vehicleId')

app.get('/company/:companyId/vehicle')

app.get('/company/:companyId/vehicle/:vehicleId')

app.get('/company/:companyId/user')

app.get('/company/:companyId/user/:userId')

app.put('/company/:companyId/device/:deviceId')

app.get('/company/:companyId/device/:deviceId/command')

module.exports = app
