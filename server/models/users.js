const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  todos: [{type: Schema.Types.ObjectId, ref: 'Task'}]
})

module.exports = mongoose.model('User', schema)