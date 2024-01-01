import mongoose from "mongoose";
// import { randomUUID } from "crypto"; // If you would like to create your own unique ID - mongoDB provides one automatically

const chatSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const userSchema = new mongoose.Schema({
    // User.id is automatically created
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    chats: [chatSchema] // All the user's chats will be stored here
});

export default mongoose.model("User", userSchema);