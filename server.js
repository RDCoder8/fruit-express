const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const fruits = require('./models/fruits')
const vegetables = require('./models/vegetables')

app.set("view engine", 'jsx')
//Default is to look inside the views folder
// app.set('views', './views')
const jsxViewEngine = require('jsx-view-engine')
app.engine("jsx", jsxViewEngine())

///////Middleware
app.use((req, res, next) => {
    // console.log('Middleware: I run for all routes, 1');
    next();
});

//By implementing the line below , we now have access to the req.body.
//Which is the parsed formData from the form request
app.use(express.urlencoded({extended: false}))

///////Fruit Index Route
app.get('/fruits', (req, res) => {
    // console.log('Index controller')
    res.render('./fruits/Index', { fruits })
});

///////Fruit New Route
app.get('/fruits/new', (req, res) => {
    res.render("./fruits/New")
})

///////Fruit Delete Route

///////Fruit Update Route

///////Fruit Create Route
app.post('/fruits', (req, res) => {
    // if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
    //     req.body.readyToEat = true; //do some data correction
    // } else { //if not checked, req.body.readyToEat is undefined
    //     req.body.readyToEat = false; //do some data correction
    // }
    req.body.readyToEat = req.body.readyToEat === 'on'
    fruits.push(req.body)
    // console.log(fruits)
    res.redirect('/fruits') //send user back to /fruits
})

///////Fruit Edit Route

//Fruit Show Route
app.get('/fruits/:id', (req, res) => {
    //second param of the render method must be an object
    res.render('./fruits/Show', {
        //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitArray]
        fruit: fruits[req.params.id]
    })
});

///////Vegetable Index Route
app.get('/vegetables', (req, res) => {
    res.render('./vegetables/Index', { vegetables })
});

///////Vegetable New Route
app.get('/vegetables/new', (req, res) => {
    res.render("./vegetables/New")
})

///////Vegetable Delete Route

///////Vegetable Update Route

///////Vegetable Create Route
app.post('/vegetables', (req, res) => {
    req.body.readyToEat = req.body.readyToEat === 'on'
    vegetables.push(req.body)
    res.redirect('/vegetables') //send user back to /fruits
})

///////Vegetable Edit Route

//Vegetable Show Route
app.get('/vegetables/:id', (req, res) => {
    //second param of the render method must be an object
    res.render('./vegetables/Show', {
        vegetables : vegetables[req.params.id]
    })
});

app.listen(PORT, () => {
    console.log(`The government is listening on port ${PORT}`);
});