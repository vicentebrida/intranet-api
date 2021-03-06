/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/User', (faker, i, data = {}) => {
  return {
    nome: faker.name(),
    nome_guerra: faker.name(),
    email: faker.email(),
    password: faker.string(),
    ...data,
  };
});

Factory.blueprint('App/Models/Token', (faker, i, data = {}) => {
  return {
    type: data.type || 'refreshtoken',
    token: faker.string({ length: 24 }),
    ...data,
  };
});

Factory.blueprint('App/Models/Sujeito', (faker, i, data = {}) => {
  return {
    nome: faker.sentence({ words: 6 }),
    nascimento: faker.date({ format: 'YYYY-MM-DD' }),
    ...data,
  };
});
