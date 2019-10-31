const Antl = use('Antl');
const { rule } = use('Validator');

class User {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      nome: [rule('required')],
      nome_guerra: [rule('required')],
      email: [rule('required'), rule('email'), rule('unique')],
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = User;
