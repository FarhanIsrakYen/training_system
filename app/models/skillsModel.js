import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    skill_name: {
        type: String,
        required: true,
    }
}, {
    timestamps: false, versionKey: false
})

export const Skill = mongoose.model('Skill', skillSchema);