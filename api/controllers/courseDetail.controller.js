import CourseDetail from "../models/course_detail.model.js"

export default {
    async fetchCourseDetail(req, res) {
        try {
            const courseDetail = await CourseDetail.findOne({ id: req.params.id })

            if (!courseDetail) {
                return res.status(404).json({
                    "message": "Course detail not found!"
                })
            }

            res.status(200).json({
                "message": "Course detail fetched successfully!",
                "data": courseDetail
            })
        }
        catch (error) {
            res.status(500).json({
                "message": "Failed to fetch course detail.",
                "error": error.message
            })
        }
    },

    async createCourseDetail(req, res) {
        try {
            const existingCourseDetail = await CourseDetail.findOne({ id: req.params.id })

            if (existingCourseDetail) {
                return res.status(400).json({
                    "message": "Course detail already exists!"
                })
            }

            const newCourseDetail = new CourseDetail({ ...req.body })
            const savedCourseDetail = await newCourseDetail.save()

            res.status(201).json({
                "message": "Course detail created successfully!",
                "data": savedCourseDetail
            })
        }
        catch (error) {
            res.status(500).json({
                "message": "Failed to create course detail.",
                "error": error.message
            })
        }
    },

    async editCourseDetail(req, res) {
        try {
            const { id } = req.params;

            const updatedCourseDetail = await CourseDetail.findOneAndUpdate(
                { id: id },
                { ...req.body },
                { new: true }
            )

            res.status(200).json({
                "message": "Course detail updated successfully!",
                "data": updatedCourseDetail
            })
        }
        catch (error) {
            res.status(500).json({
                "message": "Failed to update course detail.",
                "error": error.message
            })
        }
    }
}