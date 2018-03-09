const express = require('express');
const morgan = require('morgan');

const db = require('./db-sol').db;
const Pet = require('./db-sol').Pet;
const Person = require('./db-sol').Person;
const app = express();

app.use(morgan('dev'));

const homePage = `
  <!DOCTYPE html>
  <html>
    <body>
      <h1>Home Page</h1>
      <h2><a href="/people">People</a></h2>
      <h2><a href="/pets">Pets</a></h2>
    </body>
  </html>
`;

app.get('/', (req, res) => {
  res.send(homePage);
})

app.get('/people', (req, res, next) => {
  Person.findAll()
  .then(allPeople => {
    res.json(allPeople);
  })
  .catch(next)
})

app.get('/pets', (req, res, next) => {
  Pet.findAll()
  .then(allPets => {
    res.json(allPets);
  })
  .catch(next)
})

app.post('/pets', (req, res, next) => {
  People.create(req.body)
  .then(newPerson => {
    res.redirect('/pets');
  })
})

db.sync({ force: true })
  .then(() => {
    const PORT = 3000;
    app.listen(PORT, () => console.log(`server awaiting requests on ${PORT}`));
})

