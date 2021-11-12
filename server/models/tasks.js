const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    author: {
      type: Schema.Types.ObjectId, ref: 'User'
      //type: String,
    },
    task: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  }
)

module.exports = mongoose.model("Task", schema)