
var user = require('./index.controller');

module.exports = function (app) {

        app.route('/upload')
            .post(user.create);
    //     app.route('/')
    //         .get(user.show);

    //     app.route('/delete')
    //         .post(user.delete);
        app.route('/showJson')
            .get(user.showJson);
    app.route('/upload/:filename')
        .get(user.read);
    //      app.route('/upload')
    //      .post(user.create);


};

