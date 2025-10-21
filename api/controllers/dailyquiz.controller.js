import DailyQuiz from "../models/dailyquiz.model.js"

export default {
    async fetchQuestions(req, res) {
        try {
            const questions = await DailyQuiz.aggregate([
                { $sample: { size: 5 } }
            ])

            res.status(200).json({
                "message": "Questions fetched successfully!",
                "data": questions
            })
        }
        catch (error) {
            res.status(500).json({
                "message": "Failed to fetch questions.",
                "error": error.message
            })
        }
    },

    async createQuestion(req, res) {
        try {
            const newQuestion = new DailyQuiz({ ...req.body })
            const savedQuestion = await newQuestion.save()

            res.status(201).json({
                "message": "Question created successfully!",
                "data": savedQuestion
            })
        }
        catch (error) {
            res.status(500).json({
                "message": "Failed to create question.",
                "error": error.message
            })
        }
    }
}