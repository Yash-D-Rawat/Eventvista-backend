
import mongoose from 'mongoose';
const Schema = mongoose.Schema

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    collegeName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ""
    },
    skills: {
        type: [String],
        default: [],
    },
    rating: {
        type: Number,
        default: 0
    },
    rating_count: {
        type: Number,
        default: 0
    }, 
    image: String
});

const userModel = mongoose.model('users',userSchema)
export default userModel