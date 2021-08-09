
const multer = require('multer');
const {v4} = require('uuid');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+'/../uploads')
    },
    filename: function (req, file, cb) {
       console.log(file.mimetype.split('/')[1]);
        cb(null, v4("__s") + '.'+  file.mimetype.split('/')[1])
    }
})

var upload = multer({ storage })

module.exports = upload;
