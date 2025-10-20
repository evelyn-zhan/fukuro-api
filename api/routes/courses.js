import express from "express"

import courseController from "../controllers/courses.controller.js"

const router = express.Router()

router.get("/", courseController.fetchCourses)
router.get("/:id", courseController.fetchCourseById)
router.post("/", courseController.createCourse)
router.put("/:id", courseController.editCourse)
router.delete("/:id", courseController.deleteCourse)

export default router