import { Skill } from "../models/skillsModel.js";

export const GetAllSkillService = async () => {
    let skills = await Skill.find({})
    return {statusCode: 200, data: skills};
}