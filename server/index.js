

var express = require('express')
var bp = require('body-parser')
var server = express()
var cors = require('cors')
var port = process.env.PORT || 3001

server.use(cors())

//Fire up database connection
require('./db/mlab-config')


//REGISTER MIDDLEWEAR
server.use(bp.json())
server.use(bp.urlencoded({
	extended: true
}))
server.use(express.static(__dirname + '/../www/'))

//REGISTER YOUR AUTH ROUTES BEFORE YOUR GATEKEEPER, OTHERWISE YOU WILL NEVER GET LOGGED IN
let auth = require('./auth/routes')
server.use(auth.session)
server.use(auth.router)

//YOUR ROUTES HERE!!!!!!
var spells = require('./routes/spells')
var spellbooks = require('./routes/spellbooks')
server.use('/api/spells', (req, res, next) => {
	if (req.method != "GET") {
		return res.status(401).send({ error: "Not Authorized" })
	}
	next()
})
server.use('/api/*', (req, res, next) => {
	// @ts-ignore
	req.creatorId = req.session.uid
	next()
})
server.use(spells)
server.use(spellbooks)


//Catch all
server.get('*', (req, res, next) => {
	res.status(404).send({
		error: 'No matching routes'
	})
})

server.get('*', (error, req, res, next) => {
	res.status(400).send({
		error: error && error.message ? error.message : 'bad request'
	})
})


server.listen(port, () => {
	console.log('server running on port', port)
})