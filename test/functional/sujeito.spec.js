const { test, trait } = use('Test/Suite')('Sujeito');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

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

  const response = await client.get('/sujeitos').end();

  response.assertStatus(200);
  assert.equal(response.body[0].nome, sujeito.nome);
  assert.equal(response.body[0].user.id, user.id);
});
