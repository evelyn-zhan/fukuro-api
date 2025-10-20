import Course from "../models/course.model.js"

export default {
    async fetchCourses(req, res) {
        try {
            const courses = await Course.find().select("_id name level number_of_lessons")

            res.status(200).json({
                "message": "Courses fetched successfully!",
                "data": courses
            })
        }
        catch (error) {
            res.status(500).json({
                "message": "Failed to fetch courses.",
                "error": error.message
            })
        }
    },

    async fetchCourseById(req, res) {
        try {
            const { id } = req.params;
            const course = await Course.findOne({ _id: id })

            res.status(200).json({
                "message": "Course fetched successfully!",
                "data": course
            })
        }
        catch (error) {
            res.status(500).json({
                "message": "Failed to fetch course.",
                "error": error.message
            })
        }
    },

    async createCourse(req, res) {
        try {
            const existingCourse = await Course.findOne({ ...req.body })

            if (existingCourse) {
                return res.status(400).json({
                    "message": "Course already exists!"
                })
            }

            const newCourse = new Course({ ...req.body })
            const savedCourse = await newCourse.save()

            res.status(201).json({
                "message": "Course created successfully!",
                "data": savedCourse
            })
        }
        catch (error) {
            res.status(500).json({
                "message": "Internal server error! Failed to create course.",
                "error": error.message
            })
        }
    },

    async editCourse(req, res) {
        try {
            const { id } = req.params;

            const updatedCourse = await Course.findOneAndReplace(
                { _id: id },
                { ...req.body },
                { new: true }
            )
            
            res.status(200).json({
                "message": "Course updated successfully!",
                "data": updatedCourse
            })
        }
        catch (error) {
            res.status(500).json({
                "message": "Failed to update course.",
                "error": error.message
            })
        }
    },

    async deleteCourse(req, res) {
        try {
            const { id } = req.params;
            await Course.findOneAndDelete({ _id: id })

            res.status(200).json({
                "message": "Course deleted successfully!",
            })
        }
        catch (error) {
            res.status(500).json({
                "message": "Failed to delete course.",
                "error": error.message
            })
        }
    }
}