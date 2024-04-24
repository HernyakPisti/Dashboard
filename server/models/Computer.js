import mongoose from "mongoose";

const ComputerSchema = new mongoose.Schema(
    {
        name:String,
        user:String,
        anydesk:String,
        location:String,
        drivers:String,
    }, {timestamps: true}
);

const Computer = mongoose.model("Computer", ComputerSchema);
export default Computer; 