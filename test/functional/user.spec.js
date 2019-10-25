const { test, trait } = use('Test/Suite')('User');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('it should be able to create users', async () => {
  await Factory.model('App/Models/User').create();
});
