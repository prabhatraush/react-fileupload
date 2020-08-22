const multer = require('multer');

var storage = multer.memoryStorage({
  // destination : (req, file, cb) =>{
  //   cb(null, '')
  // },
  // filename : (req, file, cb)=> {
  //   cb(null, Date.now() + '-' +file.originalname )
  // }
})

var upload = multer({ storage: storage });

module.exports =  upload;