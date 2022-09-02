const mongoose = require("mongoose");
// const { stringify } = require("querystring");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    phone:{
      type:String,
      required:true
    },
    post: {
        items: [
          {
            postId: {
              type: Schema.Types.ObjectId,
              ref: 'Product',
              required: true
            },
            quantity: { type: Number, required: true }
          }
        ]
      }
})

module.exports = mongoose.model('User', userSchema);