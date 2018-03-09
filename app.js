const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//const db = require('./db').db;
//const Person = require('./db').Person;
const { db, Person, Pet } = require('./db');
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
      console.log('allPeople', allPeople);
      res.json(allPeople);
    })
    .catch(next)
})
 
app.post('/people', (req, res, next) => {
  const { name, imgUrl } = req.body;
  Person.create({
    name,
    imgUrl,
  })
  .then(newUser => {
    console.log(newUser)
    res.redirect('/people')
  })
  .catch(next)
})

app.get('/pets', (req, res) => {
  res.send('Pets -- Coming Soon');
})

db.sync({ force: true })
  .then(() => {
    const PORT = 3000;
    app.listen(PORT, () => console.log(`server awaiting requests on ${PORT}`)); 
  })
  .catch(console.log.bind(console));

