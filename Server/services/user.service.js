import userModel from "../models/user.models.js";

export const createUserService = async ({ email, password }) => {
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Please provide an email and password" });
    }

    try {
        const hashedPassword = await userModel.hashPassword(password);

        const user = await userModel.create({
            email,
            password: hashedPassword,
        });

        return user;
    } catch (error) {
        return error.message;
    }
};
