import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique: [true, "Project name must be unique"],
    },

    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
