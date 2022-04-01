const { Schema, model, Types } = require('mongoose');
const formatDate = require('../utils/format-date');

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
			default: Date.now(),
			get: createdAtValue => formatDate(createdAtValue)
		}
	},
	{
		toJSON: {
			getters: true
		},
		id: false
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
			default: Date.now(),
			get: createdAtValue => formatDate(createdAtValue)
		},
		username: {
			type: String,
			required: true
		},
		reactions: [ReactionSchema]
	},
	{
		toJSON: {
			getters: true,
			virtuals: true
		},
		id: false
	}
);

ThoughtSchema.virtual('reactionCount').get(function () {
	return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
