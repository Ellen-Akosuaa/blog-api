import bcrypt from "bcrypt";
import { registerValidator } from "../validators/user.js";

export const register = async (req, res, next) => {
    // Validate request
    const { value, error } = registerValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error)
    }
        // Pick user information
        const { password } = req.body;
        // Encrypt user password
        // create user
        // return response
};