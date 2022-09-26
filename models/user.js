const { Schema, model } = require('mongoose');
const UsersSchema = new Schema(
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
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
    friends: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
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
        virtuals: true
    },
    id: false
 }
);
UsersSchema.virtual('friendCount').get(function(){
    return this.friends.length
});

const User = model('User', UsersSchema);
module.exports = User;