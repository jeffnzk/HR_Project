const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const houseSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    landlord: {
        fullName: String,
        phoneNumber: String,
        email: String
    },
    residents: [{
        _id: Schema.Types.ObjectId,
        ref: "User"
    }],
    reports: [{
        _id: Schema.Types.ObjectId,
        ref: "Report"
    }],
    facility: {
        bed: Number,
        mattress: Number,
        table: Number,
        chair: Number,
        bathroom: Number
    }
});

// house?

const House = mongoose.model("House", houseSchema);
module.exports = House;
