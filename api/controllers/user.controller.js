import User from "../models/user.model.js"

import bcrypt from "bcrypt"

export default {
    async fetchUsers(req, res) {
        try {
            const users = await User.find().select("name email profile")

            res.status(200).json({
                "message": "Users fetched successfully!",
                "data": users
            })
        }
        catch (error) {
            res.status(500).json({
                "message": "Failed to fetch users.",
                "error": error.message
            })
        }
    },

    async signup(req, res) {
        try {
            const { email, password } = req.body

            const existingUser = await User.findOne({ email })

            if (existingUser) {
                return res.status(400).json({
                    "message": "User already exists!"
                })
            }

            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(password, saltRounds)

            const newUser = new User({ ...req.body, password: hashedPassword })
            await newUser.save()

            res.status(201).json({
                "message": "User created successfully!",
            })
        }
        catch (error) {
            res.status(500).json({
                "message": "Failed to create user.",
                "error": error.message
            })
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(404).json({
                    message: "Oops! We couldn't find that account."
                })
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password)

            if (!isPasswordCorrect) {
                return res.status(400).json({
                    message: "Oops! Password doesn't match."
                })
            }
            
            res.status(200).json({
                "message": "Login success!",
                "data": {
                    "name": user.name,
                    "email": user.email,
                    "profile": user.profile
                }
            })
        }
        catch (error) {
            res.status(500).json({
                "message": "Login failed.",
                "error": error.message
            })
        }
    },

    async updateProfile(req, res) {
        try {
            const { email } = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(404).json({
                    message: "Oops! We couldn't find that account."
                })
            }

            const updatedUser = await User.findOneAndUpdate(
                { email },
                { ...req.body },
                { new: true }
            )

            res.status(200).json({
                "message": "Profile updated successfully!",
                "data": updatedUser
            })
        }
        catch (error) {
            res.status(500).json({
                "message": "Failed to update user profile",
                "error": error.message
            })
        }
    }
}