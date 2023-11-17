const {Schema, model} = require('mongoose');

const schema = new Schema({
    project:{
        type: String,
        required: true
    },
    task_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.Mixed,
        of: String,
        default :"User"
    },
    data_start:{
        type: Date,
    },
    data_end:{
        type: Date,
    },
    complited:{
        type: Boolean,
    },
    urgency:{
        type: String,
        default: 'Не срочно'
    }
})

module.exports = model('Task', schema)