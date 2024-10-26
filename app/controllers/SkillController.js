import { GetAllSkillService } from "../services/SkillServices.js";


export const getSkills = async(req, res) => {
    let result = await GetAllSkillService()
    return res.status(result.statusCode).json({
        data: result.data
    })
}