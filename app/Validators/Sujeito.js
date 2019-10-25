const Antl = use('Antl');
const { rule } = use('Validator');

class Sujeito {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      nome: [rule('required')],
      nascimento: [rule('required')],
      user_id: [rule('required'), rule('exists', ['users', 'id'])],
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Sujeito;
