const { Schema, model } = require('mongoose');
const usersSchema = new Schema(
{
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Email is required."],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
    friends: [
    {
        type: Schema.Types.ObjectOd,
        ref: "User"
    }
    ],
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ]
},
{
    toJSON: {
        getters: true,
        virtuals: true
    }
 }
);
usersSchema.virtual('friendCount').get(function(){
    return this.friends.length
});

const Users = model('users', usersSchema);
module.exports = Users;