const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			unique: true
			// email match validation
		},
		thoughts: {
			// ids referencing Thought model
			// type: Schema.Types.ObjectId,
			// ref: 'Thought'
		},
		friends: {
			// ids referencing User model (self-reference)
		}
	},
	{
		toJSON: {
			virtuals: true
		},
		id: false
	}
);

// get total amount of friends
UserSchema.virtual('friendCount').get(function () {
	return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
