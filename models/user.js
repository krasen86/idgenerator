var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String },
    email:  {type: String, lowercase: true, unique: true, required: [true, 'can\'t be blank'],match:  /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ , index: true},
    requestsIdCounter: { type: Number},
    phone: {type: Number}
});


module.exports = mongoose.model('users', userSchema);