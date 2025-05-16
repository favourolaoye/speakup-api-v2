import mongoose from "mongoose";


const reportSchema = new mongoose.Schema({
    studname: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    report: {
        type: String,
        require: true
    },
    category: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Report = mongoose.model('Report', reportSchema)
export default Report;