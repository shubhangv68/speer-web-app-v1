const formidable = require('formidable');  
const _ = require('lodash');
const fs = require('fs');   //filesystem
const Advisor = require('../models/advisor');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.advisorById = (req, res, next, id) => {     //for CRUD ops
    Advisor.findById(id)
        .populate('category')
        .exec((err, advisor) => {
            if (err || !advisor) {
                return res.status(400).json({
                    error: 'advisor not found'
                });
            }
            req.advisor = advisor; 
            console.log("advisor id is",req.advisor.id) 
            next();
        });
};

exports.create = (req, res) => {    //this time cant just take i/p from req.body bec we also have imgs... so use FORM DATA
    
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) {
           
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        //check for all fields.checks whether all fields have been given as i/p
        const { name, email, phone,photo,company, jobrole, category,gradyear, branch,college,cgpa,resume,skill,bookinglink,pickupline} = fields;
        console.log(fields);

        if (!name || !email || !phone  ||!company || !jobrole || !category || !gradyear || !branch || !college || !cgpa) {
           
            return res.status(400).json({
                error: 'All fields are required'
            });
        }


        let advisor = new Advisor(fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {

            if (files.photo.size > 6000000) {   
                //>1MB, error msg
                return res.status(400).json({
                    error: 'Image should be less than 2mb in size'
                });
            }
            advisor.photo.data = fs.readFileSync(files.photo.filepath);
            advisor.photo.contentType = files.photo.mimetype;
        }
        
        if (files.resume) {

            if (files.resume.size > 2000000) {  
                 //>1MB, error msg
                return res.status(400).json({
                    error: 'Image should be less than 2mb in size'
                });
            }
            advisor.resume.data = fs.readFileSync(files.resume.filepath);
            advisor.resume.contentType = files.resume.mimetype;
        }
       
        

        advisor.save((err, result) => {
           
            if (err) {
              
                console.log('ADVISOR CREATE ERROR ', err);
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
           
            res.json(result);
        });
    });
};


exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
    console.log("111111");
    console.log(limit);
    console.log(skip);
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Advisor.find(findArgs)
        .select('-photo')
        .select('-resume')
        .populate('category')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Advisor not found'
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};
exports.photo = (req, res, next) => {   //response not JSON. jpg/pdf etc content-type hoga.
    if (req.advisor.photo.data) {
        res.set('Content-Type', req.advisor.photo.contentType);
        return res.send(req.advisor.photo.data);
    }
    next();
};
exports.resume = (req, res, next) => {   //response not JSON. jpg/pdf etc content-type hoga.
    if (req.advisor.resume.data) {
        res.set('Content-Type', req.advisor.resume.contentType);
        return res.send(req.advisor.resume.data);
    }
    next();
};

exports.remove = (req, res) => {
    let advisor = req.advisor;
    advisor.remove((err, deletedAdvisor) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'ngo deleted successfully'
        });
    });
};
exports.read = (req, res) => {
    req.advisor.photo = undefined;
    req.advisor.resume = undefined;
    //photo baad mein bhejenge dusre method se
    return res.json(req.advisor);
};

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'; //getting order from route parameter given OTHERWISE ascending by defalut
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';   //--do-- koi query aa rha to theek, varna defult wala use karlo
    let limit = req.query.limit ? parseInt(req.query.limit) : 6; 
    console.log("11111");
    console.log(limit);   //MAX 3 NGOS RETURNED AT A TIME.
    Advisor.find()      //from DB
         .select('-photo') 
         .select('-resume')  
         .populate('category')
         .sort([[sortBy, order]])    //array of arrays
        .limit(limit)
        .exec((err, ngos) => {
            if (err) {
                return res.status(400).json({
                    error: 'advisors not found'
                });
            }
            res.json(ngos);
        });
};

exports.update = (req, res) => {    //this time cant just take i/p from req.body bec we also have imgs... so use FORM DATA
    
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) {
           
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        //check for all fields.checks whether all fields have been given as i/p
        const { name, email, phone,photo,company, jobrole, category,gradyear, branch,college,cgpa,resume,skill,bookinglink,pickupline} = fields;
        console.log(fields);

        if (!name || !email || !phone  ||!company || !jobrole || !category || !gradyear || !branch || !college || !cgpa) {
           
            return res.status(400).json({
                error: 'All fields are required'
            });
        }


        let advisor = new Advisor(fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {

            if (files.photo.size > 6000000) {   
                //>1MB, error msg
                return res.status(400).json({
                    error: 'Image should be less than 2mb in size'
                });
            }
            advisor.photo.data = fs.readFileSync(files.photo.filepath);
            advisor.photo.contentType = files.photo.mimetype;
        }
        
        if (files.resume) {

            if (files.resume.size > 2000000) {  
                 //>1MB, error msg
                return res.status(400).json({
                    error: 'Image should be less than 2mb in size'
                });
            }
            advisor.resume.data = fs.readFileSync(files.resume.filepath);
            advisor.resume.contentType = files.resume.mimetype;
        }
       
        

        advisor.save((err, result) => {
           
            if (err) {
              
                console.log('ADVISOR CREATE ERROR ', err);
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
           
            res.json(result);
        });
    });
};