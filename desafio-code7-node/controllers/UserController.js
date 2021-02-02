const handleError = require('../utils/handler-error');
const handleSuccess = require('../utils/handler-success');
const url = require('../config/json_place_holder.json').url;
const axios = require('axios');



exports.findAllUsers = async (req,resp) => {
    
    try{
        const { data: result } = await axios.get(`${url}/users`)
        return handleSuccess(resp, result);
        
    }catch(error){
        console.log(error);
        return handleError(resp,error);
    }
        

}

