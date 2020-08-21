
## Client in React App

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


## Server

### `npm start`

Runs the server for storing the file and details.
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

The server will reload if you make edits due to nodemon.<br />
You will also see any lint errors in the console.

### `multer`

```
const multer = require('multer');

var storage = multer.diskStorage({
    destination : (req, file, cb) =>{
    cb(null, './uploads')
  },
  filename : (req, file, cb)=> {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage });

module.exports =  upload;
```

### `mongoose schema`

```
const profileSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        required: true
    },
    filename: {
        type: String
    }
});
```

### `router`

```
router.post('/upload', upload.single('docs'), async (req, res)=>{

    const userparams = req.body;
    const userfile = req.file;
    console.log(userfile);
    userparams.filename = userfile.filename;
    console.log(userparams);

    if(!userparams.name || !userparams.email)
    {
        res.status(500)
            .send("Please provide your name and email");
        return;
    }else if(!userfile)
    {
        res.status(500)
            .send("Please upload file");
        return;
    } 

    let user = new Profile(userparams);
    user = await user.save();

    res.status(200).send(userparams);

})
```





