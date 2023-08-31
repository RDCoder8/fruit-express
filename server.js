const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000

const fruits = [
    {
        name:'apple',
        color: 'red',
        readyToEat: true
    },
    {
        name:'pear',
        color: 'green',
        readyToEat: false
    },
    {
        name:'banana',
        color: 'yellow',
        readyToEat: true
    }
];

// Index Route
app.get('/fruits', (req, res) => {
    res.send(fruits);
});

//Show route
app.get('/fruits/:id', (req, res) => {
    res.send(fruits[req.params.id]);
});

app.listen(PORT, () => {
    console.log(`The government is listening on port ${PORT}`);
});