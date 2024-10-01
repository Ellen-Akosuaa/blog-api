import bcrypt from "bcrypt";
import { registerValidator } from "../validators/user.js";
import { loginValidator } from "../validators/user.js";
import { UserModel } from "../models/user.js";

export const register = async (req, res, next) => {
   try {
     // Validate request
     const { value, error } = registerValidator.validate(req.body);
     if (error) {
         return res.status(422).json(error)
     }
     // Encrypt user password
     const hashedPassword = bcrypt.hashSync(value.password, 10);
     // create user
     await UserModel.create({
         ...value,
         password: hashedPassword
     });
     // return response
     res.status(201).json('User Registered')
   } catch (error) {
    next(error);
   }
};

export const login = async (req, res, next) => {
    // Validate request
    const { value, error } = loginValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error);
    }

    // Find a user with their unique identifier(email or username)
    const user = await UserModel.findOne({
        $or: [
            {username: value.username},
            {email: value.email},
        ]
    });
    if (!user) {
        return res.status(401).json('User not found')
    }
    // Verify their password
    const correctPassword = bcrypt.compareSync(value.password, user.password);
    if (!correctPassword) {
        return res.status(401).json('Invalid Credentials')
    }
    // Create a session
    req.session.user = {id: user.id}
    // Return a response
    res.status(200).json('User Logged In')
    }
