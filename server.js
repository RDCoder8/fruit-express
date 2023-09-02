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

// Index Route
app.get('/fruits', (req, res) => {
    res.render('./fruits/Index', { fruits })
});

app.get('/vegetables', (req, res) => {
    res.render('./vegetables/Index', { vegetables })
});

//Show route
app.get('/fruits/:id', (req, res) => {
    //second param of the render method must be an object
    res.render('./fruits/Show', {
        //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitArray]
        fruit: fruits[req.params.id]
    })
});

app.get('/vegetables/:id', (req, res) => {
    //second param of the render method must be an object
    res.render('./vegetables/Show', {
        vegetables : vegetables[req.params.id]
    })
});

app.listen(PORT, () => {
    console.log(`The government is listening on port ${PORT}`);
});