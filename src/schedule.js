const schedule = require('node-schedule')
const fs = require('fs')
const chalk = require('chalk')
const pretty = require('prettyjson')
const T1 = require('./t1')

function createSchedule(file) {
  const miners = JSON.parse(fs.readFileSync(file))
  miners.map(miner => {
    if (miner.profile.metric === 'time') {
      return miner.profile.events.map(event => {
        process.stdout.write(
          `${chalk.green('scheduling')} ${chalk.yellow(miner.host)}:\n`,
        )
        process.stdout.write(
          `${pretty.render(event, { inlineArrays: true })}\n\n`,
        )
        const rule = new schedule.RecurrenceRule()
        rule.dayOfWeek = event.dayOfWeek
        rule.hour = event.hour || 0
        rule.minute = event.minute || 0
        schedule.scheduleJob(rule, () => {
          const t1 = new T1({
            username: miner.username || 'admin',
            password: miner.password,
            host: miner.host,
            proto: miner.proto || 'http',
            port: miner.port || '80',
          })
          process.stdout.write(
            `${chalk.blue('running')} ${chalk.yellow(miner.host)}:\n`,
          )
          process.stdout.write(
            `${pretty.render(event, { inlineArrays: true })}\n\n`,
          )
          const [command, value] = event.command
          t1.api[command] = value
        })
        return rule
      })
    }
    return null
  })
}

module.exports = createSchedule
