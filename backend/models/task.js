import mongoose from "mongoose";

const schema= mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task",
        required:true
    }
    ,
    createdAt:{
        type:Date,
        default:Date.now
    }
});

export const Task=mongoose.model("Task",schema);