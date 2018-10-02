const router = require('express').Router();
const Nexmo = require('nexmo');
const _ = require('lodash');
//var { authenticate } = require('../middleware/authenticate');
//var { Driver } = require('../../models/driver');
const cors = require('cors');
var corsOptions = {
    exposedHeaders: ['x-auth']
}

router.use(cors());
//#region USER

//COLLECT DETAILS OF USERS AND SEND OTP TO MOBILE NUMBER
let body;
let otp;
router.post('/signup', async (req, res) => {
    try {
        body = _.pick(req.body, ['email', 'password', 'name', 'mobileNo', 'vehicleRegNo', 'address']);

        const nexmo = new Nexmo({
            apiKey: process.env.NEXMO_API_KEY,
            apiSecret: process.env.NEXMO_API_SECRET
        })
        otp = (Math.random() * 1000000 + 1).toFixed(0);
        let text = 'OTP for Signing up is ' + otp;
        setTimeout(() => {
            text = undefined;
        }, 180000
        );
        if (text) {
            nexmo.message.sendSms("NEXMO", body.mobileNo, text, { type: 'unicode' },
                (err, responseData) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send({ message: 'error in sending OTP' })
                    }


                })
        }

        res.status(200).send({ message: 'OTP has been sent' });

    } catch (e) {

        res.status(400).send({ message: 'Couldn\'t send otp' })
    }
});

//VERIFY USER MOBILE NO AND SAVE DB
router.post('/otp', async (req, res) => {
    try {
        if (req.body.otp === otp) {
            body.otpAuth = true;
            console.log(JSON.stringify(body, undefined, 2))
            var newDriver = new Driver(body);
            await newDriver.save();
            const token = await newDriver.generateAuthToken();
            res.status(200).header('x-auth', token).send(newDriver);
        }

        res.status(400).send({ message: 'OTP didn\'t Match' })
    } catch (e) {

        res.status(400).send({ message: 'Couldn\'t Sign Up' })
    }
});

//VERIFY USERS, GET USERS DETAILS
router.get('/me', authenticate, async (req, res) => {
    res.send(req.driver);
});

//LOGIN FOR USERS
router.post('/login', cors(corsOptions), async (req, res) => {
    try {

        const body = _.pick(req.body, ['email', 'password']);
        let driver = await Driver.findByCredentials(body.email, body.password);
        const token = await driver.generateAuthToken();
        res.status(200).header('x-auth', token).send(driver);

    } catch (e) {

        return res.status(400).send({ message: 'Login not Successful' });
    }
});

//LOGOUT FOR USERS
router.delete('/me/token', authenticate, async (req, res) => {
    try {
        await req.driver.removeToken(req.token)
        res.status(200).send();
    } catch (e) {

        res.status(400).send({ message: 'Failed to Logout, please try again' });
    }
});

//#endregion

module.exports = router