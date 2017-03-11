var fs = require('fs');
var mongoose = require('mongoose'),
    _ = require('lodash');
var Schema = mongoose.Schema;
var ionicUsersSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    faculty: String,
    year: String,
    userType: String,
    date: { 
      type: Date, 
      default: Date.now() 
    },
    // Photo: {type: Schema.Types.Object, ref: 'File' }
    }, 
    {collection: 'ionicUsers'}
    );
var ionicUsers = mongoose.model('ionicUsers', ionicUsersSchema);
var File = mongoose.model("FileIonic", new Schema({}, {strict: false}), "fs.files" );
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);

exports.create = function(req, res) {
var part = req.files.filefield;

var item = {
  urlImage: "http://"+"localhost:3000/postUsers/" + part.name
};
      var data = new File(item);
///////////////////SAVE///////////////////////////////
data.save(function (err) {
  if (err) return handleError(err);
  var News1 = new ionicUsers({
	  	username: req.body.username,
	    password: req.body.password,
	  	firstname: req.body.firstname,
	    lastname: req.body.lastname,
	    faculty: req.body.faculty,
	    year: req.body.year,
	    userType: req.body.userType,
        Photo: data.urlImage

  });
  
  News1.save(function (err) {
    if (err) return handleError(err);
  });
});
                var writeStream = gfs.createWriteStream({
                    filename: part.name,
                    mode: 'w',
                    content_type:part.mimetype,
                    metadata: {
                    name: data.title
                      }
                });
                writeStream.on('close', function() {
                     return res.redirect('/app/#/');
                });
                writeStream.write(part.data);
                writeStream.end();
};
exports.read = function(req, res) {
 
  gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {
 
      if(files.length===0){
      return res.status(400).send({
        message: 'File not found'
      });
      }
    res.writeHead(200, {'Content-Type': files[0].contentType});
    
    var readstream = gfs.createReadStream({
        filename: files[0].filename
    });
      readstream.on('data', function(data) {
          res.write(data);
      }); 
      readstream.on('end', function() {
          res.end();        
      });
    readstream.on('error', function (err) {
      console.log('An error occurred!', err);
      throw err;
    });
  });
 
};



    exports.createUsers = 	function(req, res) {
    // var user_id = req.body.id;
    // var token = req.body.token;
    // var geo = req.body.geo;

     //  var username = req.body.username;
     //  var password = req.body.password;
     //  var firstname = req.body.firstname;
     // var lastname = req.body.lastname;
     //  var faculty = req.body.faculty;
     //  var year = req.body.year;
     //  var userType = req.body.userType;


// var datatest = new ionicUsers(username,password,firstname,lastname,faculty,year,userType);
// datatest.save(function (err) {
//   if (err) return handleError(err);
// //   var News1 = new ionicUsers({
// //       username,password,firstname,lastname,faculty,year,userType

// // });
// });


// var  dateTime = new Date();
      var item = {
      //   title: req.body.title,
      //   group_id: req.body.group_id,
      //   author: req.body.author,
      //   description: req.body.description,
      // // var  date = new Date();
      //   date: dateTime
     username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      faculty: req.body.faculty,
      year: req.body.year,
      userType: req.body.userType
      };

      var data = new ionicUsers(item);
      data.save(function (err) {
  if (err) return handleError(err);
});





      // console.log(username + faculty);

    res.send(item);
};