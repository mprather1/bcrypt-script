var bcrypt = require('bcryptjs')

const password = process.argv[2]
const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)

console.log(encryptedPassword)
