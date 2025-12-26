import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"

import userRoute from "./routes/user.js"
import courseRoute from "./routes/courses.js"
import courseDetailRoute from "./routes/courseDetail.js"
import dailyQuizRoute from "./routes/dailyquiz.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose
.connect(process.env.MONGO_URI, { dbName: "fukuro" })
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.log(`MongoDB connection error: ${error}`))

app.use("/user", userRoute)
app.use("/courses", courseRoute)
app.use("/course-detail", courseDetailRoute)
app.use("/daily-quiz", dailyQuizRoute)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`))