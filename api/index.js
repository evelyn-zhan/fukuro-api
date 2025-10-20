import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"

import courseRoute from "./routes/courses.js"
import userRoute from "./routes/user.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose
.connect(process.env.MONGO_URI, { dbName: "fukuro" })
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.log(`MongoDB connection error: ${error}`))

app.use("/courses", courseRoute)
app.use("/user", userRoute)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`))