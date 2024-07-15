const Page = require('../models/page.js');

const page_index = ((req,res)=>{
    Page.find().sort({ createdAt: -1 })
    .then((result)=>{
        res.render('index',{title: 'All Pages', notes: result});
    })
    .catch((err)=>{
        console.log('There was an in page/:', err);
    })
})

module.exports = {page_index};

// const blog_details = ((req,res)=>{

//     //console.log(req.body);
//     const page = new Page(req.body);


//     page.save()
//     .then((result)=>{
//         res.redirect('/page');
//     })
//     .catch((err)=>{
//         console.log('this was an error');
//     })
// })

// const blog_createget = (req,res)=>{
//     const id = req.params.id;//creeating the variable from url got 

//     Page.findById(id)
//     .then((result)=>{
//         res.render('details',{title:'Page Details', page: result});
//     })
//     .catch((err)=>{
//         console.log('there was an error: ',err);
//     })
    


// })