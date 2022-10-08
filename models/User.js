const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: () => Promise.resolve(false),
        message: 'Email validation failed'
      }
    },
    thoughts: [thoughtSchema],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

userSchema
  .virtual('friendCount')
  .get(function() {
    return this.friends.length;
  })


const User = model('user', userSchema);

module.exports = User;
