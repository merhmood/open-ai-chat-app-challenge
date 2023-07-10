import db from "../models/app.model.mjs"

const logoutController = (req, res)=>{
    if(req.body){
        db.isLogin = false
        res.json({message: "successful"});
    }
    else{
        res.json({message: "error"});
    }
}

export default logoutController