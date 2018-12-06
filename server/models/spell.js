let mongoose = require('mongoose')
let axios = require('axios')
let spells = axios.create({
	baseURL: 'http://www.dnd5eapi.co/api/spells'
})
let Schema = mongoose.Schema

let schema = new Schema({
	name: String,
	desc: [String],
	higher_level: [String],
	page: String,
	range: String,
	components: [String],
	material: String,
	ritual: String,
	duration: String,
	concentration: String,
	casting_time: String,
	level: Number
}, { timestamps: true })

let model = mongoose.model('Spell', schema)

function mapDNDSPELLS(){
	spells.get('').then(res => {
		return Promise.all(res.data.results.map(s => spells.get(s.url)))
	}).then(data => {
		console.log(data)
		return Promise.all(data.map(d => model.create(d.data)))
	}).then(docs => {
		console.log("ALL SPELLS ADDED", docs)
	}).catch(err => console.error(err))
}
	
	
	module.exports = model