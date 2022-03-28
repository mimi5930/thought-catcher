const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId()
		},
		reactionBody: {
			type: String,
			required: true,
			maxlength: 280
		},
		username: {
			type: String,
			required: true
		},
		createdAt: {
			type: Date,
			default: Date.now()
			// TODO use getter to format date on query
		}
	},
	{
		toJSON: {
			getters: true
		}
	}
);

const ThoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: 'please enter text for the thought',
			minlength: 1,
			maxlength: 280
		},
		createdAt: {
			type: Date,
			default: Date.now()
			// TODO create getter function for format the timestamp on query
		},
		username: {
			type: String,
			required: true
		},
		reactions: [ReactionSchema]
	},
	{
		toJSON: {
			getters: true
		}
	}
);

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
