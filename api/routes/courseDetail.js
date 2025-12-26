import express from "express"

import courseDetailController from "../controllers/courseDetail.controller.js"

const router = express.Router()

router.get("/:id", courseDetailController.fetchCourseDetail)
router.post("/:id", courseDetailController.createCourseDetail)
router.put("/:id", courseDetailController.editCourseDetail)

export default router