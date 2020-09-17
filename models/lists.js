const mongoose = require('mongoose')
const ListSchema = mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  list: [{
    type: String
  }]
})

module.exports = mongoose.model('Lists', ListSchema)
