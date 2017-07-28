var bcrypt = require('bcryptjs')
var fs = require('fs')
var execa = require('execa')
var util = require('util')

const username = process.argv[2]
const password = process.argv[3]
const filename = process.argv[4]

const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)

var command = util.format('tail -n %d %s', 1, filename)
var command2 = util.format("sed -i '${s/$/,/}'", filename) // eslint-disable-line

execa.shell(command)
.then(result => {
  const stdout = result.stdout
  var vanquish = stdout.length

  getStat(stdout, vanquish)
}).catch(err => {
  throw new Error(err)
})

function getStat (stdout, vanquish) {
  fs.stat(filename, (err, stats) => {
    if (err) throw new Error(err)
    getTruncate(stats, vanquish)
  })
}

function getTruncate (stats, vanquish) {
  fs.truncate(filename, stats.size - vanquish, (err) => {
    if (err) throw new Error(err)
    appendToLastLine()
  })
}

function appendToLastLine () {
  execa.shell(command2)
  .then(result => {
    const format = {
      username: username,
      password: encryptedPassword
    }
    fs.appendFile(filename, '  ' + JSON.stringify(format) + '\n]')
  }).catch(err => {
    throw new Error(err)
  })
}
