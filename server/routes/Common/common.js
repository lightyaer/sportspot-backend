const router = require('express').Router();
const Nexmo = require('nexmo');
const _ = require('lodash');
const { Country } = require('../../../models/Common/country');
//var { authenticate } = require('../middleware/authenticate');
//var { Driver } = require('../../models/driver');
const cors = require('cors');
var corsOptions = {
    exposedHeaders: ['x-auth']
}

router.use(cors());
//#region Country

//Save bulk Countries
router.post('/create', async (req, res) => {
    try {
        let countryNames  =  req.body.countryNames;
        
        await Country.insertMany(countryNames);
   
      
        return res.status(200).send(countries);
    } catch (e) {
        console.log(e);
       return res.status(400).send({ Err: "Could not save the Country" })
    }
})




//endregion
module.exports = router