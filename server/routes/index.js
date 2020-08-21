const upload  = require('../multer');
const router = require('express').Router();
const Profile = require('./../models/profile');

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

router.post('/getprofile', async(req, res)=>{
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