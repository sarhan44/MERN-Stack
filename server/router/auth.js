const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
require('../DB/conn')

router.get('/', (req, res) => {
    res.send(" Test Request Is Working ")
})

//?======[ User Register ]=========

router.post('/register', async (req, res) => {
    try {

        let { name, email, phone, pass, cpass, work } = req.body

        if (!name || !email || !phone || !pass || !cpass || !work) {
            return res.status(422).send("Please fill all fields");
        }

        let userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(422).send({ msg: "email already exist." });
        } else if (pass != cpass) {
            return res.status(422).send({ msg: "Passwords not matching." });
        } else {
            let newUser = new User({ name, email, phone, pass, cpass, work })

            await newUser.save();

            res.status(200).send({ msg: "User created successfully", data: newUser });
        }


    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
})

//?======[ Login user ]=========

router.post('/signin', async (req, res) => {
    try {
        let { email, pass } = req.body
        if (!email || !pass) return res.status(400).send({ messages: "Please fill all fields." })

        let findEmail = await User.findOne({ email: email, pass: pass });
        if (!findEmail) {
            return res.status(401).send({ messages: "invalid cridentiel" })
        }


    } catch (err) {
        res.send(err.message);
    }
})

module.exports = router;