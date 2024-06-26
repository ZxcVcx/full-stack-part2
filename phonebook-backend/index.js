require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person');

const app = express();

app.use(express.static('dist'));
app.use(cors());
app.use(express.json());

morgan.token('request-body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'));

// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()
// }
// app.use(requestLogger)

// app.get('/', (request, response) => {
//     response.send('<h1>Hello World!</h1>')
// })

app.get('/info', (request, response) => {
  // let res = `<p>Phonebook has info for ${persons.length} people</p>`
  // res = res.concat(`<p>${new Date().toString()}</p>`)
  // response.send(res)
  Person.find({}).then((persons) => {
    let res = `<p>Phonebook has info for ${persons.length} people</p>`;
    res = res.concat(`<p>${new Date().toString()}</p>`);
    response.send(res);
    // mongoose.connection.close()
  });
});

app.get('/api/persons', (request, response) => {
  // response.json(persons)
  Person.find({}).then((persons) => {
    response.json(persons);
    // mongoose.connection.close()
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // const person = persons.find(p => p.id === id)

  // if (person) {
  //   response.json(person)
  // } else {
  //   response.status(404).end()
  // }

  Person.findById(String(request.params.id))
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.body.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const { body } = request;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save()
    .then((returnedPerson) => {
      response.json(returnedPerson);
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint',
  });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
