module.exports = [

  /**
   * GET /
   *
   * @description
   *   Index du site
   *
   * @return
   *   200
   */

  {
    method: 'GET',

    path: '/',

    handler: function(request, reply) {
      reply.view('index.html');
    }
  }
];
