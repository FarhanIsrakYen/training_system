import {Skill} from "../models/skillsModel.js";

export const GetAllSkillService = async () => {
    let joinWithActivitiesStage = {$lookup: {from: "activities", localField: "_id", foreignField:"skill_id",as:"activity"}};

    let unwindActivityStage = {$unwind: "$activity"}

    let projectionStage = {$project:{'activity.skill_id':0, 'activity.participants':0}}

    let data = await Skill.aggregate([
        joinWithActivitiesStage,
        projectionStage,
    ])
    return {statusCode: 200, data: data};
}