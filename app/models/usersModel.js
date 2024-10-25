import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true,
        enum: ['board', 'expert', 'trainer', 'competitor']
    },
    skill: {
        type: String
    }
}, {
    timestamps: false
});

export const User = mongoose.model('User', usersSchema);