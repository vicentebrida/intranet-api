/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const Sujeito = use('App/MOdels/Sujeito');

/**
 * Resourceful controller for interacting with sujeitos
 */
class SujeitoController {
  /**
   * Show a list of all sujeitos.
   * GET sujeitos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const sujeitos = await Sujeito.query()
      .with('user', builder => {
        builder.select(['id', 'nome_guerra', 'avatar']);
      })
      .fetch();

    return sujeitos;
  }

  /**
   * Create/save a new sujeito.
   * POST sujeitos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only([
      'nome',
      'rg',
      'rg_uf',
      'cpf',
      'nascimento',
      'nome_mae',
      'nome_pai',
      'user_id',
    ]);

    const sujeito = await Sujeito.create(data);

    return response.status(201).json(sujeito);
  }

  /**
   * Display a single sujeito.
   * GET sujeitos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const sujeito = await Sujeito.find(params.id);

    await sujeito.load('user', builder => {
      builder.select(['id', 'nome_guerra', 'avatar']);
    });

    return sujeito;
  }

  /**
   * Update sujeito details.
   * PUT or PATCH sujeitos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only([
      'nome',
      'rg',
      'rg_uf',
      'cpf',
      'nascimento',
      'nome_mae',
      'nome_pai',
      'user_id',
    ]);

    const sujeito = await Sujeito.find(params.id);

    sujeito.merge(data);

    await sujeito.save();

    return sujeito;
  }

  /**
   * Delete a sujeito with id.
   * DELETE sujeitos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const sujeito = await Sujeito.find(params.id);

    await sujeito.delete();
  }
}

module.exports = SujeitoController;
