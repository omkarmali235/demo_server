const express=require('express');
const router = express.Router();

const BlogPost = require('../models/blogPost');


router.get('/',(req,res)=>{
    BlogPost.find({ })
        .then((data)=>{
            console.log('Data: ',data);
            res.json(data);
        })
        .catch((error)=>{
            console.log('error : ',error);
        })
});

router.post('/save',(req,res)=>{
    //console.log('Body: ', req.body);
    const data = req.body;

    const newBlogPost = new BlogPost(data);

    newBlogPost.save((error)=>{
        if(error){
            res.status(500).json({msg: 'Sorry, Internal Server Errors'});
        }
        else{
            res.json({
                msg:'Your Data Has been Saved to the Databse...!!!'
            });
        }
    });
});


router.get('/name',(req,res)=>{
    const data={
        username : "perterson",
        age : 5
    }
    res.json(data);
});


module.exports = router;