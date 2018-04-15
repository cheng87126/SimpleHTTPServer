const serializeCookie = require('./cookie.js').serializeCookie

function index(req,res) {
	let cookie,session
	session = serializeCookie('session_id',req.session.id)
	if(!req.cookie.vistied){
		cookie = serializeCookie('vistied', 'true')
		res.setHeader('Set-Cookie', [cookie,session])
	}else{
		res.setHeader('Set-Cookie', session)
	}
	
	res.writeHead(200, {"Content-Type": "text/plain"})
	res.write('index')
	res.end()
}
  
function upload(req,res) {
	res.writeHead(200, {"Content-Type": "text/plain"})
	res.write('upload')
	res.end()
}
  
exports.index = index
exports.upload = upload  