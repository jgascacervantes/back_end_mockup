'use strict';
/*
Routes api calls to the handler functions
 */
module.exports = function (app) {
    var handlers = require('../handlers/handler');

    app.route('/launch/')
        .get(handlers.createNovaInstance);
    app.route('/launch/withHeat/')
        .get(handlers.callHeat);

};