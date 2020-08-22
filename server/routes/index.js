const upload  = require('../multer');
const router = require('express').Router();

const uuid = require('uuid/v4');
const S3  = require('./../aws-s3');

const Profile = require('./../models/profile');

router.post('/upload', upload.single('docs'), async (req, res)=>{

    const userparams = req.body;
    const userfile = req.file;

    const fileType = req.file.originalname.split(".")[1];

    const s3_params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: req.file.buffer,
        Key: `${uuid()}.${fileType}`
    }

    if(!userparams.name || !userparams.email || !userfile)
    {
        res.status(500)
            .send("Please fill out all fields");
        return;
    }
    
    S3.upload(s3_params, async (error, data)=>{
        if(error)
        {
            res.status(500).send(error);
        }

        userparams.file_orgname = userfile.originalname;
        userparams.file_url = data.Location;
        userparams.file_name = data.key;
        console.log(userparams);

        let user = new Profile(userparams);
        user = await user.save();

        res.status(200).send({data, userparams});
    });

})

router.post('/getprofile', async(req, res)=>{
    console.log("/getprofile");
    let fetched = await Profile.find({});
    if(!fetched)
        res.status(500).send("error");
    res.status(200).send(fetched);
});

router.post('/deleteprofile', async(req, res)=>{
    let fetchedDelete = await Profile.remove({_id:req.body._id});
    if(!fetchedDelete)
        res.status(500).send("error");
    let fetched = await Profile.find({});
    res.status(200).send(fetched);
});

router.post('/',(req,res)=>{
    res.send('server is lsitening');
})

module.exports= router;