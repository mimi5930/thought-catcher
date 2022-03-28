const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: 'Please enter a username',
			trim: true
		},
		email: {
			type: String,
			required: 'Please enter an email',
			unique: true,
			match: [
				/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/,
				'Please enter a valid email'
			]
		},
		thoughts: [
			{
				// ids referencing Thought model
				// type: Schema.Types.ObjectId,
				// ref: 'Thought'
			}
		],
		friends: [
			{
				// ids referencing User model (self-reference)
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

// get total amount of friends
UserSchema.virtual('friendCount').get(function () {
	return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
