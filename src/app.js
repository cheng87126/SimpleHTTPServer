const http = require('http')
const url = require('url')
const parseCookie = require('./cookie.js').parseCookie

const requestHandlers = require('./requestHandlers.js')

let handle = {}
handle['/'] = requestHandlers.index
handle['/upload'] = requestHandlers.upload

let sessions = {}
let key = 'session_id'
const EXPIRES = 20 * 60 * 1000

function generate(){
	let session = {}
	session.id = (new Date()).getTime() + Math.random()
	session.cookie = { 
		expire: (new Date()).getTime() + EXPIRES
	}
	sessions[session.id] = session
	return session
}

function onRequest(req, res){
	let pathname = url.parse(req.url).pathname,
		content,
		sessionId
	req.cookie = parseCookie(req.headers.cookie)
	sessionId = req.cookie[key]
	if(!sessionId){
		req.session = generate()
	}else{
		let session = sessions[sessionId]
		if(session){
			if(session.cookie.expire > (new Date()).getTime()){
				session.cookie.expire = (new Date()).getTime() + EXPIRES
				req.session = session
			}else{
				delete sessions[sessionId]
				req.session = generate()
			}
		}else{
			req.session = generate()
		}
	}

	content = route(handle,pathname,req,res)
}

function route(handle,pathname,req,res){
	if(typeof handle[pathname] === 'function'){
		return handle[pathname](req,res)
	}else{
		res.writeHead(404, {"Content-Type": "text/plain"})
		res.write('404')
		res.end()
	}
}

http.createServer(onRequest).listen(8000)

console.log('listen 8000')