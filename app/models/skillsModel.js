import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
}, {
    timestamps: false
})

export const Skill = mongoose.model('Skill', skillSchema);