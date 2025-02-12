import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
    title: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique: [true, "Project name must be unique"],
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        unique: false,
    },

    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
