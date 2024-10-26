import { Activity } from "../models/activitiesModel.js";
import { Skill } from "../models/skillsModel.js";


export const CreateActivity = async(req) => {
    try {
        let { skill, title, description, startdate, enddate, participants } = req.body;
        if (new Date(startdate) >= new Date(enddate)) {
            return { statusCode: 422, message: "Data cannot be processed" }
        }
        await Activity.create({
            skill: skill,
            title: title,
            description: description,
            startdate: startdate,
            enddate: enddate,
            participants: participants
        });
        return { statusCode: 200, message: "create success"}
    } catch (error) {
        console.error("Error occurred during register", error.toString());
        return { statusCode: 422, message: "Data cannot be processed" }
    }
}

export const UpdateActivity = async(req) => {
    try {
        const id = req.params.id;
        const { skill, title, description, startdate, enddate, participants } = req.body;
        const existingActivity = await Activity.findById(id);

        if (!existingActivity) {
            return { statusCode: 422, message: "Data cannot be processed" }
        }
        const updateData = {};

        if (startdate && enddate) {
            if (new Date(startdate) >= new Date(enddate)) {
                return { statusCode: 422, message: "Data cannot be processed" }
            }
            updateData.startdate = new Date(startdate);
            updateData.enddate = new Date(enddate);
        } else if (startdate) {
            if (new Date(startdate) >= new Date(existingActivity.enddate)) {
                return { statusCode: 422, message: "Data cannot be processed" }
            }
            updateData.startdate = new Date(startdate);
        } else if (enddate) {
            if (new Date(existingActivity.startdate) >= new Date(enddate)) {
                return { statusCode: 422, message: "Data cannot be processed" }
            }
            updateData.enddate = new Date(enddate);
        }

        if (skill) updateData.skill = skill;
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (participants) updateData.participants = participants;

        await Activity.updateOne(
            { _id: id },
            { $set: updateData }
        );
        return { statusCode: 200, message: "update success"}
    } catch (error) {
        console.error("Error occurred during register", error.toString());
        return { statusCode: 422, message: "Data cannot be processed" }
    }
}

export const DeleteActivity = async(req) => {
    try {
        const id = req.params.id;
        const deletedActivity = await Activity.findByIdAndDelete(id);

        if (!deletedActivity) {
            return { statusCode: 422, message: "Data cannot be processed" }
        }
        return { statusCode: 200, message: "delete success"}
    } catch (error) {
        console.error("Error occurred during register", error.toString());
        return { statusCode: 422, message: "Data cannot be processed" }
    }
}

export const GetActivities = async(req) => {
    try {
        const { skill_id } = req.params;
        const { page = 1, limit = 10, sort = 'startdate', order = 'asc' } = req.query;

        const sortDirection = order === 'asc' ? 1 : -1;
        const activities = await Activity.find({ skill: skill_id })
            .populate({
                path: 'participants',
                select: 'name profile skill',
                populate: {
                    path: 'skill',
                    select: 'skill_name'
                }
            })
            .sort({ [sort]: sortDirection })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const skill = await Skill.findById(skill_id).select('skill_name');
        if (!skill) {
            return { statusCode: 422, message: "Data cannot be processed" }
        }

        const data = activities.map(activity => ({
            skill_id: activity.skill,
            skill_name: skill.skill_name,
            title: activity.title,
            description: activity.description,
            startdate: activity.startdate,
            enddate: activity.enddate,
            participants: activity.participants.map(participant => ({
                id: participant._id,
                name: participant.name,
                profile: participant.profile,
                skill: participant.skill
            }))
        }));
        return { statusCode: 200, message: "data retrieved successfully", data: data}
    } catch (error) {
        console.error("Error occurred during register", error.toString());
        return { statusCode: 422, message: "Data cannot be processed" }
    }
}