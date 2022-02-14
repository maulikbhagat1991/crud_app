var Userdb = require('../model/model');

//Create and save new user

exports.create = (req,res)=>{
    //validate a request
    if(!req.body){
        res.status(400).send({message:"Content can not be empty"});
        return;
    }
    // new user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    //Save user in the DB
    user
        .save(user)
        .then(data=>{
            //res.send(data)
            res.redirect('/add-user');
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "Someerroe occurred while creating a create operation"
            });
        });

}

//Retrieve and return all user/single user

exports.find = (req,res)=>{
    //Single record
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data=>{
                if(!data){
                    res.send(404).send({message:"Not found user with ID"+id});
                }
                else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({message:"Error retriving user with ID"+id});
            })
    }else
    {
    //All record
    Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message:err.message||"Error occurred while retriving data"
            });
        });
    }
}

//update a new identified user by user ID

exports.update = (req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message:"Data to update can not be empty"})

        }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(404).send({message:'Cannot update user with ${id}. May be user not found!'})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error update user information"})
        })
}

//delete a user with specified user ID in the request

exports.delete = (req,res)=>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Cannot delete with ID ${id}. May be ID is wrong"})

            }else{
                res.send({message:"User was deleted successfuly"})
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:"Could not dlete user with ID = "+id});
        });
}