import { validationResult } from "express-validator";
import { validateRegisterActivity } from "../requests/activityRequests.js";
import { CreateActivity, DeleteActivity, GetActivities, UpdateActivity } from "../services/ActivityServices.js";

export const createActivity = async(req, res) => {
    await Promise.all(validateRegisterActivity.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: "data cannot be processed", errors: errors.array() });
    }
    let result = await CreateActivity(req)
    return res.status(result.statusCode).json({
        message: result.message
    })
}

export const updateActivity = async(req, res) => {
    let result = await UpdateActivity(req)
    return res.status(result.statusCode).json({
        message: result.message
    })
}

export const deleteActivity = async(req, res) => {
    let result = await DeleteActivity(req)
    return res.status(result.statusCode).json({
        message: result.message
    })
}

export const getActivities = async(req, res) => {
    let result = await GetActivities(req)
    if (result.statusCode === 200) {
        return res.status(result.statusCode).json({
            activities: result.data
        })
    }
    return res.status(result.statusCode).json({
        message: result.message
    })
}