require('dotenv').config()
const { T1 } = require('./t1.js')

const t1 = new T1({
  username: process.env.T1_USERNAME || 'admin',
  password: process.env.T1_PASSWORD,
  host: process.env.T1_HOST,
  proto: process.env.T1_PROTO || 'http',
  port: process.env.T1_PORT || '80',
})

async function main() {
  console.log(await t1.api.summary)
  console.log(
    await (t1.api.updatePassword = {
      user: 'admin',
      currentPassword: process.env.T1_PASSWORD,
      newPassword: 'blah',
    }),
  )
}

main()
