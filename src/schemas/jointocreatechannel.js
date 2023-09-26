const { model, Schema } = require('mongoose')

let jointocreatechannel = new Schema({
    Guild: String,
    Channel: String,
    User: String
});

module.exports = model('jointocreatechannel', jointocreatechannel);