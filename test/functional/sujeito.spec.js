const { test, trait } = use('Test/Suite')('Sujeito');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const Sujeito = use('App/Models/Sujeito');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('it should be able to create sujeitos', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('/sujeitos')
    .loginVia(user, 'jwt')
    .send({
      nome: 'nome',
      rg: 'guerra',
      rg_uf: 'SC',
      cpf: '',
      nascimento: '2019-01-01',
      nome_mae: '',
      nome_pai: '',
      user_id: user.id,
    })
    .end();

  response.assertStatus(201);
  assert.exists(response.body.id);
});

test('it should be able to list sujeitos', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const sujeito = await Factory.model('App/Models/Sujeito').make();

  await user.sujeitos().save(sujeito);

  const response = await client
    .get('/sujeitos')
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);

  assert.equal(response.body[0].nome, sujeito.nome);
  assert.equal(response.body[0].user.id, user.id);
});

test('it should be able to show single sujeitos', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const sujeito = await Factory.model('App/Models/Sujeito').create();

  await user.sujeitos().save(sujeito);

  const response = await client
    .get(`/sujeitos/${sujeito.id}`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);

  assert.equal(response.body.nome, sujeito.nome);
  assert.equal(response.body.user.id, user.id);
});

test('it should be able to update a sujeitos', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const sujeito = await Factory.model('App/Models/Sujeito').create({
    nome: 'Old name',
  });

  const response = await client
    .put(`/sujeitos/${sujeito.id}`)
    .loginVia(user, 'jwt')
    .send({
      ...sujeito.toJSON(),
      nome: 'New name',
    })
    .end();

  response.assertStatus(200);

  assert.equal(response.body.nome, 'New name');
});

test('it should be able to delete a sujeitos', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const sujeito = await Factory.model('App/Models/Sujeito').create();

  await user.sujeitos().save(sujeito);

  const response = await client
    .delete(`/sujeitos/${sujeito.id}`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(204);

  const checkSujeito = await Sujeito.find(sujeito.id);

  assert.isNull(checkSujeito);
});
