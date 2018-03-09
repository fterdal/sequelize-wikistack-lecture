const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/petpeople');

const Person = db.define('people', {
  name: Sequelize.STRING,
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://placeimg.com/200/200/nature',
    vallowNull: false,
    validate: {
      isUrl: true,
    }
  }
});

const Pet = db.define('pets', {
  name: Sequelize.STRING,
  species: Sequelize.STRING,
  age: Sequelize.INTEGER,
});

Person.hasMany(Pet, { foreignKey: 'owner' });

module.exports = {
  db,
  Person,
  Pet,
};
