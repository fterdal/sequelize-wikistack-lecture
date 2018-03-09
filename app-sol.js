const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const db = require('./db-sol').db;
const Pet = require('./db-sol').Pet;
const Person = require('./db-sol').Person;
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

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

app.post('/people', (req, res, next) => {
  const { name, imgUrl } = req.body;
  Person.create({ name, imgUrl })
  .then(newPerson => {
    console.log(newPerson);
    res.redirect('/people');
  })
})

db.sync({ force: true })
  .then(() => {
    const PORT = 3000;
    app.listen(PORT, () => console.log(`server awaiting requests on ${PORT}`));
})

