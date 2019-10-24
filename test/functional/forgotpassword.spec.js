const { test, trait } = use('Test/Suite')('Forgot Password');

const { subMinutes, format } = require('date-fns');

const Mail = use('Mail');
const Hash = use('Hash');
const Database = use('Database');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('it should send an email with reset password instructions', async ({ assert, client }) => {
  Mail.fake();

  const email = 'vicentebrida@outlook.com';

  const user = await Factory
    .model('App/Models/User')
    .create({ email });

  await client
    .post('/forgot')
    .send({ email })
    .end();

  const token = await user.tokens().first();

  const recentEmail = Mail.pullRecent();

  assert.equal(recentEmail.message.to[0].address, email);


  assert.include(token.toJSON(), {
    type: 'forgotpassword',
  })

  Mail.restore();
});

test('it should be able to reset password', async ({ assert, client }) => {
  const email = 'vicentebrida@outlook.com';

  const user = await Factory.model('App/Models/User').create({ email });
  const userToken = await Factory.model('App/Models/Token').make();

  await user.tokens().save(userToken);

  await client
    .post('/reset')
    .send({
      token: userToken.token,
      password: '123456',
      password_confirmation: '123456'
    })
    .end();

  await user.reload();
  const checkPassword = await Hash.verify('123456', user.password);

  assert.isTrue(checkPassword);
});

test('it cannot reset password after 30 minutes of forgot password request', async ({ assert, client }) => {
  const email = 'vicentebrida@outlook.com';

  const user = await Factory.model('App/Models/User').create({ email });
  const userToken = await Factory.model('App/Models/Token').make();

  const dateWithSub = format(subMinutes(new Date(), 30), 'yyyy-MM-dd HH:ii:ss');

  await user.tokens().save(userToken);

  await Database
    .table('tokens')
    .where('token', userToken.token)
    .update('created_at', dateWithSub);

  await userToken.reload();

  response = await client
    .post('/reset')
    .send({
      token: userToken.token,
      password: '123456',
      password_confirmation: '123456'
    })
    .end();

  response.assertStatus(400);
})
