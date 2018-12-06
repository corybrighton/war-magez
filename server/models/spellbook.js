let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = mongoose.SchemaTypes.ObjectId

let NoteSchema = new Schema({
	body: { type: String, required: true }
}, { timestamps: true })

let schema = new Schema({
	creatorId: { type: ObjectId, ref: 'User', required: true },
	name: { type: String, required: true },
	spells: [{ type: ObjectId, ref: 'Spell' }],
	notes: [NoteSchema]
}, { timestamps: true })

module.exports = mongoose.model('Spellbook', schema)