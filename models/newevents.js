import mongoose from "mongoose";

const newEventSchema = mongoose.Schema(
    {
        title: String,
        venue: String,
        location: String,
        type: String,
        fee: Number,
        prize: Number,
        registration: {
            type: Number,
            default: 0
        },
        eventdate: Date,
        creation:{
            type: Date,
            default: new Date()
        },
        organized_by: String,
        image: String,
        description: String,
        contact: String,
    }
)

const newevent = mongoose.model('newevent', newEventSchema);
export default newevent;