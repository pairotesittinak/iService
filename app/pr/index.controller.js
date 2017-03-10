var fs = require('fs');
var mongoose = require('mongoose'),
    _ = require('lodash');
var Schema = mongoose.Schema;
var newsSchema = mongoose.Schema({
    topic: {type: Boolean, default: false },
    title: String,
    group_id: {type: String, default: 'all' },
    date: { 
      type: Date, 
      default: Date.now() 
    },
    author: String,
    userType: {type: String, default: 'all' },
    faculty: {type: String, default: 'all' },
    year: {type: String, default: 'all' },
    image: {type: Schema.Types.Object, ref: 'File' },
    description: String
    }, 
    {collection: 'News'}
    );
var newss = mongoose.model('newss', newsSchema);
var File = mongoose.model("File", new Schema({}, {strict: false}), "fs.files" );
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);

exports.create = function(req, res) {
var part = req.files.filefield;

var item = {
  urlImage: "http://"+"localhost:3000/upload/" + part.name
};
      var data = new File(item);
///////////////////SAVE///////////////////////////////
data.save(function (err) {
  if (err) return handleError(err);
  var YearStudent;
  var News1 = new newss({
        title: req.body.title,
        group_id: req.body.group_id,
        author: req.body.author,
        description: req.body.description,
        userType: req.body.userType,
        faculty: req.body.faculty,
        year: req.body.year,
        topic: req.body.topic,
        image: data.urlImage

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
                     // res.status(200).send({
            // message: 'Success'

          // });
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

    exports.showJson = function (req, res) {
    newss
    .find()
    .populate('File')
    .sort({date: -1})
    .exec(function (err, users) {
      if (err) return handleError(err);
      console.log('The creator is %s', users);
      res.json(users);
    });

    };

