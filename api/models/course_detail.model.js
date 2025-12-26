import mongoose from "mongoose"

const courseDetailSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    chapters: { type: [String], required: true },
    materials: { type: [[Map]], required: true },
}, { timestamps: false })

const CourseDetail = mongoose.model("CourseDetail", courseDetailSchema)

export default CourseDetail