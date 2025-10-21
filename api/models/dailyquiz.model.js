import mongoose from "mongoose"

const dailyQuizSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    answer: { type: String, required: true },
})

const DailyQuiz = mongoose.model("DailyQuiz", dailyQuizSchema)

export default DailyQuiz