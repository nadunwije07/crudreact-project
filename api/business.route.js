
const express = require ('express');
// Express Route
const businessRoutes = express.Router();

// Require Business model in our routes module
let Business = require('./business.model');


//add data
businessRoutes.route('/add').post(function (req, res) {
    let business = new Business(req.body);
    business.save()
        .then(business => {
            res.status(200).json({'business': 'business in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

businessRoutes.route('/').get(function (req, res) { //get data
    Business.find(function(err, business){ //find data
        if(err){
            console.log(err); //log error
        }
        else {
            res.json(business); //return data in json format
        }
    });
});

businessRoutes.route('/edit/:id').get(function (req, res) { //edit data

    let id = req.params.id; //get id
    Business.findById(id, function (err, business){ //find data by id
        res.json(business); //return data in json format
    });

});

businessRoutes.route('/update/:id').post(function (req, res) { //update data
    
        Business.findById(req.params.id, function(err, business) { //find data by id
            if (!business)
                res.status(404).send("data is not found");
            else {
                business.person_name = req.body.person_name; //update data
                business.business_name = req.body.business_name; //update data
                business.person_nic_number = req.body.person_nic_number; //update data
    
                business.save().then(business =>    { //save data
                    res.json('Update complete');
                })
                    .catch(err => {
                        res.status(400).send("unable to update the database");
                    });
            }
        });
    
    }
    );

    //delete data
businessRoutes.route('/delete/:id').get(function (req, res) {
    Business.findByIdAndRemove({_id: req.params.id}, function(err, business){ 
        //find data by id and remove           
        if(err) res.json(err); //log error
        else res.json('Successfully removed');
        
    });
}
    
    );  
    
    

module.exports = businessRoutes; //export businessRoutes module

