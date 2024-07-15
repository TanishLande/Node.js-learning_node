const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const pageRoute = require('./routes/pageRoute');

const app = express();

/// connecting databse
const dbURI = 'mongodb+srv://node-tanish:test123@notesdiary.dsqysdg.mongodb.net/yourDatabaseName?retryWrites=true&w=majority';

///connecting mongoose to databse
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then((result) => app.listen(3000, 'localhost',()=>{
        console.log('server is now live');
    }))
    .catch(err => console.error('Database connection error:', err));




///adding ejs
app.set('view engine', 'ejs');
app.set('views', 'html-files');


///using middlewear
app.use(morgan('dev'));

/////getting the url encoded data from form and setting in object 
app.use(express.urlencoded({ extended: true }));


/////making static files (static files include images, css and otehr those stuff)
app.use(express.static('public'));


////getting data in database 
// app.get('/add-page',(req,res)=>{
//     const page = new Page({
//         title: 'best day in my life2',
//         snippet: 'This was all about this best day2',
//         body: 'This was the day when i meet Virat Kohli who is my inspiration'
//     });

//     page.save()
//         .then((result)=>{
//             res.send(result);
//         })
//         .catch((err)=>{
//             res.send(err);
//         })

// })

////loading all datset on screen 
// app.get('/all-page',(req,res)=>{
//     Page.find()
//     .then((result)=>{
//         res.send(result);////used to show data to website in format of jason 
//     })
//     .catch((err)=>{
//         console.log('there was an error in code:',err);
//     })
// })

////shoing only singke data using finbyid method
// app.get('/single-page',(req,res)=>{
//     Page.findById('669375059f7f542ca6a777e0')
//     .then((result)=>{
//         res.send(result);//used to show data to website in format of jason 
//     })
//     .catch((err)=>{
//         console.log('there was an err in finding id: ',err);
//     })
// })


//using ejs
///routes
app.get('/',(req,res)=>{
    // const notes =[
    //     {title:'Day1', details: '1 pipinaLorem ipsum dolor sit amet consectetur adipisicing elit. Alias, a'},
    //     {title:'Day2', details: '2 bhjsabkc Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, a'},
    //     {title:'Day2', details: '3 jabosbojojLorem ipsum dolor sit amet consectetur adipisicing elit. Alias, a'},
    // ];
    res.redirect('/page');///redirect to index.ejs if someone try to enter /
})

app.get('/about',(req,res)=>{
    res.render('about',{title:"About"});
})

///page router 
app.use(pageRoute);


///adding new page
app.get('/create', (req, res) => {
    res.render('create', { title: "Create new note" });
});

////404 error
app.use((req,res)=>{
    res.status(404).render('404');
})



///without using ejs
// app.get('/', (req,res) =>{
//     // res.send('<p>This is the home page.</p>');
//     res.sendFile('./html-files/index.html',{ root: __dirname});
// })
// app.get('/about', (req,res) =>{
//     // res.send('<p>This is the home page.</p>');
//     res.sendFile('./html-files/about.html',{ root: __dirname});
// })
// app.get('/about-me',(req,res)=>{
//     res.redirect('./html-files/about.html', {root: __dirname});
// })
// app.use((req,res)=>{
//     res.status(404).sendFile('./html-files/404.html', {root: __dirname});
// })