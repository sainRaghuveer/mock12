const jwt = require("jsonwebtoken");

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization;

    try{
        jwt.verify(token, 'grow', function(err, decoded) {
            console.log(decoded) 
            if(decoded){
                next();
            }else{
                res.send({"msg":"Please login first"})
            }
          });
    }catch(error){
        res.send({"msg":"Please verify first"})
    }
}

module.export={
    authenticate
}