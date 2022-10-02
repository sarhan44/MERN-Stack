const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true
}).then(() => {
    console.log("DB connection established");
}).catch((err) => {
    console.log("Not connected to Mongoose server" + err.message);
})