Welcome to Mage Warz
====================

Mage Wars is a D&D inspired api that gives you a chance to build up your unique book of spells.

This is a trainer project designed to help developers learn the specifics around HTTP Requests and modern day frameworks. The server has been designed to accept request from any port and has specifically been built to serve static files from the www folder. It is recommended for this purpose to build out a project from the `wwwsrc` folder that will output the build to the `www` folder. The server utilizes cookie based authentication. All requests outside of `GET` must come from an authenticated user.

Here are the endpoints for this project.


```javascript
CONST ENDPOINTS = {
	BASEURL: "https://mage-warz.herokuapp.com/api"
	RESOURCES: [
		"spells", // retrieves a list of useable spells ONLY ADMINS CAN MODIFY THESE
		"spells/:id" // gets detailed information about individual spell
		"spellbook", // retrieves the logged in users spellbook FULL CONTROL VIA  - GET, POST
		"spellbook/:id" // used to retrieve or remove spell on spellbook - PUT, DELETE
	]
}

class Spell {
	_id: string
	name: string
	desc: Array<string>
	higher_level: Array<string>
	page: string
	range: string
	components: Array<string>
	material: string
	ritual: string
	duration: string
	concentration: string
	casting_time: string
	level: number
}

class Note {
 	body: string
}

class Spellbook {
	creatorId: string // auto assigned
	spells: Array<Spell> // editable field of spell ids
	notes: Array<Note> // editable field full objects
}

```




