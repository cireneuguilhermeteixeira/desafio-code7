const User = require('../models/user')
const handleError = require('../../utils/handler-error');
const handleSuccess = require('../../utils/handler-success');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../secrets/auth');



function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 86400
    });
}


exports.save = async (req,resp) => {
    try{
        const userToSave = req.body;  
        const userFounded = await User.find({email : userToSave.email}).exec();

        if(userFounded.length > 0) return handleError(resp,{message : 'já existe um usuário com esse e-mail'}) 
        
        const hash = await bcrypt.hash(userToSave.password, 10);
        userToSave.password = hash;

        const userSaved = await User.create(userToSave);
        userSaved.password = null
        return handleSuccess(resp,
            {
            user:userSaved,
            token: generateToken({id:userSaved.id}),
        });
         
    }catch(error){
        return handleError(resp,error); 
    }
}


exports.authentication = async (req,resp) => {
    try{
        const {email , password } = req.body;    
        let userFounded = await User.findOne()
            .where("email").equals(email)
            .select('-__v')
            .exec();
        
        if(!userFounded) return handleError(resp,{message : 'Usuário não encontrado'});
        
        const result = await bcrypt.compare(password, userFounded.password)
        
        userFounded.password = null;

        if(!result) return handleError(resp,{message : 'Senha inválida'});
        

        return handleSuccess(resp,{
                user:userFounded,
                token: generateToken({id:userFounded.id})
        });
    } catch(error) {
        return handleError(resp,error);
    }
          
}