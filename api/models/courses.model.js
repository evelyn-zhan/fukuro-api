import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: String, required: true },
    number_of_lessons: { type: Number, required: true },
    technologies: { type: [String], required: true },
    categories: { type: [String], required: true },
    description: { type: String, required: true },
}, { timestamps: false })

const Course = mongoose.model("Course", courseSchema)

export default Course