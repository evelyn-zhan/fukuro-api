import express from "express"

import dailyQuizController from "../controllers/dailyquiz.controller.js"

const router = express.Router()

router.get("/", dailyQuizController.fetchQuestions)
router.post("/", dailyQuizController.createQuestion)

export default router