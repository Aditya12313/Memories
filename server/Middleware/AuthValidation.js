import Joi from 'joi'; //JOI is a JavaScript library used to validate data before it reaches your database.

export const signupValidation= (req,res,next)=>{
    const schema=Joi.object({
        name:Joi.string().min(3).max(100).required(),
        email:Joi.string().required(),
        password:Joi.string().min(8).max(100).required(),
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(404)
        .json({message:"Bad request",error});
    }
    next();
}

export const loginValidation= (req,res,next)=>{
    const schema=Joi.object({
       
        email:Joi.string().email().required(),
        password:Joi.string().min(8).max(100).required(),
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message:"Bad request",error});
    }
    next();
}

