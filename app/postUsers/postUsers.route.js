
var user = require('./postUsers.controller');

module.exports = function (app) {


app.route('/postUsers')
    .post(user.createUsers);
// app.route('/postUsers')
//     .post(user.createUsers);
app.route('/postUsers/:filename')
    .get(user.read);
// app.route('/test')
// 	.get(user.test);

};