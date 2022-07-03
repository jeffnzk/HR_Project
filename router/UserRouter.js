const router = require("express").Router();
const bcrypt = require("bcryptjs");
const path = require("path");
const User = require("../model/User");
const House = require("../model/House");

router.post('/login', async function (req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new Error("Incorrect username or password")
        }

        res
            .status(200)
            .json({
                user: user
            });
    }
    catch (error) {
        res
            .status(400)
            .json({
                error: error.toString()
            });
    }
});

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    if (password.length < 8) {
        return res
            .status(400)
            .json({ msg: 'Password should be at least 8 characters long' })
    }

    const user = await User.findOne({ username: username }) // finding user in db
    const userEmail = await User.findOne({ email: email }) // finding user in db
    if (user || userEmail)
        return res.status(400).json({ msg: 'User already exists' })

    const houses = await House.find({});
    const newUser = new User({
        username: username,
        email: email,
        password: password
    });
    for (let house of houses) {
        if (house.residents.length < house.facility.bed) {
            newUser.house = house._id;
            await House.findByIdAndUpdate(house._id, {
                residents: [...house.residents, newUser]
            });
            break;
        }
    }
    if (!newUser.house) {
        return res.status(400).json({ msg: "Houses Full" });
    }

    // hashing the password
    bcrypt.hash(password, Number(process.env.SALT), async (err, hash) => {
        if (err)
            return res.status(400).json({ msg: err })

        newUser.password = hash
        const savedUserRes = await newUser.save()

        if (savedUserRes)
            return res.status(200).json({ msg: 'User is successfully saved' })
    })
});

router.post('/application', async (req, res) => {
    try {
        const inputs = {
            applicationStatus: "Pending",
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            preferredName: req.body.preferredName,
            // profilePicture: req.body.profilePicture,
            address: {
                building: req.body.building,
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip
            },
            phoneNumber: {
                cell: req.body.cell,
                work: req.body.work
            },
            car: {
                brand: req.body.brand,
                model: req.body.model,
                color: req.body.color
            },
            ssn: req.body.ssn,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            citizenship: req.body.citizenship === "yes",
            visa: {
                type: req.body.visa === "Other" ? req.body.visaTitle : req.body.visa,
                startDate: req.body.startDate,
                endDate: req.body.endDate
            },
            driverLicense: {
                haveLicense: req.body.driverLicense === "yes",
                number: req.body.driverLicenseNumber,
                expirationDate: req.body.expirationDate
            },
            referenceContact: {},
            emergencyContact: []
        }

        if (req.body.referenceFirstName) {
            inputs.referenceContact = {
                firstName: req.body.referenceFirstName,
                lastName: req.body.referenceLastName,
                middleName: req.body.referenceMiddleName,
                phone: req.body.referenceCellPhone,
                email: req.body.referenceEmail,
                relationship: req.body.referenceRelationship
            }
        }

        for (let index = 0; req.body[`emergencyFirstName${index}`]; index++) {
            inputs.emergencyContact.push({
                firstName: req.body[`emergencyFirstName${index}`],
                lastName: req.body[`emergencyLastName${index}`],
                middleName: req.body[`emergencyMiddleName${index}`],
                phone: req.body[`emergencyCellPhone${index}`],
                email: req.body[`emergencyEmail${index}`],
                relationship: req.body[`emergencyRelationship${index}`]
            });
        }

        const user = await User.findByIdAndUpdate(req.body.userId, inputs, { new: true });

        res
            .status(200)
            .json({
                msg: "Updated Application Information Successfully",
                user: user
            });
    }
    catch (error) {
        res
            .status(400)
            .json({ msg: error.toString() });
    }
});

router.post('/application/document', async (req, res) => {
    try {
        const profilePicture = req.files.profilePicture;
        const octReceipt = req.files.octReceipt;
        const driverLicenseFile  = req.files.driverLicenseFile;
        if (profilePicture) {
            profilePicture.mv(path.resolve(__dirname, `../public/document/profile_pictures/`, `${req.body.userId}.png`));
        }
        if (octReceipt) {
            octReceipt.mv(path.resolve(__dirname, `../public/document/oct/`, `${req.body.userId}.pdf`));
        }
        if (driverLicenseFile) {
            driverLicenseFile.mv(path.resolve(__dirname, `../public/document/driver_license/`, `${req.body.userId}.pdf`));
        }

        res
            .status(200)
            .json({ msg: "Files Uploaded Successful."})
    }
    catch (error) {
        res
            .status(400)
            .json({ msg: error.toString() });
    }
});

router.post('/information', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.body.userId, req.body);

        res
            .status(200)
            .json({
                msg: "User Personal Information Updated"
            });
    }
    catch (error) {
        res
            .status(400)
            .json({ msg: error.toString() });
    }
});

router.get('/personalinformation/:id', async (req, res) => {
    
    try {
        const userData = await User.findOne({ _id: req.params.id });

        res
            .status(200)
            .send(userData)
            .render('/personalinformation', { userData }); 

    } 
    catch(err) {
        res
            .status(400)
            .json({ msg: err.toString() });
    }

})

router.post('/personalinformation/:id', async (req, res) => { 
    
    try {
        await User.findByIdAndUpdate(req.body.userId, req.body);

        res
            .status(200)
            .json({
                msg: "User Personal Information Updated"
            });
    }
    catch (error) {
        res
            .status(400)
            .json({ msg: error.toString() });
    }

})

module.exports = router;