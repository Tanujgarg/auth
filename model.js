const {
  Schema,
  model
} = require("mongoose")

const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  secret: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = model("USER", schema)