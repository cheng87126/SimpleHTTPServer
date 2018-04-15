function parseCookie(cookie){
	let cookies = {}
	if(!cookie) return cookies
	cookie.split(';').forEach((item)=>{
		let pair = item.split('=')
		cookies[pair[0].trim()] = pair[1]
	})

	return cookies
}
function serializeCookie(name, val, opt) { 
	var pairs = [name + '=' + val]
	opt = opt || {}

	if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge)
	if (opt.domain) pairs.push('Domain=' + opt.domain)
	if (opt.path) pairs.push('Path=' + opt.path)
	if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString())
	if (opt.httpOnly) pairs.push('HttpOnly')
	if (opt.secure) pairs.push('Secure')

	return pairs.join('; ')
}
exports.parseCookie = parseCookie
exports.serializeCookie = serializeCookie