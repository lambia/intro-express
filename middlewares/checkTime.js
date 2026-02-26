function checkTime(req, res, next) {

	const adesso = new Date().toLocaleString();
	console.log("Richiesta ricevuta", adesso);

	// if (new Date().getHours() > 18) {
	// 	return res.send("Siamo chiusi");
	// }

	next();
}

module.exports = checkTime;