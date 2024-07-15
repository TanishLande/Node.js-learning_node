const express = require('express');
const Page = require('../models/page.js');
const pagecontroller = require('../controllers/pageControllers')

const router = express.Router();

router.get('/page', pagecontroller.page_index );

router.post('/page',(req,res)=>{

    //console.log(req.body);
    const page = new Page(req.body);


    page.save()
    .then((result)=>{
        res.redirect('/page');
    })
    .catch((err)=>{
        console.log('this was an error');
    })
})
////after submitting we get here bringing that url here
router.get('/page/:id',(req,res)=>{
    const id = req.params.id;//creeating the variable from url got 

    Page.findById(id)
    .then((result)=>{
        res.render('details',{title:'Page Details', page: result});
    })
    .catch((err)=>{
        res.render('404',{title: 'No Page Found'});
    })
    


})
router.delete('/page/:id',(req,res)=>{
    const id = req.params.id;//creeating the variable from url got 

    Page.findByIdAndDelete(id)
    .then((result)=>{
        res.json({ redirect: '/page' })
    })
    .catch((err)=>{
        console.log('there was an error: ',err);
    })

    
})


module.exports = router;