import User from "../models/user.models.js";

// Create a new user
export const createUser = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const hashedPassword = await User.hashPassword(password);

    const user = await User.create({
        email,
        password: hashedPassword,
    });

    delete user._doc.password;

    return user;
};

// Login a user
export const loginUser = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const user = await User.findOne({
        email,
    }).select("+password");

    if (!user) {
        throw new Error("User not found or password is incorrect");
    }
    const isPasswordMatch = await user.isValidPassword(password);

    if (!isPasswordMatch) {
        throw new Error("User not found or password is incorrect");
    }

    delete user._doc.password;

    return user;
};

// Get all users

export const getAllUsers = async ({ userId }) => {
    const users = await User.find({
        _id: {
            $ne: userId,
        },
    }).select("-password");

    if (!users) {
        throw new Error("No users found");
    }

    return users;
};
