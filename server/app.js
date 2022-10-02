const dotenv = require("dotenv");
const express = require('express');
const app = express();

dotenv.config({ path: './config.env' })

require('./DB/conn')
// const User = require('./models/userModel.js')
app.use(express.json());


app.use(require('./router/auth'))



app.get('/about', (req, res) => {
    res.send("hello about")
})
app.get('/contact', (req, res) => {
    res.send("hello constact")
})
app.get('/signin', (req, res) => {
    res.send("hello signin")
})


// PORT Connection;
const PORT= process.env.PORT
app.listen(PORT, () => {
    console.log(`App is Running on port ${PORT}`);
})