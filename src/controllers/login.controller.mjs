import { render } from "pug";
import db from "../models/app.model.mjs";

const loginController = (req, res)=>{
    if( db.isLogin){
        res.redirect("http://localhost:3000/");
    }
    else{
        let error = true
        // Searchs for user data
        for(let i = 0; i < db.users.length; i++){
            if(db.users[i].email === req.body.email && 
                db.users[i].password === req.body.password){
                    error = false;
                    db.isLogin = true;
            }
        }
        error ? res.render("../src/views/login") : res.json({message: "valid credentials"});
    }
}

export default loginController