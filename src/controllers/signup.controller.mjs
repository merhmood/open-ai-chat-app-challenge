import db from "../models/app.model.mjs";

const signupController = (req, res)=>{
    if(req.body["email"] && req.body["password"]){
        db.users.push(req.body)
        res.json({message: "signup successful"});
    }
    else{
        db.isLogin ? res.redirect("http://localhost:3000/")  : res.render('../src/views/signup');
    }
}

export default signupController