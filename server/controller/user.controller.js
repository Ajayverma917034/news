import User from "../model/user.model.js";
import tryCatch from "../utils/asyncFunction.js";
import { sendToken } from "../utils/jwtToken.js";

export const createUser = tryCatch(async (req, res, next) => {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
        return res.status(400).json({ success: false, message: "Please provide email, password and username" })
    }

    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ success: false, message: "User already exists" })
    }

    const findByUserName = await User.findOne({ username })
    if (findByUserName) {
        return res.status(400).json({ success: false, message: 'Username already exist' })
    }
    const newUser = new User({
        email,
        password,
        username
    })

    newUser.save()
        .then(async (data) => {
            await sendToken(data, 200, res)
        })
        .catch(err => {
            res.status(500).json({ success: false, message: err.message })
        })
})

export const login = tryCatch(async (req, res, next) => {
    const { email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({ success: false, message: "Please provide all details" })
    }

    var user = await User.findOne({email: email}).select('+password');
    if(!user){
        user = await User.findOne({username: email}).select('+password');
        // console.log(user)
    }
    if (!user) {
        return res.status(400).json({ success: false, message: "Invalid credentials" })
    }
    
    const isPassowrdMatch = await user.comparePassword(password);

    if (!isPassowrdMatch) {
        return res.status(400).json({ success: false, message: "Invalid credentials" })
    }

    await sendToken(user, 200, res)
})

export const getUser = tryCatch(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({ success: true, user })
})