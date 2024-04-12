require('dotenv').config();
const Person = require('./models/person');

Person.deleteMany({})
  .then((result) => {
    console.log(result.toString());
  })
  .catch((error) => {
    console.log(error.message);
  });

const persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

Person.insertMany(persons)
  .then((result) => {
    console.log(result.toString());
  })
  .catch((error) => {
    console.log(error.message);
  });
