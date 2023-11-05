const errorHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");


const userValidator = errorHandler(async(req,res,next)=>{
    // console.log("In validator")
    // let tokken;
    // let authHeader =    req.headers.Authorization || req.headers.authorization;
    // if(authHeader && authHeader.startsWith('Bearer')){
    //     tokken = authHeader.split(' ')[1];
    //     jwt.verify(tokken , process.env.PRIVATEKEY , (err,decoded)=>{

    //         if(err){
    //             console.log(err)
    //             res.status(401)
    //             throw new Error("User is not authorized");
    //         }
    //         req.user = decoded.user;
    //         // req.anyname = decoded.user;
    //         //this req.user noiw have the decoded info 
    //         //this req.user is fetching and displaying the user info in response
    //         next();
    //     })        
    //     if(!tokken){
    //         res.status(401);
    //          throw new Error("Tokken is missing or User is not authorized");
    //     }
    // }


    // GPT
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401);
      throw new Error("Token is missing or User is not authorized");
    }
  
    const token = authHeader.split(' ')[1];
  
    jwt.verify(token, process.env.PRIVATEKEY, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decoded.user;
      next();
    });
});

module.exports =userValidator ;