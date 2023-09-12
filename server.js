require("dotenv").config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const Fruit = require('./models/fruit')
const Vegetable = require('./models/vegetable')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

////////Database Collection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.connection.once("open", () => {
    console.log("Hacked into the mainframe")
  })
  ////////////////////////

app.set("view engine", 'jsx')
//Default is to look inside the views folder
// app.set('views', './views')
const jsxViewEngine = require('jsx-view-engine')
app.engine("jsx", jsxViewEngine())

//CSS Import
//Serves static files CSS
app.use(express.static("public"))

///////Middleware
app.use((req, res, next) => {
    // console.log('Middleware: I run for all routes, 1');
    next();
});

//We use a mongoose model to perform CRUD operations
//By implementing the line below , we now have access to the req.body.
//Which is the parsed formData from the form request
app.use(express.urlencoded({extended: false}))
//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'));

//Seed Route to put in data when you initally start
app.get('/fruits/seed', async (req, res) => {
    try {
        await Fruit.create([
                {
                    name:'grapefruit',
                    color:'pink',
                    readyToEat:true
                },
                {
                    name:'grape',
                    color:'purple',
                    readyToEat:false
                },
                {
                    name:'avocado',
                    color:'green',
                    readyToEat:true
                }
            ])
            res.redirect("/fruits")
    } catch (error) {
        res.status(400).send(error)
    }
})


///////Fruit Index Route
app.get('/fruits', async (req, res) => {
    try {
        const foundFruits = await Fruit.find({})
        // console.log(foundFruits)
        res.status(200).render('./fruits/Index', { fruits: foundFruits })
    } catch (error) {
        res.status(418).send(error)
    }
    
});

///////Fruit New Route
app.get('/fruits/new', (req, res) => {
    res.render("./fruits/New")
})

///////Fruit Delete Route
app.delete('/fruits/:id', async (req, res) => {
    try {
        //we are getting is id from the request parameters
        await Fruit.findByIdAndDelete(req.params.id)
        res.status(200).redirect("/fruits")
    } catch (error) {
        res.status(400).send(error)
    }
    //this was here to test the route.
    //res.send('deleting...')
})

///////Fruit Update Route
app.put('/fruits/:id', async (req, res) => {
    try {
        req.body.readyToEat = req.body.readyToEat === 'on'
        const updatedFruit = await Fruit.findByIdAndUpdate(
            //Id gotten from the url
            req.params.id, 
            //the body from the form
            req.body, 
            //prevent delay in update
            {new: true})
            console.log(updatedFruit)
        res.redirect(`/fruits/${req.params.id}`);
    } catch (error) {
        res.status(400).send(error)
    }
})

///////Fruit Create Route
app.post('/fruits', async (req, res) => {
    try {
        // if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
    //     req.body.readyToEat = true; //do some data correction
    // } else { //if not checked, req.body.readyToEat is undefined
    //     req.body.readyToEat = false; //do some data correction
    // }
    req.body.readyToEat = req.body.readyToEat === 'on'

    const createdFruit = await Fruit.create(req.body)
    res.status(201).send(createdFruit)
    } catch (error) {
        res.status(400).send(error)
    }
    
})

///////Fruit Edit Route
app.get('/fruits/:id/edit', async (req, res)=>{
    try {
        //find the document in the database and then update it
        const foundFruit = await Fruit.findById(req.params.id)
        res.render("./fruits/Edit", {fruit: foundFruit})
    } catch (error) {
        res.status(400).send(error)
    }
})

//Fruit Show Route
app.get('/fruits/:id', async (req, res) => {
    try {
        const foundFruit = await Fruit.findById(req.params.id)
        //second param of the render method must be an object
    res.render('./fruits/Show', {
        //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitArray]
        fruit: foundFruit
    })
    } catch (error) {
        res.status(400).send(error)
    }
    
});

///////Vegetable Index Route
app.get('/vegetables', async (req, res) => {
    try {
        const foundVegetables = await Vegetable.find({})
        res.render('./vegetables/Index', { vegetables: foundVegetables })
    } catch (error) {
        res.status(400).send(error)
    }
});

///////Vegetable New Route
app.get('/vegetables/new', (req, res) => {
    res.render("./vegetables/New")
})

///////Vegetable Delete Route

///////Vegetable Update Route

///////Vegetable Create Route
app.post('/vegetables', async (req, res) => {
    try {
        req.body.readyToEat = req.body.readyToEat === 'on'
        const createdVegetable = await Vegetable.create(req.body)
        res.status(201).send(createdVegetable)
    } catch (error) {
        res.status(400).send(error)
    }
    
})

///////Vegetable Edit Route

//Vegetable Show Route
app.get('/vegetables/:id', async (req, res) => {
    try {
        const foundVegetable = await Vegetable.findById(req.params.id)
        res.render('./vegetables/Show', {
        vegetables : foundVegetable
    })
    } catch (error) {
        res.status(400). send(error)
    }
    
});

//Catch All Route

app.get("*", (req, res) => {
    res.redirect("/fruits")
})

app.listen(PORT, () => {
    console.log(`The government is listening on port ${PORT}`);
});