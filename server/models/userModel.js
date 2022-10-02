const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    work: {
        type: String,
        required: true,
    },
    pass: {
        type: String,
        required: true,
    },
    cpass: {
        type: String,
        required: true,
    }
})
userSchema.pre('save', async function (next) {
    if(this.isModified("pass")){
        this.pass = await bcrypt.hash(this.pass, 10)
        this.cpass = await bcrypt.hash(this.cpass, 10)
        console.log("helloo");
    }
    next();
})


const User = mongoose.model("USER", userSchema);

module.exports = User;