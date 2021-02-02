const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/debit_code7'
mongoose.connect(mongoURI,
    { 
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
.then(connection => {
    console.log('success');
}).catch(error => {
    console.error('error to connect', error);
})

module.exports = mongoose
