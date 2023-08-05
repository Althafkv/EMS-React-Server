const users = require('../Models/userSchema')

// register employee
exports.register = async (req, res) => {
    console.log("Inside register function");
    // console.log(req.file.filename);
    const file = req.file.filename
    const { fname, lname, email, mobile, gender, status, location } = req.body

    if (!fname || !lname || !email || !mobile || !gender || !status || !location || !file) {
        res.status(403).json("All fields are required")
    }

    try {
        const preuser = await users.findOne({ email })
        if (preuser) {
            res.status(406).json("Employee already registered")
        } else {
            const newuser = new users({
                fname, lname, email, mobile, gender, status, profile: file, location
            })
            console.log(newuser);
            await newuser.save()
            res.status(200).json(newuser)
        }
    }
    catch (err) {
        res.status(401).json(err)
    }


}

// get all employees
exports.getallemployee = async (req,res) => {
    // get query
    const {search} = req.query
    console.log(search);
    const query = {
        fname:{$regex:search,$options:"i"}
    }

    try{
        const allEmployees = await users.find(query)
        res.status(200).json(allEmployees)
    }
    catch(err){
        res.status(401).json(err)
    }
}

// view user
exports.viewuser = async (req,res) => {
    const {id} = req.params
    try{
        const employee = await users.findOne({_id:id})
        if(employee){
            res.status(200).json(employee)
        } else {
            res.status(404).json("Employee not found")
        }
    }
    catch(err){
        res.status(401).json(err)
    }
}

// delete user
exports.removeUser = async (req,res) => {
    // get id from req
    const {id} = req.params
    try{
        const removedItem = await users.findByIdAndDelete({_id:id})
        res.status(200).json(removedItem)
    }
    catch(err){
        res.status(401).json(err)
    }
}

// edit user
exports.edit = async (req, res) => {
    console.log("Inside edit function");
    const {id} = req.params
    const { fname, lname, email, mobile, gender, status, location, user_profile } = req.body
    // console.log(req.file.filename);
    const file = req.file?req.file.filename:user_profile
    // if (!fname || !lname || !email || !mobile || !gender || !status || !location || !file) {
    //     res.status(403).json("All fields are required")
    // }

    try {
        const updateuser = await users.findByIdAndUpdate({ _id:id },{
            fname, lname, email, mobile, gender, status, profile: file, location
        },{
            new:true
        })
            await updateuser.save()
            res.status(200).json(updateuser)
    }
    catch (err) {
        res.status(401).json(err)
    }


}