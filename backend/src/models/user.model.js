import mongoose from "mongoose";
import { useReducer } from "react";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["buyer", "seller"],
        default: "buyer"
    }
})



// pre - before saving any data to database is goes through this
userSchema.pre("save", async function () { 
    if(!this.isModified("password")) return;

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
})

userSchema.method.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password
    );
}

const userModel = mongoose.model("User", userSchema )

export default userModel;