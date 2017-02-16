
var user = require('./controller');

module.exports = function (app) {

 app.route('/home')
            // .post(user.showuser);
            .get(user.getUser);

 // app.route('/home')
 //            .get(user.showuser);

        // app.route('/home')
        //     // .post(user.showuser);
        //     .get(user.showuser);
        //     // .get(user.showuser);

};

