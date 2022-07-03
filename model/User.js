const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: { 
        type: String, 
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['hiring_manager', 'employee'],
        default: "employee",
        required: true
    },
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    middleName: {
        type: String,
        default: ""
    },
    preferredName: {
        type: String,
        default: ""
    },
    address: {
        building: {
            type: String,
            default: null
        },
        street: {
            type: String,
            default: null
        },
        city: {
            type: String,
            default: null
        },
        state: {
            type: String,
            default: null
        },
        zip: {
            type: Number,
            default: null
        }
    },
    phoneNumber: {
        cell: {
            type: String,
            default: null
        },
        work: {
            type: String,
            default: null
        }
    },
    car: {
        brand: {
            type: String,
            default: null
        },
        model: {
            type: String,
            default: null
        },
        color: {
            type: String,
            default: null
        }
    },
    ssn: String,
    dateOfBirth: Date,
    gender: {
        type: String,
        enum: ['male', 'female', 'I do not wish to answer']
    },
    citizenship: Boolean,
    visa: String,
    employment: {
        title: {
            type: String,
            default: null
        },
        startDate: {
            type: Date,
            default: null
        },
        endDate: {
            type: Date,
            default: null
        }
    },
    driverLicense: {
        haveLicense: {
            type: Boolean,
            default: null
        },
        number: {
            type: Number,
            default: null
        },
        expirationDate: {
            type: Date,
            default: null
        }
    },
    referenceContact: {
        firstName: {
            type: String,
            default: null
        },
        lastName: {
            type: String,
            default: null
        },
        middleName: {
            type: String,
            default: null
        },
        phone: {
            type: String,
            default: null
        },
        email: {
            type: String,
            default: null
        },
        relationship: {
            type: String,
            default: null
        }
    },
    emergencyContact: [{
        firstName: String,
        lastName: String,
        middleName: String,
        phone: String,
        email: String,
        relationship: String
    }],
    visa: {
        type: {
            type: String,
            default: null
        },
        startDate: {
            type: Date,
            default: null
        },
        endDate: {
            type: Date,
            default: null
        }
    },
    DriverLicense: {
        haveLicense: {
            type: Boolean,
            default: null
        },
        number: {
            type: Number,
            default: null
        },
        expirationDate: {
            type: Date,
            default: null
        }
    },
    applicationStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Never_Submitted'],
        default: 'Never_Submitted'
    },
    rejectedReason: String,
    house: {
        type: Schema.Types.ObjectId,
        ref: "House"
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
