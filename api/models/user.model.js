import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profile: { type: String, required: true, default: "pp-dino.png" },
    password: { type: String, required: true },
})

const User = mongoose.model("User", userSchema)

export default User