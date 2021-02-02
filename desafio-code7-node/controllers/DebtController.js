const Debt = require('../models/debt');
const handleError = require('../utils/handler-error');
const handleSuccess = require('../utils/handler-success');
const mongoose = require('../connection/Connection');



exports.createDebt = async  (req, resp) => {
    try{
        const debtToSave = req.body;
        const debtSaved = await Debt.create(debtToSave);
        return handleSuccess(resp, debtSaved);

    }catch(error){
        return handleError(resp,error);
    }

}


exports.findAllDebtsFromClient = async (req, resp) => {
    try{
        const debts = await Debt.find()
            .where("clientId").equals(Number(req.params.id))
            .exec();

        return handleSuccess(resp, debts);


    }catch(error){
        return handleError(resp,error);
    }
}

exports.findDebtById = async (req, resp) => {
    try{
        
        const id = mongoose.Types.ObjectId(req.params.id);
        const debts = await Debt.findOne()
            .where("_id").equals(id)
            .exec();
        debts.save();
        return handleSuccess(resp, debts);


    }catch(error){
        console.log(error);
        return handleError(resp,error);
    }
}



exports.updateDebt = async (req, resp) => {
    try{
        const debtToUpdate = req.body;
        const debtUpdated = await Debt.updateOne(
            { _id: mongoose.Types.ObjectId(debtToUpdate._id)  }, 
            debtToUpdate,
            { runValidators: true });
        return handleSuccess(resp, debtUpdated);

    } catch(error) {
        return handleError(resp,error);
    } 
}


exports.deleteDebt = async (req, resp) => {
    try{
        const id = mongoose.Types.ObjectId(req.params.id);
        const debtDeleted = await Debt.deleteOne()
            .where('_id').equals(id)
            .exec();
        
        return handleSuccess(resp, debtDeleted);

    } catch(error) {
        return handleError(resp,error);
    }
}