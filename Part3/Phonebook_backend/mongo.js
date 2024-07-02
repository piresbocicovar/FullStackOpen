const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('enter the password as an argument')
  console.log('usage:')
  console.log('  node mongo.js [password]')
  console.log('  node mongo.js [password] [name] [number]')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://phonemaster:${password}@cluster0.y6zouab.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv[3] && process.argv[4]) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    person.save().then(result => {
        console.log(`${process.argv[3]} added to the phonebook!`)
        mongoose.connection.close()
      })
} else {
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
      })
}

