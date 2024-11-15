import mongoose from "mongoose";

const featuredeventSchema = mongoose.Schema(
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
    }
)

const FeaturedEvent = mongoose.model('FeaturedEvent', featuredeventSchema);
export default FeaturedEvent;