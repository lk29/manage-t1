#!/usr/bin/env node

require('dotenv').config()
const c = require('commander')
const pretty = require('prettyjson')
const { T1 } = require('./t1.js')
const createSchedule = require('./schedule')

const t1 = new T1({
  username: process.env.T1_USERNAME || 'admin',
  password: process.env.T1_PASSWORD,
  host: process.env.T1_HOST,
  proto: process.env.T1_PROTO || 'http',
  port: process.env.T1_PORT || '80',
})

c.command('get <endpoint>').action(async endpoint => {
  console.log(pretty.render(await t1.api[endpoint]))
})

c.command('autotune <mode>').action(async mode => {
  t1.autoTune = mode
})

c.command('schedule <file>').action(createSchedule)

c.parse(process.argv)
