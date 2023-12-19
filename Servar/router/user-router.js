const express = require("express");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.get("/", async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.log(error);
    }
    if (!users) {
        return res.status(404).json({ message: "users not fount" })
    }
    return res.status(201).json({ users })

})

router.post("/signup", async (req, res, next) => {
    const { name, email, password } = req.body;

    let exiStinguser;
    try {
        exiStinguser = await User.findOne({ email })
    } catch (error) {
        return console.log(error);
    }
    if (exiStinguser) {
        return res.status(400).json({ message: "Alredy exists ! login insted" })
    }
    const hashedPassword = bcrypt.hashSync(password)

    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs:[],
    });
    try {
        await user.save();

    } catch (error) {
        return console.log(error);
    }
    return res.status(201).json({ user })
})

router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    let exiStingUser;
    try {
        exiStingUser = await User.findOne({ email })
    } catch (error) {
        console.log(error);
    }
    if (!exiStingUser) {
        return res.status(404).json({ message: "cound't Fount User by This Email" })
    }
    const ispasswordcurret = bcrypt.compare(password, exiStingUser.password)
    if (!ispasswordcurret) {
        return res.status(400).json({ message: "InCorred password" })
    }
    return res.status(200).json({ message: "Login succssFull", user:exiStingUser })
})

module.exports = router;


