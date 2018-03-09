const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

const homePage = `
  <!DOCTYPE html>
  <html>
    <body>
      <h1>Home Page</h1>
      <h2><a href="/people">People</a>
      <h2><a href="/pets">Pets</a>
    </body>
  </html>
`;

app.get('/', (req, res) => {
  res.send(homePage);
})

app.get('/people', (req, res) => {
  res.send('All people -- Coming Soon');
})

app.get('/pets', (req, res) => {
  res.send('All pets -- Coming Soon');
})

const PORT = 3000;
app.listen(PORT, () => console.log(`server awaiting requests on ${PORT}`));

