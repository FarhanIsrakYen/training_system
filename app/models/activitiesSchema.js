import mongoose from 'mongoose';

const activitiesSchema = new mongoose.Schema({
    skill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true,
        validate: [date => date > this.start_date, 'End date must be after start date']
    },
    participants: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: false });

export const Activity = mongoose.model('Activity', activitiesSchema);