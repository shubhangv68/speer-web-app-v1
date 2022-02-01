const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const advisorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true
        },
        phone: {
            type: String,
            required: true,
            maxlength: 10
        },
        photo: {
            data: Buffer,   //buffer datatype
            contentType: String     //.png or .pdf etc
        },
        company: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        jobrole: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        category: {
            type: ObjectId,
            ref: "Category",
            required: true
        },
       
        gradyear: {
            type: Number,
            required: true,
            maxlength: 10
        },
        branch: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        }, 
        college: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        cgpa: {
            type: Number,
            required: true,
            maxlength: 10
        },
        resume: {
            data: Buffer,   //buffer datatype
            contentType: String     //.png or .pdf etc
        },
        skill:{
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        bookinglink:{
            type: String,
            trim: true,
            maxlength: 100
        },
        pickupline:{
            type: String,
            maxlength:600
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("Advisor", advisorSchema);